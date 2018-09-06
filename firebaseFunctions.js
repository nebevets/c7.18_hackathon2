function leaderBoardUpdated(data) {
    console.log('leaderBoardUpdated')
    if(!data){return;} //if there's nothing in data, don't update board
    totalPlayersObj = data.totalPlayersObj;

    // player1.name = data.player1.name;
    // player1.mark = data.player1.mark;
    // player1.victories = data.player1.victories;
    // player2.name = data.player2.name;
    // player2.mark = data.player2.mark;
    // player2.victories = data.player2.victories;
    // if (data.currentPlayer.mark === 'X') {
    //     currentPlayer = player1;
    // } else {
    //     currentPlayer = player2;
    // }
    // booleanWinGame = data.booleanWinGame;
    // booleanDrawGame = data.booleanDrawGame
    // drawVictories = data.drawVictories;
    // boardSize =  data.boardSize;
    // if (currentGameBoard.length) {
    //     convertToArray(data.currentGameBoard);
    //     updateGameBoard();
    // }
    // if(booleanWinGame){
    //     setTimeout(function(){showResultScreen(false)},800);
    // }
    // if(booleanDrawGame){
    //     setTimeout(function(){showResultScreen(true)},800);
    // }
    // if(booleanResetGame){
    //     setTimeout(function(){resetGame()},800);
    // }
    // if(currentPlayer.mark === 'O'){
    //     winCounter: data.winCounter
    // }
}

function saveGameData() {
    leaderboardFirebaseDB.saveState({
        totalPlayersObj: totalPlayersObj
    });
    // ticTacToe.saveState({
    //     player1: {
    //         name: player1.name,
    //         mark: player1.mark,
    //         victories: player1.victories
    //     },
    //     player2: {
    //         name: player2.name,
    //         mark: player2.mark,
    //         victories: player2.victories
    //     },
    // });
}
