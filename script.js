//@ts-check
let currentPlayer = "o";
let freeCells = [1,2,3,4,5,6,7,8,9];
let oCells = [];
let xCells = [];
let boardLocked = true;
function setPlayerButton(){
    if(currentPlayer === "o"){
        currentPlayer = "x";
        // @ts-ignore
        document.getElementById("setPlayerButton").innerHTML="x starts"
       }else{
        currentPlayer = "o";
        // @ts-ignore
        document.getElementById("setPlayerButton").innerHTML="o starts"
       }
}
function reactiveButton(){
    if(document.getElementById("startStopButton")?.innerHTML == "start"){
        handleStart();
        // @ts-ignore
        document.getElementById("startStopButton").innerHTML = "stop";
    }else if(document.getElementById("startStopButton")?.innerHTML == "stop"){
        // @ts-ignore
        document.getElementById("startStopButton").innerHTML = "resume";
        boardLocked = true;  
    }else if(document.getElementById("startStopButton")?.innerHTML == "resume"){
        // @ts-ignore
        document.getElementById("startStopButton").innerHTML = "stop";
        boardLocked = false;
    }
}
function resetButton(){
    if(document.getElementById("startStopButton")?.innerHTML != "start"){
        // @ts-ignore
        document.getElementById("startStopButton").innerHTML = "start";
        handleReset()
    }
}
function handleStart(){
    boardLocked = false;
    // @ts-ignore
    document.getElementById("statusText").innerHTML = currentPlayer+"'s move.";
}
function handleReset(){
    boardLocked = true;
    freeCells = [1,2,3,4,5,6,7,8,9];
    oCells = [];
    xCells = [];

    let i = 0;
    while(i < 9){
        let elementName = "cell" + freeCells[i];
        // @ts-ignore
        document.getElementById(elementName).innerHTML = freeCells[i];   
        // @ts-ignore
        document.getElementById(elementName).classList.remove("red", "blue");
        // @ts-ignore
        document.getElementById("statusText").innerHTML = "Click start button to start the game.";
        i++;     
    }
}
function switchPlayer(){
    if(currentPlayer === "o"){
        currentPlayer = "x";
        // @ts-ignore
        document.getElementById("statusText").innerHTML = "x's move...";
    }else{
        currentPlayer = "o";
        // @ts-ignore
        document.getElementById("statusText").innerHTML = "o's move...";
    }
}
function handleClick(cell){
    if(!boardLocked){
        if(isFree(cell)){
            claimCell(cell);
            updateCell(cell);
            if(isWinner()){
                boardLocked = true;
                // @ts-ignore
                document.getElementById("statusText").innerHTML = currentPlayer + " won the game.";
            }else{
                switchPlayer();
            }
        }else{
            // @ts-ignore
            document.getElementById("statusText").innerHTML = "this cell is already claimed!";
        }
    }
}
function isFree(cell){
    if(freeCells.includes(cell)){
        return true;
    }else{
        return false;
    }
}
function claimCell(cell){
    if(currentPlayer == "o"){
        oCells.push(cell);
    }else{
        xCells.push(cell);
    }
    let index = freeCells.indexOf(cell); 
    freeCells.splice(index, 1); //remove claimed cell from freeCells
}
function updateCell(cell){
    let elementName = "cell" + cell;
    // @ts-ignore
    document.getElementById(elementName).innerHTML = currentPlayer;
    if(currentPlayer == "o"){
        // @ts-ignore
        document.getElementById(elementName).classList.add("red");
    }else{
        // @ts-ignore
        document.getElementById(elementName).classList.add("blue");
    }
}

function isWinner() {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], 
        [1, 4, 7], [2, 5, 8], [3, 6, 9], 
        [1, 5, 9], [3, 5, 7]            
    ];
    
    for(let combo of winningCombinations) {
        if(oCells.includes(combo[0]) && oCells.includes(combo[1]) && oCells.includes(combo[2])) {
            currentPlayer = 'o'; // setting the currentPlayer to o, as o is the winner.
            return true;
        }
        if(xCells.includes(combo[0]) && xCells.includes(combo[1]) && xCells.includes(combo[2])) {
            currentPlayer = 'x'; // setting the currentPlayer to x, as x is the winner.
            return true;
        }
    }
    return false;
}
