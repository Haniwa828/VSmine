// マス設置
const putBody = () => {
    const body = document.getElementById("body");

    body.innerHTML = ""; // 中の要素全削除

    const player = recall("player");
    const userBody = addDiv(body, [], (t) => {
        t.id = `${player}Body`;
    });

    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    const bomb = document.getElementById("bomb").value;
    let bombCord = [];
    save(bombCord, "bomb");

    // 爆弾数の情報
    const bombArea = addDiv(userBody, ["bombArea"]);
    addDiv(bombArea, ["oriBombNum"], (t) => {
        t.id = "oriBombNum";
        t.textContent = bomb + " ≦ Bomb ≦ ";
    });
    let bombNum = addDiv(bombArea, ["currentBombNum"], (t) => {
        t.id = "currentBombNum";
        t.textContent = bomb;
    });  
    addDiv(bombArea, [], (t) => {
        t.textContent = ", Flag_";
    });
    addDiv(bombArea, ["flagNum"], (t) => {
        t.id = "flagNum";
        t.textContent = 0;
    });

    // ポイントの情報
    const pointArea = addDiv(userBody, ["pointArea"]);
    addDiv(pointArea, [], (t) => {
        t.textContent = "マスの数_";
    });
    addDiv(pointArea, ["p1OpenNum"], (t) => {
        t.id = "p1OpenNum";
        t.textContent = 0;
    });
    addDiv(pointArea, [], (t) => {
        t.textContent = ":";
    });
    addDiv(pointArea, ["p2OpenNum"], (t) => {
        t.id = "p2OpenNum";
        t.textContent = 0;
    });
    addDiv(pointArea, [], (t) => {
        t.textContent = ", ポイント_";
    });
    addDiv(pointArea, ["p1Point"], (t) => {
        t.id = "p1Point";
        t.textContent = 0;
    });
    addDiv(pointArea, [], (t) => {
        t.textContent = ":";
    });
    addDiv(pointArea, ["p2Point"], (t) => {
        t.id = "p2Point";
        t.textContent = 0;
    });

    // 行動回数の情報
    const actionNumArea = addDiv(userBody, ["actionNumArea"], (t) => {
        t.id = "actionNumArea";
    });
    addDiv(actionNumArea, [], (t) => {
        t.textContent = "行動回数(爆弾操作)_";
    });
    addDiv(actionNumArea, ["actionNum"], (t) => {
        t.id = "actionNum";
        t.textContent = 5;
    });
    addDiv(actionNumArea, [], (t) => {
        t.textContent = "(";
    });
    addDiv(actionNumArea, ["bombActionNum"], (t) => {
        t.id = "bombActionNum";
        t.textContent = 3;
    });
    addDiv(actionNumArea, [], (t) => {
        t.textContent = ")";
    });
    addDiv(actionNumArea, ["handicap"], (t) => {
        t.textContent = ", ハンデ爆弾_";
        t.style.display = "none";
    });
    addDiv(actionNumArea, ["handicap"], (t) => {
        t.id = "handicap";
        t.textContent = 0;
        t.style.display = "none";
    });

    const boardArea = addDiv(userBody, ["boardArea"]);
    const board = addBoard(boardArea, ["board"], (t) => {
        t.style.pointerEvents = "auto";
        t.id = "board";
        t.style.pointerEvents = "auto";
    });

    addTrTd(board, height, width, ["td"], (t) => {
        t.addEventListener("click", leftClick);
    });
    
    addDiv(board, ["gameOver"], (t) => {
        t.id = "gameOver";
        t.textContent = "You win!";
    });
    
    const actionButtonArea = addDiv(userBody, ['actionButtonArea']);

    addButton(actionButtonArea, "button", ['actionButton'], (t) => {
        t.textContent = "Open";
        t.addEventListener("click", openCell);
        t.disabled = true;
    });

    addButton(actionButtonArea, "button", ['actionButton'], (t) => {
        t.textContent = "Bomb";
        t.addEventListener("click", setBomb);
        t.disabled = true;
    });

    addButton(actionButtonArea, "button", ['actionButton'], (t) => {
        t.textContent = "Flag";
        t.addEventListener("click", setFlag);
        t.disabled = true;
    });

    const submitArea = addDiv(userBody, [], (t) => {
        t.id = 'submitArea';
    });

    addButton(submitArea, "button", [], (t) => {
        t.id = 'submit';
        t.textContent = "Submit";
        t.addEventListener("click", submit);
        t.disabled = true;
    });

    addButton(submitArea, "button", ['can'], (t) => {
        t.id = 'get';
        t.textContent = "Get";
        t.addEventListener("click", getData);
    });

    // addInput(userBody, "CheckBox", 0, [], (t) => {
    //     t.id = "autoReload";
    //     t.name = "autoReload";
    //     t.addEventListener("click", autoReload);
    // });
    // addLabel(userBody, "autoReload", "自動更新");
}

// 爆弾を設置
const putBomb = (width, height, bomb, bombCord) => {
    for(let i = 0; i < bomb; i++){
        while(true){
            const x = Math.floor(Math.random()*width);
            const y = Math.floor(Math.random()*height);
            if(bombCord[y][x] === 0){
                bombCord[y][x] = 1;

                const tdId = "td" + y + ":" + x;
                const td = document.getElementById(tdId);
                td.classList.add("oriBomb");

                break;
            }
        }
    }

    // 初期位置判別用の-1を0に
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            if(bombCord[i][j] === -1){
                bombCord[i][j] = 0;
            }
        }
    }

    save(bombCord, "bomb");
    save(bomb, "bombNum");
}

