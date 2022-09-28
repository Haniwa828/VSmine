// ヘッダー設置
const putHeader = () => {
    const header = document.getElementById("header");
    const setting = addDiv(header, ["setting"]);
    const setting2 = addDiv(header, ["setting2"]);
    putSetting(setting);  
    // addSpan(setting, ["oriBomb"], (t) => {
    //     t.id = "oriBomb";
    //     t.textContent = 0;
    // });
    const startBtn = addButton(setting2, "button", ["start", "btn"], (t) => {
        t.textContent = "Start";
        t.addEventListener("click", start);
    });
}

// マスと爆弾の数の設定
const putSetting = (parentArea) => {
    addLabel(parentArea, "width", "W:", ["label"]);
    const width = addInput(parentArea, "number", 9, ["input"], (t) => {
        t.id = "width";
        t.max = 10;
        t.min = 2;
    });
    addLabel(parentArea, "height", "H:", ["label"]);
    const height = addInput(parentArea, "number", 9, ["input"], (t) => {
        t.id = "height";
        t.max = 10;
        t.min = 2;
    });
    addLabel(parentArea, "bomb", "B:", ["label"]);
    const bomb = addInput(parentArea, "number", 9, ["input"], (t) => {
        t.id = "bomb";
        t.max = 10;
        t.min = 2;
    });
}