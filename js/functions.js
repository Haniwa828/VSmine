// 一手目か確認
const checkFirst = (x, y, width, height, bomb, bombCord) => {
    if(bombCord.length == 0){
        // マップ作成
        for(let i = 0; i < height; i++){
            bombCord[i] = Array(Number(width)).fill(0);
        }

        // // 選択したマスの周囲に-1設置
        // for(let i = y - 1; i <= y + 1; i++){
        //     for(let j = x - 1; j <= x + 1; j++){
        //         if(i >= 0 && i < height && j >= 0 && j < width){ 
        //             bombCord[i][j] = -1;
        //         }
        //     }
        // }
        bombCord[y][x] = -1;


        putBomb(width, height, bomb, bombCord);

        const td = document.getElementsByTagName("td");
        // for(let i = 0; i < td.length; i++){
        //     td[i].addEventListener("contextmenu", rightClick);
        // }

        return "first";
    }
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

    // if(bombs === 0){
    //     open(y, x);
    // } 
    // else{
    //     target.textContent = bombs;
    //     target.classList.add("open");
    // }

    target.textContent = bombs;
    // target.classList.add(`${player}Open`);
}

// クリア判定
const checkClear = (width = 9, height = 9) => {
    // const p1OpenCell = document.getElementsByClassName("p1Open");
    // const p2OpenCell = document.getElementsByClassName("p2Open");
    // if(p1OpenCell.length + p2OpenCell.length + Number(bomb) == width*height){
    //     const board =  document.getElementById("board");
    //     board.style.pointerEvents = "none";
        
    //     addDiv(board, [], (t) => {
    //     t.textContent = "Clear";
    //     });

    //     return;
    // }

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

    if(filledCell == width*height){
        const board =  document.getElementById("board");
        board.style.pointerEvents = "none";
        
        // addDiv(board, [], (t) => {
        //     t.textContent = "Clear";
        // });

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
        console.log(p1Open, p2Open)

        if(p1Open > p2Open){
            addDiv(board, [], (t) => {
                t.textContent = "Player1 win!";
            });
        }
        else if(p1Open < p2Open){
            addDiv(board, [], (t) => {
                t.textContent = "Player2 win!";
            });
        }
        else{
            addDiv(board, [], (t) => {
                t.textContent = "Draw";
            });
        }

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

    // const openList2 = document.getElementsByClassName(`p2Open`);
    // for(let i = 0; i < openList2.length; i++){
    //     const x = Number(openList2[i].id.substr(openList2[i].id.indexOf(":") + 1, openList2[i].id.length));
    //     const y = Number(openList2[i].id.substr(2, openList2[i].id.indexOf(":") - 2));
    //     const width = document.getElementById("width").value;
    //     const height = document.getElementById("height").value;
    //     let bombCord = recall("bomb");

    //     countBomb(y, x, width, height, bombCord, openList2[i]);
    // }
}

// function array_equal(a, b) {
//     if (!Array.isArray(a))    return "a is not array";
//     if (!Array.isArray(b))    return "b is not array";
//     if (a.length != b.length) return "each length is not same";
//     for (var i = 0, n = a.length; i < n; ++i) {
//       if (a[i] !== b[i]) return false;
//     }
//     return true;
// }

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
    const player = getParam("player");
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