/****************************************************************************************************
* description: sets playerName key of global player object, call getRandomWordsFromNYT
 * @param: playerName as string
 * @return: none
 */
function addPlayerToGame(playerName) {
	player.name = playerName.toLowerCase();
	if (totalPlayersObj[player.name]) {
		player.score = totalPlayersObj[player.name].score;
		player.attempts = totalPlayersObj[player.name].attempts
	}
	else {
		totalPlayersObj[player.name] = { score: 0, attempts: 0 };
	}
	saveGameData();
	getRandomWordsFromNYT();
}
/****************************************************************************************************
 * description: getRandomInt takes a min and max number for a range of random ints to return
 * @param: min, max
 * @return: random int
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/****************************************************************************************************
* description: used to score image sent to Clarifai, and the image from Flickr that was sent. 
	scores based on matched catagories, as well as how similar the catagories are.
 * @param: clueImgObj and guessImgObj
 * @return: currentScore
 */
function compareClueImgToGuessImg(clueImgArray, guessImgArray) {
	let currentScore = 0;
	//loops through each object returned from Clarifai 
	for (let clueImgIndex = 0; clueImgIndex < clueImgArray.length; clueImgIndex++) {
		for (let guessedImgIndex = 0; guessedImgIndex < guessImgArray.length; guessedImgIndex++) {
			if (clueImgArray[clueImgIndex].name === guessImgArray[guessedImgIndex].name) {		//makes a comparison of the catagory that Clarifai returned
				currentScore += 10;		//if catagory was a match, give user points.
				//then does a comparison on the value of the catagory, and finds the difference of the two values, and assigns a score based on the difference
				if (clueImgArray[clueImgIndex].value < guessImgArray[guessedImgIndex].value) {
					currentScore += (clueImgArray[clueImgIndex].value / guessImgArray[guessedImgIndex].value) * 10
				}
				else {
					currentScore += (guessImgArray[clueImgIndex].value / clueImgArray[guessedImgIndex].value) * 10
				}
			}
		}
	}
	currentScore /= 4;	//turns the score into a percent
	currentScore = parseInt(currentScore);
	player.score += currentScore;
	player.attempts++
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
function leaderboardButtonHandler(event) {
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
	totalPlayersObj[player.name].attempts += 0.25;
	saveGameData();
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
	makeEllipsis();
}
/****************************************************************************************************
* description: dom creates the error modal and shows it.
 * @param: titleText is displayed in the title of the modal. errors is an array of error messages
 *         that are shown in the modal body.
 * @return: none
 */
function showErrorModal(titleText, errors) {
	$modalTitle = $('.modal-title');
	$modalMessage = $('.modal-body');
	$modalMessage.empty();
	$modalTitle.text(titleText);
	for (var error in errors) {
		var errorDivProps = {
			'class': 'alert alert-danger',
			text: errors[error]
		};
		var $errorDiv = $('<div>', errorDivProps);
		$modalMessage.append($errorDiv);
	}
	$('#errorModal').modal('show');
}
/*****************************************************************************************************
 * description: this creates dots in the middle of the screen to simulate progress
 * @param: dots is the number of dots to create
 * @return: none
 */
function makeEllipsis(dots){
	dots = dots || 1;
	ellipsis.text('.'.repeat(dots));
	(dots >= 5) ? dots = 0 : ++dots;
	ellipsisTimeout = setTimeout(()=>{
	  makeEllipsis(dots);
	}, 1000);
}
/*****************************************************************************************************
 * description: this destoys what makeEllipsis creates
 * @param: none
 * @return: none
 */
function destroyEllipsis(){
	clearTimeout(ellipsisTimeout);
	ellipsis.empty();
}
/*****************************************************************************************************
 * description: checks for an image that is "image not found" from flickr
 * @param: array is an array of objects from clarifai's image analysis.
 * @return: true if the image is bad, false is the image is good.
 */
function checkForImageNotFoundClues(array){
	var badClues = [
	  'illustration', 
	  'vector',
	  'design',
	  'desktop',
	  'graphic'
	];
	var clues = [];
	var matches = 0;
	
	for(var index =0; index < 5; index++){
	  clues.push(array[index].name);
	}
	for (var clue in clues){
	  if(badClues.includes(clues[clue])){
		matches++
	  }
	}
	return (matches > 3) ? true : false;
  }