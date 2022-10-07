// ヘッダー設置
const putHeader = () => {
    const header = document.getElementById("header");
    const setting = addDiv(header, ["setting"]);
    const setting2 = addDiv(header, ["setting2"]);
    const setting3 = addDiv(header, ["setting3"]);
    
    putSetting(setting);
    
    addInput(setting2, "number", "", ["input", "roomPass"], (t) => {
        t.id = "roomPass";
        t.placeholder ="ルームパス";
    });
    addInput(setting2, "radio", "p1", ["input", "playerNum"], (t) => {
        t.id = "p1Radio";
        t.name = "playerSelect";
        t.checked = "checked";
    });
    addLabel(setting2, "p1Radio", "プレイヤー１");
    addInput(setting2, "radio", "p2", ["input", "playerNum"], (t) => {
        t.id = "p2Radio";
        t.name = "playerSelect";
        t.textContent ="プレイヤー２";
    });
    addLabel(setting2, "p2Radio", "プレイヤー２");

    addButton(setting3, "button", ["start", "btn"], (t) => {
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