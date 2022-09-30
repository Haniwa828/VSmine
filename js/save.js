const save = (data, situation) => {
    const savedData = JSON.stringify(data);
    switch(true){
        case situation == "bomb":
            sessionStorage.setItem("bomb", savedData);
            break;
        
        case situation == "bombNum":
            sessionStorage.setItem("bombNum", savedData);
            break;
        
        case situation == "first":
            sessionStorage.setItem("first", savedData);
            break;

        default:
            console.log("来たよ");
            break;
    }

    console.log("保存成功");
}

const recall = (situation) => {
    let getData;

    switch(true){
        case situation == "bomb":
            getData = sessionStorage.getItem("bomb");
            break;
        
        case situation == "bombNum":
            getData = sessionStorage.getItem("bombNum");
            break;

        case situation == "first":
            getData = sessionStorage.getItem("first");
            break;

        default:
            console.log("来たよ");
            break;
    }

    getData = JSON.parse(getData);

    return getData;
}