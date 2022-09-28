// div追加
const addDiv = (parentArea, className = [], callBack = null) => { // 引数に=をつけることでデフォルトの値設定
    const newElm = document.createElement("div");

    for(let i = 0; i < className.length; i++){
        newElm.classList.add(className[i]);
    }
    if(callBack && typeof(callBack) === "function") callBack(newElm);
    
    parentArea.appendChild(newElm);
    return newElm;
}

// span追加
const addSpan = (parentArea, className = [], callBack = null) => { // 引数に=をつけることでデフォルトの値設定
    const newElm = document.createElement("span");

    for(let i = 0; i < className.length; i++){
        newElm.classList.add(className[i]);
    }
    if(callBack && typeof(callBack) === "function") callBack(newElm);
    
    parentArea.appendChild(newElm);
    return newElm;
}

// label追加
const addLabel = (parentArea, target, text, className = [], callBack = null) => {
    const newElm = document.createElement("label");
    
    newElm.textContent = text;
    newElm.htmlFor = target;
    newElm.classList.add(className);
    if(callBack && typeof(callBack) === "function") callBack(newElm);
    
    parentArea.appendChild(newElm);
}

// input追加
const addInput = (parentArea, inputType, value = null, className = [], callBack = null) => {
    const newElm = document.createElement("input");
    
    newElm.type = inputType;
    newElm.value = value;
    for(let i = 0; i < className.length; i++){
        newElm.classList.add(className[i]);
    }
    if(callBack && typeof(callBack) === "function") callBack(newElm);
    
    parentArea.appendChild(newElm);
    return newElm;
}

// button追加
const addButton = (parentArea, type, className = [], callBack = null) => {
    const newElm = document.createElement("button");

    newElm.type = type;
    for(let i = 0; i < className.length; i++){
        newElm.classList.add(className[i]);
    }
    if(callBack && typeof(callBack) === "function") callBack(newElm);
    
    parentArea.appendChild(newElm);
}

// board追加
const addBoard = (parentArea, className = [], callBack = null) => {
    const newElm = document.createElement("board");

    for(let i = 0; i < className.length; i++){
        newElm.classList.add(className[i]);
    }
    if(callBack && typeof(callBack) === "function") callBack(newElm);
    
    parentArea.appendChild(newElm);
    return newElm;
}

// tr, td追加
const addTrTd = (parentArea, rowNum, colNum, className = [], callBack = null) => {
    for(let i = 0; i < rowNum; i++){
        const newTr = document.createElement("tr");
        for(let j = 0; j < colNum; j++){
            const newTd = document.createElement("td");

            newTd.id = "td" + i + ":" + j;
            for(let i = 0; i < className.length; i++){
                newTd.classList.add(className[i]);
            }
            if(callBack && typeof(callBack) === "function") callBack(newTd);

            newTr.appendChild(newTd);
        }

        parentArea.appendChild(newTr);
    }
}








// select追加
const addSelect = (parentArea, name, className = [], callBack = null) => {
    const newElm = document.createElement("select");

    newElm.name = name;
    newElm.classList.add(className);
    if(callBack && typeof(callBack) === "function") callBack(newElm);
    
    parentArea.appendChild(newElm);

    return newElm;
}

// option追加
const addOption = (parentArea, value, className = [], callBack = null) => {
    const newElm = document.createElement("option");

    newElm.value = value;
    newElm.classList.add(className);
    if(callBack && typeof(callBack) === "function") callBack(newElm);
    
    parentArea.appendChild(newElm);

    return newElm;
}






// details追加
const addDetails = (parentArea, id, className = [], callBack = null) => {
    const newElm = document.createElement("details");

    newElm.id = id;
    newElm.classList.add(className);
    if(callBack && typeof(callBack) === "function") callBack(newElm);
    
    parentArea.appendChild(newElm);

    return newElm;
}

// summary追加
const addSummary = (parentArea, caption, className = [], callBack = null) => {
    const newElm = document.createElement("summary");
    
    newElm.textContent = caption;
    newElm.classList.add(className);
    if(callBack && typeof(callBack) === "function") callBack(newElm);
    
    parentArea.appendChild(newElm);
}

