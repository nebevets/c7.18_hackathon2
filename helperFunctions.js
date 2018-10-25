/****************************************************************************************************
* description: sets playerName key of global player object, call getRandomWordsFromNYT
 * @param: playerName as string
 * @return:
 */
function addPlayerToGame(playerName){
	player.name = playerName.toLowerCase();
	if(totalPlayersObj[player.name]){
		player.score = totalPlayersObj[player.name].score;
		player.attempts = totalPlayersObj[player.name].attempts
	}
	else{
		totalPlayersObj[player.name] = {score: 0, attempts: 0};
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
* description: used to score image sent to Clarifai, and the image from Flickr that was sent. 
	scores based on matched catagories, as well as how similar the catagories are.
 * @param: clueImgObj and guessImgObj
 * @return: currentScore
 */
function compareClueImgToGuessImg(clueImgArray, guessImgArray){
	let currentScore = 0;
		//loops through each object returned from Clarifai 
	for( let clueImgIndex = 0; clueImgIndex < clueImgArray.length; clueImgIndex++ ){
		for( let guessedImgIndex = 0; guessedImgIndex < guessImgArray.length; guessedImgIndex++ ){
			if( clueImgArray[ clueImgIndex ].name === guessImgArray[ guessedImgIndex ].name ){		//makes a comparison of the catagory that Clarifai returned
				currentScore += 10;		//if catagory was a match, give user points.
					//then does a comparison on the value of the catagory, and finds the difference of the two values, and assigns a score based on the difference
				if( clueImgArray[clueImgIndex].value < guessImgArray[guessedImgIndex].value ){
					currentScore += (clueImgArray[clueImgIndex].value / guessImgArray[guessedImgIndex].value) * 10
				}
				else{
					currentScore += (guessImgArray[clueImgIndex].value / clueImgArray[guessedImgIndex].value) * 10
				}
			}
		}
	}
	currentScore /= 400;	//turns the score into a percent
	currentScore = parseInt(currentScore);
	totalPlayersObj[player.name].score += currentScore;
	totalPlayersObj[player.name].attempts++;
	saveGameData();
	return currentScore;
}
/****************************************************************************************************
* description: defines the leader board button event handler
 * @param: event
 * @return: none
 */
function leaderboardButtonHandler(event){
	emptyContainer();
	getLeaderBoardPage();
}
/****************************************************************************************************
* description: skips the current set of clues for a new image and clues
 * @param: none
 * @return: none
 */
function skipButtonHandler() {
	player.attempts += 0.25;
	emptyContainer();
	getRandomWordsFromNYT();
}
/****************************************************************************************************
* description: empties the contents of the page container
 * @param: none
 * @return: none
 */
function emptyContainer() {
	$('.container').empty();
}