function Step(){
    newhtml = "<table><tr>"
    for(let i=0;i<$("TileHeight").value;i++){
        for(let j=0;j<$("TileWidth").value;j++){
            id = (i*$("TileHeight").value) + j
            if(GetNextState(id)){
                newhtml += `<td id="${id}" style="background-color: yellow; height: ${80/$("TileHeight").value}vh; width: ${100/$("TileWidth").value}vw;" onclick="Toggle(${id})"></td>`
            }else{
                newhtml += `<td id="${id}" style="background-color: gray; height: ${80/$("TileHeight").value}vh; width: ${100/$("TileWidth").value}vw;" onclick="Toggle(${id})"></td>`
            }
        }
        newhtml += "</tr><tr>"
    }
    newhtml += "</table>"
    $("board").innerHTML = newhtml
    $("steps").innerText = parseInt($("steps").innerText) + 1
}

function Steps(numSteps){
    for(let i=0;i<numSteps;i++){
        Step()
        window.requestAnimationFrame()
    }
}

async function domUpdateDelayExperiment() {
    tellViewerLoading();
    setTimeout(someActionThatTakesALongTime, 50);
  }

function Rule(id){
    if($(`Rule${id}`).className == "ruleOff"){
        $(`Rule${id}`).className = "ruleOn"
    }else{
        $(`Rule${id}`).className = "ruleOff"
    }
}

function GetNextState(id){
    let width = $("TileWidth").value
    let idNum = parseInt(id)
    let currentState = $(id).style.backgroundColor == "yellow"?1:""
    let touching = GetTouching(id);
    
    if($(`Rule${currentState}${touching}`).className == "ruleOn"){
        return true
    }else{
        return false
    }

    //return touching
}

function GetTouching(id){
    let idNum = parseInt(id)
    let width = parseInt($("TileWidth").value);let touching = 0;
    let left = false;let up = false; let down = false; let right = false;
    if(id % width > 0){left = true}
    if(id - width > 0){up = true}
    if(id % width < width - 1){right = true}
    if(id + width < width * $("TileHeight").value){down = true}
    if(up && $(`${idNum - width}`).style.backgroundColor == "yellow"){touching++}//above
    if(up && left && $(`${idNum - width - 1}`).style.backgroundColor == "yellow"){touching++}//up left
    if(up && right && $(`${idNum - width + 1}`).style.backgroundColor == "yellow"){touching++}//up right
    if(down && $(`${idNum + width}`).style.backgroundColor == "yellow"){touching++}//below
    if(down && left && $(`${idNum + width - 1}`).style.backgroundColor == "yellow"){touching++}//down left
    if(down && right && $(`${idNum + width + 1}`).style.backgroundColor == "yellow"){touching++}//down right
    if(left && $(`${idNum - 1}`).style.backgroundColor == "yellow"){touching++}//left
    if(right && $(`${idNum + 1}`).style.backgroundColor == "yellow"){touching++}//right
    return touching
}

function DrawBoard(onChance){
    newhtml = "<table><tr>"
    for(let i=0;i<$("TileHeight").value;i++){
        for(let j=0;j<$("TileWidth").value;j++){
            id = (i*$("TileHeight").value) + j
            newhtml += `<td 
            id="${id}" 
            style="
                background-color: ${Math.random() < onChance?"yellow":"gray"}; 
                height: ${80/$("TileHeight").value}vh; 
                width: ${100/$("TileWidth").value}vw;
                padding: 0px" 
            onclick="Toggle(${id})"></td>`
        }
        newhtml += "</tr><tr>"
    }
    newhtml += "</table>"
    $("board").innerHTML = newhtml
    $("steps").innerText = 0
}

function RandomizeRules(){
    for(let rule = 0;rule<18;rule++){
        if(rule == 9){continue};//All my homies hate rule number 9, a number 9 large, a number 6 with extra meme
        $(`Rule${rule}`).className = Math.random() < 0.4?"ruleOn":"ruleOff"
    }
}

function Toggle(id){
    if($(id).style.backgroundColor == "gray"){
        $(id).style.backgroundColor = "yellow"
    }else{
        $(id).style.backgroundColor = "gray"
    }
}

function $(id){
    if(!document.getElementById(id)){
        return false
    }else{
        return document.getElementById(id)
    }
}

DrawBoard(0)