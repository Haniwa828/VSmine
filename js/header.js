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
    });
    addLabel(setting2, "p2Radio", "プレイヤー２");

    addButton(setting3, "button", ["start", "btn", "can"], (t) => {
        t.textContent = "Start";
        t.addEventListener("click", start);
    });

    const body = document.getElementById("body");
    const ruleArea = addDiv(body, ['ruleArea']);

    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = 'ルール説明'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '　'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '勝敗について：'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・元々設置されている、もしくは相手プレイヤーの設置した爆弾を踏むと負け'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・爆弾を踏むこと無く全てのマスが開かれている、もしくは爆弾が設置されている状態になればポイントの多いプレイヤーが勝利'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '　'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = 'ポイントについて：'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・ポイントは相手プレイヤーがまだ開いていないマスを開けた際にのみ取得できる'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・先行プレイヤーの1手目はお互いに開示され、ポイント取得も無い'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・すでに開いているマスを開けた場合や爆弾設置によるポイント取得は無い'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '　'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '行動回数について：'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・行動回数5回をそれぞれマスの開示と爆弾設置に使用可能'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・行動回数の内、爆弾を設置及び削除できる回数は最大3回'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・行動回数が0になった場合も含めてフラグ設置及び削除は自由'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '　'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = 'それぞれの数字について：'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・爆弾の数は初期で9個設置され、プレイヤーが爆弾を新たに設置することで最大数が増える'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・ただし、元々存在する爆弾、もしくは相手プレイヤーの設置した爆弾に重ねて置いた際にも数字は増える'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・フラグの数は自身が設置している爆弾とフラグの数を合算した個数'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・マスの数はお互いが現在それぞれ何マスの情報を持っているかの目安であり、勝敗に関わらない'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・ポイントはそれぞれ新規で開示したマスの数であり、勝敗に関わる'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・行動可能回数は何回マスに対して行動を起こせるかの残り回数'
    });
    addDiv(ruleArea, ['rule'], (t) => {
        t.textContent = '・爆弾操作は爆弾設置及び削除の残り可能回数'
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
    const bomb = addInput(parentArea, "number", 15, ["input"], (t) => {
        t.id = "bomb";
        t.max = 10;
        t.min = 2;
    });
}