/*
Hackathon project involving the combination of different data sources into an application or game

Requirements
Combine at least 4 external resources via AJAX requests and present their information in an application
Must be documented loosely on JSDOC standards
Must be issue-managed via meistertask
share the meistertask with daniel.paschal@learningfuze.com
name your project 7.18 Team [your team number] Hackathon

Judging Criteria
Appeal : is it visually appealing / well put together
Code Quality : is the code properly formatted, are variables and functions well defined and documented
Presentation : How well is it presented during the unveiling session
Task / Issue Management : How well was the development process documented / controlled. Were there well-defined issues, milestones, and project management
Innovative / Transformative : Did the project do something new and exciting? Was it bold and tried to do things that haven't been done much. Did it combine the data sources together in a way that was more useful than either source by itself
Ease of Use / Understanding : Was it easy to use the application / game, or if it was more complex, was the application or game able to provide you with tutorials or instructions that made understanding it a breeze.

*****     7:00pm Thursday, September 6th, 2018    ******
*/

$(document).ready(initializeApp);

/**  Define all global variables here.  **/
const player = {name: null, score: 0};
let totalPlayersObj = {};
let clueImg;
let guessImg;
const clarifai = new Clarifai.App({apiKey: 'f96e9dd06030485a9595af374d3e96da'});

let canvas;
let ctx;
const savedGameImages = {guessImg: null, clueImg: null};
let leaderboardFirebaseDB;





/***********************
notes:
Team 2
Steve Benedict
Gerald Blackmon
Jonathan Gallo
Randy Dang

/***************************************************************************************************
* description: initializes the application, including adding click handlers and pulling in any data from the server, in later versions will...
* @params: none
* @returns: none

*/
function initializeApp(){

	canvas = $('#imageCanvas');
	addEventHandlers();
	instructionsPage();
	leaderboardFirebaseDB = new GenericFBModel('potato1nuget2flower', leaderBoardUpdated);


}

/***************************************************************************************************
* description: addClickHandlers for start button on plater star page, button for submit guess img, button to open leaderboard, button to go back to main page
* @params: none
* @returns: none
*
*/
function addEventHandlers(){





}
/****************************************************************************************************
* description: dom create get player start page, calls instructions Modal
 * @param: none
 * @return: none
 */
function getPlayerModal(){





}
/****************************************************************************************************
* description:
 * @param:
 * @return:
 */
function playerModalButtonResponse(){
  instructionsModal();




}
/****************************************************************************************************
* description:
 * @param: img
 * @return: dataObj
 */
function getImageDataFromWatson(img){





}
/****************************************************************************************************
* description:
 * @param: clueObj
 * @return: none
 */
function createCluesOnDom(clueObj){
	let eyeSpyLogo = $('<img>', {
		class: 'logoImg',
		src: 'assets/eyespylogo.png',
	});
	let newCluesContainer = $('<div>', {
		class: 'cluesPage form-group'
	});
	let newInstructions = $('<h3>', {
		'class': 'instructions form-group',
		'text': 'Use the clues below to find an item. Once you have located it, take a photo of it for upload.',
	});
	let newClues = $('<div>', {
		'class': 'clues form-group'
	});
	let newUl = $('<ul>');
	let newLi1 = $('<li>', {
		'text': 'Here are your clues:'
	});

  let newOl = $('<ol>');

	let newFileForm = $('<div>', {
		'class': 'form-group'
	});
	let newLabel = $('<label>', {
		'class': 'control-label col-xs-12',
		'for': 'uploadFile',
		'text': 'Select your file here: '
	});
	let newInput = $('<input>', {
		'class': 'form-control col-xs-4 col-md-1 col-lg-3',
		'type': 'file',
		'id': 'uploadFile',
		'name': 'uploadFile'
	});
	let newButtonForm = $('<div>', {
		'class': 'form-group'
	});
	let newSkipButton = $('<button>', {
		'type': 'button',
		'class': 'skip btn btn-default col-xs-12 col-sm-2 col-sm-push-1 col-md-4 col-md-push-1',
		'text': 'Skip Clue',
		'click': () => skipButtonHandler()
	});
	let newLeaderBoardButton = $('<button>', {
		'type': 'button',
		'class': 'leaderBoard btn btn-info col-xs-12 col-sm-2 col-sm-push-1 col-md-4 col-md-push-2',
		'text': 'Leader Board',
		'click': () => leaderboardButtonHandler()
	});



  for(var i = 0; i < 5; i++) {
    newOl.append($('<li>', {
      text: clueObj[i].name
    }))
  };
  newLi1.append(newOl);
	newUl.append(newLi1);
	newFileForm.append(newLabel, newInput);
	newButtonForm.append(newSkipButton, newLeaderBoardButton);
	newClues.append(newUl);
	newCluesContainer.append(newInstructions, newClues, newFileForm, newButtonForm);
	$('.container').append(eyeSpyLogo, newCluesContainer);
	let imageLoader = $('#uploadFile');
	imageLoader.change(handleImage);

}
/****************************************************************************************************
* description: dom create instructions for game and allows time to send and receive data from servers, click to close, calls getImageDataFromWatson
 * @param:
 * @return:
 */

function instructionsPage(){
	let eyeSpyLogo = $('<img>', {
		class: 'logoImg',
		src: 'assets/eyespylogo.png',
	});
	let newLandingPageContainer = $('<div>', {
		'class': 'landingPage form-group'
	});
	let newInstructions = $('<h4>', {
		text: `EyeSpy a image based scavenger hunt game. A random image is chosen and evaluated.
				Clues are given to you based on this evaluation. You must find something that matches those clues,
				take a picture, and upload it for evaluation. You receive points, depending on how similar your image
				is to the original. Good luck on the hunt!`,
		class: 'instructions form-group'
	});
	let newPlayerForm = $('<div>', {
		'class': 'player form-group'
	});
	let newLabel = $('<label>', {
		'class': 'control-label',
		'for': 'playerName',
		'text': 'Enter your name: '
	});
	let newInput = $('<input>', {
		'class': 'form-control',
		'type': 'text',
		'name': 'playerName'
	});
	let newButtonForm = $('<div>', {
		'class': 'form-group'
	});
	let newGoBtn = $('<button>', {
        'type': 'button',
        'class': 'goBtn btn btn-default col-xs-4 col-xs-push-1 col-sm-3 col-sm-push-2 col-md-3 col-md-push-2',
        'text': 'Go!',
        'click': () => {
            let playerName = $('.landingPage input').val();
			if( !playerName ){
				return;
			}
            addPlayerToGame(playerName);
            $('.container').empty();
        }
    });
	let newLeaderBoardButton = $('<button>', {
		'type': 'button',
		'class': 'leaderBoard btn btn-info col-xs-4 col-xs-push-3 col-sm-3 col-sm-push-4 col-md-3 col-md-push-4',
		'text': 'Leader Board',
		'click': () => leaderboardButtonHandler()
	});
	newPlayerForm.append(newLabel, newInput);
	newButtonForm.append(newGoBtn, newLeaderBoardButton);
	newLandingPageContainer.append(newInstructions, newPlayerForm, newButtonForm);
	$('.container').append(eyeSpyLogo, newLandingPageContainer);

  getImageDataFromWatson();

}
/****************************************************************************************************
* description:
 * @param: none
 * @return: none
 */
function instructionsModalButtonResponse(){
  getImageDataFromWatson();




}
/****************************************************************************************************
* description:
 * @param: event
 * @return: none
 */
function leaderboardButtonHandler(event){
	$('.container').empty();
	getLeaderBoardPage();
}
/****************************************************************************************************
* description: for in loop, compare keys and values gives points
 * @param: clueImgObj and guessImgObj
 * @return:
 */
function compareClueImgToGuessImg(clueImgArray, guessImgArray){

	for( let outer = 0; outer < clueImgArray.length; outer++ ){
		for( let inner = 0; inner < guessImgArray.length; inner++ ){
			if( clueImgArray[ outer ].name === guessImgArray[ inner ].name ){
				console.log(clueImgArray[outer].name, "is a match with", guessImgArray[inner].name);
				player.score += 10;
				if( clueImgArray[outer].value < guessImgArray[inner].value ){
					player.score += (clueImgArray[outer].value / guessImgArray[inner].value) * 10
				}
				else{
					player.score += (guessImgArray[outer].value / clueImgArray[inner].value) * 10
				}
			}
		}
	}
	player.score = parseInt(player.score);
	totalPlayersObj[player.name].score += player.score;
	saveGameData();

}
/****************************************************************************************************
* description:
 * @param: none
 * @return: none
 */
function getResultsPage(){

	let eyeSpyLogo = $('<img>', {
		class: 'logoImg',
		src: 'assets/eyespylogo.png',
	});
	let newResultsPage = $('<div>', {
		'class': 'resultsPage'
	});
	let firstRow = $('<div>', {
		'class': 'row'
	});
	let clueCol = $('<div>', {
		'class': 'col-sm-6'
	});
	let clueThumbnail = $('<div>', {
		'class':'thumbnail'
	});
	let clueImgElement = $('<img>', {
		'class': 'clueImage',
		'src': savedGameImages.clueImg,
		'alt': 'your clue'
	});
	let clueCaption = $('<div>', {
		'class': 'caption'
	});
	let cluePara = $('<p>', {
		'text': 'This was your clue image...'
	});
	let userCol = $('<div>', {
		'class': 'col-sm-6'
	});
	let userThumbnail = $('<div>', {
		'class':'thumbnail'
	});
	let userImg = $('<img>', {
		src: savedGameImages.guessImg.src,
	});
	let userCaption = $('<div>', {
		'class': 'caption'
	});
	let userPara = $('<p>', {
		'text': 'This is what you found...'
	});
	let secondRow = $('<div>', {
		'class': 'row'
	});
	compareClueImgToGuessImg(clueImg, guessImg);
	let updateUser = $('<h1>', {
		'text': `Your score this round was ${player.score} out of 400!`
	})
	let buttonCol = $('<div>', {
		'class': 'col-sm-12'
	});
	let getClueButton = $('<button>', {
		'type': 'button',
		'class': 'getClue btn btn-default',
		'text': 'Get New Clue',
		'click': () => {
			$('.container').empty();
			getRandomWordsFromNYT();
		}
	});
	let newLeaderBoardButton = $('<button>', {
		'type': 'button',
		'class': 'leaderBoard btn btn-info',
		'text': 'Leader Board',
		'click': () => leaderboardButtonHandler()
	});

	clueCaption.append(cluePara)
	clueThumbnail.append(clueImgElement, clueCaption);
	clueCol.append(clueThumbnail);
	userCaption.append(userPara)
	userThumbnail.append(userImg, userCaption);
	userCol.append(userThumbnail);
	firstRow.append(clueCol, userCol);
	buttonCol.append(getClueButton, newLeaderBoardButton);
	secondRow.append(buttonCol);
	newResultsPage.append(firstRow, updateUser, secondRow);
	$('.container').append(eyeSpyLogo, newResultsPage);

}
/****************************************************************************************************
* description:
 * @param: none
 * @return: none
 */
function resultsModalButtonHandler(){
  getImageDataFromWatson();




}
/****************************************************************************************************
* description:
 * @param: wordArray, a randomList
 * @return: Clue Image
 */
function getRandomImageFromFlickr(wordArray){
	getQuote();
  const apiKey = "2bcd2e195e7ea98f459f7bd6bdde6a29";
  let searchKeyWordList = wordArray;
  let randomKeyWord = searchKeyWordList[Math.floor(Math.random() * searchKeyWordList.length + 1)];

  const flickrConfig = {
    url: `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${randomKeyWord}&per_page=5`,
    success: result => {
      const randomPhoto = result.photos.photo[Math.floor(Math.random() * result.photos.photo.length + 1)]

      console.log(randomPhoto);
      if(randomPhoto === undefined) {
        $.ajax(flickrConfig);
        return;
      }

      let flickrImgURL = `https://farm${randomPhoto.farm}.staticflickr.com/${randomPhoto.server}/${randomPhoto.id}_${randomPhoto.secret}.jpg`
	  savedGameImages.clueImg = flickrImgURL;
      console.log(flickrImgURL);

      clarifai.models.predict(Clarifai.GENERAL_MODEL, flickrImgURL).then(
        response => {
          let clarifaiResponse = response;
          console.log(clarifaiResponse.outputs[0].data.concepts)
          clueImg = clarifaiResponse.outputs[0].data.concepts;
          createCluesOnDom(clueImg);
        }
      )

      // sendToClarifai(flickrImgURL, clueImg);
    }
  }
  $.ajax(flickrConfig);
}
/****************************************************************************************************
* description:
 * @param:
 * @return:
 */
function getLeaderBoardPage(){
	let eyeSpyLogo = $('<img>', {
		class: 'logoImg',
		src: 'assets/eyespylogo.png',
	});
	let newLeaderBoardPage = $('<div>', {
		'class': 'leaderBoard'
	});
	let firstRow = $('<div>', {
		'class': 'row'
	});
	let nameH3 = $('<h3>', {
		'class': 'col-xs-6',
		'text': 'Name'
	});
	let statsH3 = $('<h3>', {
		'class': 'col-xs-6',
		'text': 'Stats'
	});
	let buttonRow = $('<div>', {
		'class': 'row'
	});
	let buttonCol = $('<div>', {
		'class': 'col-xs-12'
	})
	let getClueButton = $('<button>', {
		'type': 'button',
		'class': 'getClue btn btn-default',
		'text': 'Get New Clue',
		'click': () => {
			$('.container').empty();
			getRandomWordsFromNYT();
		}
	});

	buttonCol.append(getClueButton);
	buttonRow.append(buttonCol);
	firstRow.append(nameH3, statsH3);
	newLeaderBoardPage.append(firstRow);
	addPlayersToLeaderBoard(totalPlayersObj, newLeaderBoardPage);
	newLeaderBoardPage.append(buttonRow);
	$('.container').append(eyeSpyLogo, newLeaderBoardPage)
}
/****************************************************************************************************
* description:
 * @param:
 * @return:
 */
function updatePlayerScore(){





}
/****************************************************************************************************
* description:
 * @param: none
 * @return: none
 */
function waitingModal(quote){
	$('.modal-body').empty();
	let eyeSpyLogo = $('<img>', {
		class: 'logoImg',
		src: 'assets/eyespylogo.png',
	})
	$('.modal-title').text(`Hello ${player.name}, some entertainment while you're waiting`);
	let quoteOfTheDay = $('<div>', {
		class: 'quoteDiv',
		text: quote,
	})

	$('.modal-body').append(eyeSpyLogo, quoteOfTheDay);
	$('#waitingModal').modal('show');

}
/****************************************************************************************************
* description:
 * @param: none
 * @return: quote
 */
function getQuote(){
	const quotesAndJokesConfig = {
		datatype: 'json',
		method: 'get',
		url: `https://geek-jokes.sameerkumar.website/api`,
		success: result => {
			waitingModal(result);


		},
		error: result => console.log('not working', result)
	}
	$.ajax(quotesAndJokesConfig);
	}
/****************************************************************************************************
* description:
 * @param:
 * @return:
 */
function sendDataToFirebase(){





}
/****************************************************************************************************
* description:
 * @param:
 * @return:
 */
function receiveDataFromFirebase(){





}
/****************************************************************************************************
* description:
 * @param: none
 * @return: img base64
 */
function handleImage(){
	$('.container').empty();
  	getQuote();
  	let img;
	let reader = new FileReader();
	reader.onload = event => {
		img = new Image();
		img.src = event.target.result;
		savedGameImages.guessImg = img;
		let clarifaiBase64Obj = {'base64': img.src.substr( ( img.src.indexOf('4')+2 ) )};
		clarifai.models.predict(Clarifai.GENERAL_MODEL, clarifaiBase64Obj).then(
			response => {
				guessImg = response.outputs[0].data.concepts;
				getResultsPage();
			});
	}
	reader.readAsDataURL(event.target.files[0]);
}
/****************************************************************************************************
* description:
 * @param: compressed Image
 * @return: image
 */
function decompressImageOnCanvas(){



}
/****************************************************************************************************
* description:
 * @param:
 * @return:
 */
function addPlayersToLeaderBoard(playerObjFromFirebase, htmlElement){
	saveGameData();
	for( searchKey in playerObjFromFirebase ){
		let theCurrentKey = searchKey;
		let newRow = $('<div>', {
			'class': 'row'
		});
		let newPlayerName = $('<div>', {
			'class': 'col-xs-6',
			'text': theCurrentKey
		});
		let newPlayerScore = $('<div>', {
			'class': 'col-xs-6',
			'text': playerObjFromFirebase[theCurrentKey].score
		});
		newRow.append(newPlayerName, newPlayerScore);
		htmlElement.append(newRow);
	}
}
/****************************************************************************************************
* description: sets playerName key of global player object, call getRandomWordsFromNYT
 * @param: playerName as string
 * @return:
 */
function addPlayerToGame(playerName){
	player.name = playerName;
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
* description: Send image data to Clarifai to anaylyze image
 * @param: none
 * @return: none
 */
function skipButtonHandler() {
	$('.container').empty();
	getRandomWordsFromNYT();
}
/****************************************************************************************************
* description: resize the images on the results page to be responsive
 * @param: none
 * @return: none
 */
// function imageResizer(){
// 	let clueImage = $('.clueImage');
// 	let
// 	if(  )
// }
/****************************************************************************************************
 * description: getRandomWordsFromNYT uses NYT API to get travel news titles and abstracts. These
 * form a word list for our flickr image search. Word less than four characters long are filtered.
 * @param: none
 * @return: randomWordArray
 */
function getRandomWordsFromNYT(){
	let ajaxOptions = {
		url: "https://api.nytimes.com/svc/topstories/v2/travel.json",
		method: 'GET',
		data: {
			'api-key': "3248c8d085284383aa5bd7aa7146601c"
		},
		dataType: 'json',
		success: response => {
			const minWordLength = 4;
			const arrResults = response.results;
			let titleRandomIndex = getRandomInt(0, arrResults.length-1);
			let abstractRandomIndex = getRandomInt(0, arrResults.length-1);
			let textBlock = arrResults[titleRandomIndex].title + " " + arrResults[abstractRandomIndex].abstract;

			const wordArray = textBlock.split(' ');
			let randomWordArray = wordArray.filter(word => word.length > minWordLength);
			getRandomImageFromFlickr(randomWordArray);
		}
	}
	$.ajax( ajaxOptions );
}
/****************************************************************************************************
 * description: getRandomInt takes a min and max number for a range of random ints to return
 * @param: min, max
 * @return: random int
 */
function getRandomInt(min, max){
		return Math.floor(Math.random()* (max-min+1))+min;
}
