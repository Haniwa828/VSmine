const submit = () => {
    const bombCord = recall("bomb");

    const bombCordJson = JSON.stringify(bombCord);
    console.log(bombCordJson);

    // URLの作成
    let url = "https://script.google.com/macros/s/AKfycbzR0tVy7PUDz-muHXFPgI-uFAG6Ag3IPGiz1Fthv5riQs1a3HjwpXeF-TRsbZfhk6SaUg/exec?data=";
    url = url + bombCordJson;

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

    // ウェブアプリの実行
    fetch(url) // グループ名とパスワードが一致するか確認
    .then(response => response.json())
    .then(data => { // 結果取得
        const newData = JSON.parse(data[0].新しいデータ);
        const oldData = recall("bomb");

        save(newData, "bomb");
        const player = getParam("player");

        cellUpdate(newData, "td");
        // openUpdate(player);
        // cellUpdate(oldData, "preTd");
        openUpdate(player);
    });
}
