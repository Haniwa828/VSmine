// startが押された時
const start = () => {
    const roomPass = document.getElementById("roomPass");
    roomPass.readOnly = true;
    const player = document.getElementsByName('playerSelect');
    let checkValue = '';

    for (let i = 0; i < player.length; i++){
        if (player[i].checked){
            checkValue = player[i].value;
        }

        player[i].disabled = true;
    }
    save(checkValue, "player");

    putBody();
}

// マスが左クリックされた時
const leftClick = (event) => {
    // 座標取得
    const target = event.target;
    const x = Number(target.id.substr(target.id.indexOf(":") + 1, target.id.length));
    const y = Number(target.id.substr(2, target.id.indexOf(":") - 2));

    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    const bomb = document.getElementById("bomb").value;
    let bombCord = recall("bomb");
    const player = recall("player");
    // const player = getParam("player");
    const oppoPlayer = (player == "p1") ? "p2" : "p1";
    
    const actionNum = document.getElementById("actionNum");
    const bombActionNum = document.getElementById("bombActionNum");
    const handicap = document.getElementsByClassName("handicap");

    // すでに空いているマスや旗が置いてあったら何もしない
    if(target.className.indexOf(`${player}Open`) >= 0){ // target.className.indexOf(`p1Open`) >= 0 || target.className.indexOf(`p2Open`) >= 0
        return;
    }

    // 一手目か確認
    const first = checkFirst(x, y, width, height, bomb, bombCord);

    // シフトキー押しながらの場合
    if (event.shiftKey == true && first != "first") { // 初手はできなくする
        if((bombActionNum.textContent == "0" && (handicap[0] == undefined || Number(handicap[1].textContent) == 0)) || target.className.indexOf(`${oppoPlayer}Open`) >= 0){ // 爆弾操作回数上限もしくは相手が開いていたならば
            return;
        }
        leftShiftClick(target);

        return;
    }

    if(target.className.indexOf(`${player}Flag`) >= 0){
        return
    }

    if(actionNum.textContent != "0"){    
        // 爆弾を踏んだか判定
        if (target.className.indexOf("oriBomb") >= 0 || target.className.indexOf(`${oppoPlayer}Bomb`) >= 0) { // p1Bombの判定は後ほど改変   
            const board =  document.getElementById("board");
            board.style.pointerEvents = "none";
            addDiv(board, [], (t) => {
                t.textContent = "Game Over";
            });

            return;
        }

        // 周囲の爆弾の個数確認と展開
        countBomb(y, x, width, height, bombCord, target);
        target.classList.add(`${player}Open`);
        if (first == "first") { // 初手は実行
            target.classList.add(`${oppoPlayer}Open`); // 初手はお互いに公開
        }

        cordUpdate();
        if (first == "first") { // 初手は実行
            openUpdate(player);
        }

        // ポイント加算
        addPoint(target, player, oppoPlayer);

        // 行動回数
        actionNum.textContent = Number(actionNum.textContent) - 1;
    }

    if(actionNum.textContent == "0"){
        // ハンデ考慮
        if(handicap[0] == undefined || Number(handicap[1].textContent) == 0){
            const board =  document.getElementById("board");

            bombActionNum.textContent = 0;
            board.style.pointerEvents = "none";
        }
    }

    // クリア判定
    checkClear();

    if(recall("first") != "first" && first == "first"){ // 初手っていう指示
        save(first, "first");
    }
    
}

// マスが右クリックされた時
const rightClick = (event) => {
    const target = event.target;
    let flagNum = document.getElementById("flagNum");
    const player = recall("player");
    // const player = getParam("player");

    event.preventDefault();
    if (target.className.indexOf(`p1Open`) >= 0 || target.className.indexOf(`p2Open`) >= 0) {
        return;   
    }

    if(target.className.indexOf(`${player}Bomb`) == -1){
        target.classList.toggle(`${player}Flag`);
        if (target.className.indexOf(`${player}Flag`) >= 0) {
            flagNum.textContent = Number(flagNum.textContent) + 1;
        } 
        else {
            flagNum.textContent = Number(flagNum.textContent) - 1;
        }
    }
    // target.classList.toggle("p1Flag");
    // if (target.className.indexOf("p1Flag") >= 0) {
    //     flagNum.textContent = Number(flagNum.textContent) + 1;
    // } 
    // else {
    //     flagNum.textContent = Number(flagNum.textContent) - 1;
    // }
    
    cordUpdate();
}

// シフト+クリックされた時
const leftShiftClick = (target) => {
    let currentBombNum = document.getElementById("currentBombNum");
    // let bombNum = recall("bombNum");
    let bombNum = Number(currentBombNum.textContent);
    let flagNum = document.getElementById("flagNum");
    const player = recall("player");
    // const player = getParam("player");

    // 爆弾追加
    if((target.className).indexOf(`${player}Bomb`) == -1){
        target.classList.add(`${player}Bomb`);
        
        // カウント変更
        bombNum++;

        currentBombNum.textContent = bombNum;
    }
    else if((target.className).indexOf("oriBomb") != -1){
        if((target.className).indexOf(`${player}Bomb`) != -1){
            // カウント変更
            bombNum--;

            currentBombNum.textContent = bombNum;
        }
        target.classList.toggle(`${player}Bomb`);
    }
    else{
        target.classList.toggle(`${player}Bomb`);

        // カウント変更
        bombNum--;

        currentBombNum.textContent = bombNum;
    }

    target.classList.toggle(`${player}Flag`);
    if (target.className.indexOf(`${player}Flag`) >= 0) {
        flagNum.textContent = Number(flagNum.textContent) + 1;
    } 
    else {
        flagNum.textContent = Number(flagNum.textContent) - 1;
    }


    // save(bombCord, "bomb");
    cordUpdate();
    openUpdate(player);
    save(bombNum, "bombNum");

    // 行動回数
    const actionNum = document.getElementById("actionNum");
    const bombActionNum = document.getElementById("bombActionNum");
    const handicap = document.getElementsByClassName("handicap");

    // ハンデ考慮
    if(!(handicap[0] == undefined)  && Number(handicap[1].textContent) > 0){
        handicap[1].textContent = Number(handicap[1].textContent) - 1;
    }
    else{
        actionNum.textContent = Number(actionNum.textContent) - 1;
        bombActionNum.textContent = Number(bombActionNum.textContent) - 1;
    }

    if(actionNum.textContent == "0" && (handicap[0] == undefined || Number(handicap[1].textContent) == 0)){
        const board =  document.getElementById("board");

        bombActionNum.textContent = 0;
        board.style.pointerEvents = "none";
    }

    checkClear();
} 