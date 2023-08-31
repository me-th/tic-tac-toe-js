let board = [1,2,3,4,5,6,7,8,9];
let xTiles = [];
let oTiles = [];
let player = 0;
let moves = 0
let isRunning = false;
function clearData(){
    resetBoard();
    xTiles = [];
    oTiles = [];
    player = 0;
    isRunning = false;
    moves = 0
}
function isWinner(player) {
    let list;
    if(player === 0){
        list = oTiles;
    } else {
        list = xTiles;
    }
    
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]            
    ];

    for(let combo of winningCombinations) {
        if(list.includes(combo[0]) && list.includes(combo[1]) && list.includes(combo[2])) {
            buttonHandler();
            return true;
        }
    }
    return false;
}
function isFull() {
    if(moves === 9){
        buttonHandler();
        return true;
    }else{
        return false;
    }
}
function refreshBoard(){
    for(let i = 0; i < board.length; i++){
        refreshCell(i);
    }
}
function resetBoard(){
    board = [1,2,3,4,5,6,7,8,9];
    refreshBoard();
}
function isTaken(cell){
    if(board[cell] == "x" || board[cell] == "o"){
        return true;
    }else{
        return false;
    }
}
function handleClick(cell){
    let symbol;
    if(!isTaken(cell)){
        if(player === 0){
            moves += 1;
            symbol = "o";
            oTiles.push(cell);
            if(isWinner(0)){
                document.getElementById("nowPlays").innerText="o wins!";
            }else if(isFull()){
                document.getElementById("nowPlays").innerText="no more space, tie";
            }else{
                player = 1;
                document.getElementById("nowPlays").innerText="x's move...";
            }
        }else{
            moves += 1;
            symbol = "x";
            xTiles.push(cell);
            if(isWinner(1)){
                document.getElementById("nowPlays").innerText="x wins!";
            }else if(isFull()){
                document.getElementById("nowPlays").innerText="no more space, tie";
            }else{
                player = 0;
                document.getElementById("nowPlays").innerText="o's move...";
            }
        }
        board[cell] = symbol;
        refreshCell(cell);
    }else{
        alert("sorry, this tile is taken");
    }  
}
function refreshCell(cell){
    let cellname = "cell"+(cell+1);
    document.getElementById(cellname).innerHTML=board[cell];
    if(board[cell] === "x"){
        document.getElementById(cellname).style.backgroundColor="aquamarine";
    }else if(board[cell] === "o"){
        document.getElementById(cellname).style.backgroundColor="lightpink";
    }else{
        document.getElementById(cellname).style.backgroundColor="white"
    }
}
function setFirstPlayer(){
   if(player === 0){
    player = 1;
    document.getElementById("setFirstPlayer").innerHTML="x starts"
   }else{
    player = 0;
    document.getElementById("setFirstPlayer").innerHTML="o starts"
   }
}
function startGame(){
    document.getElementById("startStopButton").innerHTML="reset";
    resetBoard();
    if(player === 0){
        document.getElementById("nowPlays").innerText="o's move...";
    }else{
        document.getElementById("nowPlays").innerText="x's move...";
    }
}
function resetGame(){
    clearData();
    document.getElementById("startStopButton").innerHTML="start";
    document.getElementById("nowPlays").innerText="Click start button to start the game.";
}
function buttonHandler(){
    if(isRunning === true){
        document.getElementById("startStopButton").innerHTML="reset";
        resetGame();
        isRunning = false;
    }else{
        document.getElementById("startStopButton").innerHTML="start";
        startGame();
        isRunning = true;
    }
}