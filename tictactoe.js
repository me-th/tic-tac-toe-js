let board = [0,1,2,3,4,5,6,7,8]
let players = ["x", "o"];
let nextPlayer = 0
let endOfGame = false
function resetBoard(){
    board = ["1","2","3","4","5","6","7","8","9"]
}
function generateBoard(){
    console.log("|", board[0], "|", board[1], "|", board[2]);
    console.log("|", board[3], "|", board[4], "|", board[5]);
    console.log("|", board[6], "|", board[7], "|", board[8]);
}
function isFree(squareNumber){
    switch (board[squareNumber-1]){
        case "x":
            return false
        case "o":
            return false
        default:
            return true
    }
}
function setTile(player, tile){
    if (player === "x" || player === "o"){
        board[tile-1] = player;
    } else {
        console.log("player not found");
    }
}
function move(player, tile){
    if (isFree(tile)){
        setTile(player, tile);
        return true
    } else{
        console.log("tile already in use!");
    }
}
function nextRound(){
    let player = players[nextPlayer];
    let success = false;

    while (!success) {
        let tile = prompt(player + "'s move. Please type the tile number.");

        while(tile > 9 || tile < 1 || isNaN(tile)) {
            console.log("please provide a number from 1 to 9");
            tile = prompt(player + "'s move. Please type the tile number.");
        }

        success = move(player, parseInt(tile));
    }
    nextPlayer = 1 - nextPlayer;  // toggles between 0 and 1
    generateBoard();
    endOfGame = checkScore();
}
function checkScore(){
    let player;

    if ((board[0] === board[1]) && (board[1] === board[2])) {
        player = board[0];
    } else if ((board[0] === board[3]) && (board[3] === board[6])) {
        player = board[0];
    } else if ((board[0] === board[4]) && (board[4] === board[8])) {
        player = board[0];
    } else if ((board[1] === board[4]) && (board[4] === board[7])) {
        player = board[1];
    } else if ((board[3] === board[4]) && (board[4] === board[5])) {
        player = board[3];
    } else if ((board[2] === board[4]) && (board[4] === board[6])) {
        player = board[2];
    } else if ((board[6] === board[7]) && (board[7] === board[8])) {
        player = board[6];
    } else if ((board[2] === board[5]) && (board[5] === board[8])) {
        player = board[2];
    } else if (!isFree(1) && !isFree(2) && !isFree(3) && !isFree(4) && !isFree(5) && !isFree(6) && !isFree(7) && !isFree(8) && !isFree(9)) {
        console.log("No more space, tie.");
        return true;
    } else {
        return false;
    }

    console.log(player, "won.");
    return true;
}

function startGame(){
    resetBoard()
    generateBoard()
    let startingPlayer = prompt("Who starts? please type x or o");
    if (startingPlayer !== "o" && startingPlayer !== "x"){
        console.log("invalid answer")
    } else if (startingPlayer === "o"){
        nextPlayer = 1;
    }
    while(!endOfGame){
        nextRound()
    }
}