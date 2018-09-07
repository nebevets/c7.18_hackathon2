/****************************************************************************************************
* description: sets playerName key of global player object, call getRandomWordsFromNYT
 * @param: playerName as string
 * @return:
 */
function addPlayerToGame(playerName){
	player.name = playerName.toLowerCase();
	if(totalPlayersObj[playerName]){
		player.score = totalPlayersObj[playerName].score;
	}
	else{
		totalPlayersObj[playerName] = {score: 0};
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
	for( let outer = 0; outer < clueImgArray.length; outer++ ){
		for( let inner = 0; inner < guessImgArray.length; inner++ ){
			if( clueImgArray[ outer ].name === guessImgArray[ inner ].name ){
				currentScore += 10;
				if( clueImgArray[outer].value < guessImgArray[inner].value ){
					currentScore += (clueImgArray[outer].value / guessImgArray[inner].value) * 10
				}
				else{
					currentScore += (guessImgArray[outer].value / clueImgArray[inner].value) * 10
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