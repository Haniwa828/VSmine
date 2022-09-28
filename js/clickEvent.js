// startが押された時
const start = () => {
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
    // let player = recall("player");
    const player = getParam("player");
    const oppoPlayer = (player == "p1") ? "p2" : "p1";

    // すでに空いているマスや旗が置いてあったら何もしない
    if(target.className.indexOf(`${player}Open`) >= 0){ // target.className.indexOf(`p1Open`) >= 0 || target.className.indexOf(`p2Open`) >= 0
        return;
    }

    // 一手目か確認
    const first = checkFirst(x, y, width, height, bomb, bombCord);

    // シフトキー押しながらの場合
    if (event.shiftKey == true && first != "first") { // 初手はできなくする
        leftShiftClick(target);

        return;
    }

    if(target.className.indexOf(`${player}Flag`) >= 0){
        return
    }

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
    target.classList.add(`${player}Open`)

    cordUpdate();
    if (first == "first") { // 初手は実行
        openUpdate(player);
    }

    // クリア判定
    checkClear();
    
}

// マスが右クリックされた時
const rightClick = (event) => {
    const target = event.target;
    let flagNum = document.getElementById("flagNum");
    const player = getParam("player");

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
    const player = getParam("player");

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

    checkClear();
} 