function leaderBoardUpdated(data) {
    if(!data){return;} //if there's nothing in data, don't update board
    totalPlayersObj = data.totalPlayersObj;

}

function saveGameData() {
    if(Object.keys(totalPlayersObj).length === 0 && totalPlayersObj.constructor === Object){
        return;
    }
    else{
        leaderboardFirebaseDB.saveState({
            totalPlayersObj: totalPlayersObj
        });
    }
}
