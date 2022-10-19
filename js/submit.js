const submit = () => {
    const bombCord = recall("bomb");

    const bombCordJson = JSON.stringify(bombCord);
    const p1Point = document.getElementById(`p1Point`);
    const p2Point = document.getElementById(`p2Point`);
    let oppoPlayer = (recall("player") == "p1") ? "p2" : "p1";
    const actionNum = document.getElementById("actionNum");
    const bombActionNum = document.getElementById("bombActionNum");
    const handicap = document.getElementsByClassName("handicap");
    const roomPass = document.getElementById("roomPass").value;
    const gameOver = document.getElementById("gameOver");

    
    actionNum.textContent = 0;
    bombActionNum.textContent = 0;

    if(recall("first") == "first"){ 
        oppoPlayer = oppoPlayer + "first";
        save("not", "first");
    }
    if(gameOver.style.display == "block"){
        oppoPlayer = oppoPlayer + "finish";
    }
    if(handicap.length > 0){
        handicap[0].style.display = "none";
        handicap[1].style.display = "none";
    }

    const submitButton = document.getElementById('submit');
    submitButton.disabled = true;
    const getButton = document.getElementById('get');
    getButton.disabled = false;
    const board =  document.getElementById("board");
    board.style.pointerEvents = "none";

    // URLの作成
    let url = "https://script.google.com/macros/s/AKfycbzR0tVy7PUDz-muHXFPgI-uFAG6Ag3IPGiz1Fthv5riQs1a3HjwpXeF-TRsbZfhk6SaUg/exec?data=";
    url = url + bombCordJson + "&p1=" + p1Point.textContent + "&p2=" + p2Point.textContent + "&player=" + oppoPlayer + "&pass=" + roomPass;

    // ウェブアプリの実行
    fetch(url) // グループ名とパスワードが一致するか確認
    .then(response => response.json())
    .then(data => { // 結果取得
        console.log(data);
    });
}

const getData = () => {
    // URLの作成
    let url = "https://script.google.com/macros/s/AKfycbz8HA6hpTPJok_hrNmO-NsXOIzAPwaI66YUe-6rSV6j-q1p2W0xKBNIpq6X-C3FllFRVA/exec";
    const roomPass = document.getElementById("roomPass").value;

    url = url + "?pass=" + roomPass;

    // ウェブアプリの実行
    fetch(url) // グループ名とパスワードが一致するか確認
    .then(response => response.json())
    .then(data => { // 結果取得
        const newData = JSON.parse(data[0].新しいデータ);
        const oldData = recall("bomb");
        const p1PointGet = JSON.parse(data[0].p1);
        const p2PointGet = JSON.parse(data[0].p2);
        let nextPlayer = data[0].プレイヤー;

        const actionNum = document.getElementById("actionNum");
        const handicap = document.getElementsByClassName("handicap");

        if(nextPlayer.indexOf("finish") == -1 && ((actionNum.textContent == 0 || actionNum.textContent == 5) && handicap[0].style.display == "none")){
            save(newData, "bomb");
            const player = recall("player");

            // ポイント反映
            const p1Point = document.getElementById(`p1Point`);
            const p2Point = document.getElementById(`p2Point`);
            p1Point.textContent = p1PointGet;
            p2Point.textContent = p2PointGet;

            const bombActionNum = document.getElementById("bombActionNum");
            const board =  document.getElementById("board");

            if(nextPlayer.substr(0, 2) == player){ // 自分のターンなら
                actionNum.textContent = JSON.parse(data[0].行動回数);
                bombActionNum.textContent = JSON.parse(data[0].爆弾設置回数);
                board.style.pointerEvents = "auto";
            }
            else{
                actionNum.textContent = 0;
                bombActionNum.textContent = 0;
                board.style.pointerEvents = "none";
            }

            if(nextPlayer.indexOf("first") != -1 && nextPlayer.substr(0, 2) == player){ // && player == "p2"){ // 後攻の初手
                for(let i = 0; i < handicap.length; i++){
                    handicap[i].style.display = "block";

                    if(i == 1){
                        handicap[i].textContent = 2;
                    }
                }
            }

            const getButton = document.getElementById('get');
            getButton.disabled = true;

            cellUpdate(newData, "td");
            openUpdate(player);
            checkClear();
        }
        else if(nextPlayer.indexOf("finish") != -1){
            save(newData, "bomb");
            const player = recall("player");

            // ポイント反映
            const p1Point = document.getElementById(`p1Point`);
            const p2Point = document.getElementById(`p2Point`);
            p1Point.textContent = p1PointGet;
            p2Point.textContent = p2PointGet;

            const board =  document.getElementById("board");
            board.style.pointerEvents = "none";
            const gameOver = document.getElementById("gameOver");
            gameOver.style.display = "block";

            cellUpdate(newData, "td");
            openUpdate(player);
            checkClear();
        }
    });
}