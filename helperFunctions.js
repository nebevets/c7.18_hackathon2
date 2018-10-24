/****************************************************************************************************
* description: sets playerName key of global player object, call getRandomWordsFromNYT
 * @param: playerName as string
 * @return:
 */
function addPlayerToGame(playerName){
	player.name = playerName.toLowerCase();
	if(totalPlayersObj[player.name]){
		player.score = totalPlayersObj[player.name].score;
	}
	else{
		totalPlayersObj[player.name] = {score: 0};
	}
	saveGameData();
	getRandomWordsFromNYT();
}
/****************************************************************************************************
 * description: getRandomInt takes a min and max number for a range of random ints to return
 * @param: min, max
 * @return: random int
 */
function getRandomInt(min, max){
	return Math.floor(Math.random()* (max-min+1))+min;
}
/****************************************************************************************************
* description: for in loop, compare keys and values gives points calls sameGameData
 * @param: clueImgObj and guessImgObj
 * @return: currentScore
 */
function compareClueImgToGuessImg(clueImgArray, guessImgArray){
	let currentScore = 0;
	for( let clueImgIndex = 0; clueImgIndex < clueImgArray.length; clueImgIndex++ ){
		for( let guessedImgIndex = 0; guessedImgIndex < guessImgArray.length; guessedImgIndex++ ){
			if( clueImgArray[ clueImgIndex ].name === guessImgArray[ guessedImgIndex ].name ){
				currentScore += 10;
				if( clueImgArray[clueImgIndex].value < guessImgArray[guessedImgIndex].value ){
					currentScore += (clueImgArray[clueImgIndex].value / guessImgArray[guessedImgIndex].value) * 10
				}
				else{
					currentScore += (guessImgArray[clueImgIndex].value / clueImgArray[guessedImgIndex].value) * 10
				}
			}
		}
	}
	currentScore = parseInt(currentScore);
	totalPlayersObj[player.name].score += currentScore;
	saveGameData();
	return currentScore;
}
/****************************************************************************************************
* description: defines the leader board button event handler
 * @param: event
 * @return: none
 */
function leaderboardButtonHandler(event){
	$('.container').empty();
	getLeaderBoardPage();
}
/****************************************************************************************************
* description: skips the current set of clues for a new image and clues
 * @param: none
 * @return: none
 */
function skipButtonHandler() {
	$('.container').empty();
	getRandomWordsFromNYT();
}