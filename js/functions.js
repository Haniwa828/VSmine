// 一手目か確認
const checkFirst = (x, y, width, height, bomb, bombCord) => {
    if(bombCord.length == 0){
        // マップ作成
        for(let i = 0; i < height; i++){
            bombCord[i] = Array(Number(width)).fill(0);
        }

        bombCord[y][x] = -1;


        putBomb(width, height, bomb, bombCord);

        const td = document.getElementsByTagName("td");

        return "first";
    }

    return "not";
}

// マスの周りの爆弾の数を数える
const countBomb = (y, x, width, height, bombCord, target) => {
    let bombs = 0;
    for(let i = y - 1; i <= y + 1; i++){
        for(let j = x - 1; j <= x + 1; j++){
            if(i >= 0 && i < height && j >= 0 && j < width){
                if(typeof(bombCord[i][j]) == "object"){
                    if(bombCord[i][j].includes("oriBomb") || bombCord[i][j].includes("p1Bomb") || bombCord[i][j].includes("p2Bomb")){
                        bombs++;
                    }
                }
            }
        }
    }

    target.textContent = bombs;
}

// クリア判定
const checkClear = (width = 9, height = 9) => {

    let bombCord = recall("bomb");

    let filledCell = 0;
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            switch(true){
                case bombCord[i][j].includes("oriBomb"):
                case bombCord[i][j].includes("p1Bomb"):
                case bombCord[i][j].includes("p2Bomb"):
                case bombCord[i][j].includes("p1Open"):
                case bombCord[i][j].includes("p2Open"):
                    filledCell++;

                    break;
            }
        }
    }

    const p1OpenNum = document.getElementById("p1OpenNum");
    const p2OpenNum = document.getElementById("p2OpenNum");
    let p1Open = 0;
    let p2Open = 0;
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(bombCord[i][j].includes("p1Open")){
                p1Open++;
            }
            if(bombCord[i][j].includes("p2Open")){
                p2Open++;
            }
        }
    }
    p1OpenNum.textContent = p1Open;
    p2OpenNum.textContent = p2Open;

    if(filledCell == width*height){
        const p1Point = document.getElementById(`p1Point`);
        const p2Point = document.getElementById(`p2Point`);
        const board =  document.getElementById("board");

        board.style.pointerEvents = "none";

        const player = recall("player");

        if(Number(p1Point.textContent) > Number(p2Point.textContent)){
            if(player == "p1"){
                addDiv(board, [], (t) => {
                    t.textContent = "You Win!";
                });
            }
            else{
                addDiv(board, [], (t) => {
                    t.textContent = "You Lose.";
                });
            }
        }
        else if(Number(p1Point.textContent) < Number(p2Point.textContent)){
            if(player == "p1"){
                addDiv(board, [], (t) => {
                    t.textContent = "You Lose.";
                });
            }
            else{
                addDiv(board, [], (t) => {
                    t.textContent = "You Win!";
                });
            }
        }
        else{
            addDiv(board, [], (t) => {
                t.textContent = "Draw";
            });
        }

        submit();

        return;
    }
}



// 座標の更新
const cordUpdate = () => {
    let bombCord = recall("bomb");
    const tdList = document.getElementsByClassName("td");
    const width = bombCord[0].length;
    const height = bombCord.length;
    let i = 0;

    for(let j = 0; j < height; j++){
        for(let k = 0; k < width; k++){
            const tdClass = tdList[i].className.split(' ');
            bombCord[j][k] = tdClass;

            i++;
        }
    }
    
    save(bombCord, "bomb");
}

// 爆弾設置に伴う開いているマスの更新
const openUpdate = (player) => {
    const openList = document.getElementsByClassName(`${player}Open`);
    for(let i = 0; i < openList.length; i++){
        const x = Number(openList[i].id.substr(openList[i].id.indexOf(":") + 1, openList[i].id.length));
        const y = Number(openList[i].id.substr(2, openList[i].id.indexOf(":") - 2));
        const width = document.getElementById("width").value;
        const height = document.getElementById("height").value;
        let bombCord = recall("bomb");

        countBomb(y, x, width, height, bombCord, openList[i]);
    }
}

// URLからパラメータ取得
function getParam(name, url) { 
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// マスの更新
const cellUpdate = (data, id) => {
    let bombCord = recall("bomb");
    let tdList = document.getElementsByClassName(id);
    const width = bombCord[0].length;
    const height = bombCord.length;
    const player = recall("player");
    // const player = getParam("player");
    const oppoPlayer = (player == "p1") ? "p2" : "p1";
    let currentBombNum = document.getElementById("currentBombNum");
    let flagNum = document.getElementById("flagNum");

    let i = 0;
    let currentBombCount = 0;
    let flagCount = 0;

    for(let j = 0; j < height; j++){
        for(let k = 0; k < width; k++){
            // tdList[i].classList.remove(...tdList[i].classList);
            tdList[i].className = data[j][k].join(' ');

            if(data[j][k].join(' ').indexOf("oriBomb") >= 0){
                currentBombCount++;
            }
            if(data[j][k].join(' ').indexOf(`${player}Bomb`) >= 0){
                currentBombCount++;
            }
            if(data[j][k].join(' ').indexOf(`${oppoPlayer}Bomb`) >= 0){
                currentBombCount++;
            }
            if(data[j][k].join(' ').indexOf(`${player}Flag`) >= 0){
                flagCount++;
            }

            i++;
        }
    }

    currentBombNum.textContent = currentBombCount;
    flagNum.textContent = flagCount;
}

// ポイント加算
const addPoint = (target, player, oppoPlayer) => {
    if(target.className.indexOf(`${oppoPlayer}Open`) == -1){ 
        const point = document.getElementById(`${player}Point`);
        point.textContent = Number(point.textContent) + 1;
    }
}