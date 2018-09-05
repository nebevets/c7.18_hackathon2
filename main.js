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
const player = {};
let clueImg = {};
let guessImg = {};







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
  addEventHandlers();




}

/***************************************************************************************************
* description: addClickHandlers for start button on plater star page, button for submit guess img, button to open leaderboard, button to go back to main page  
* @params: none
* @returns: none
*     
*/
function addEventHandlers(){
  submitButtonHandler();




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
		'text': 'This is currently filler text FIXME'
	});
	let newFileForm = $('<div>', {
		'class': 'form-group'
	});
	let newLabel = $('<label>', {
		'class': 'control-label',
		'for': 'uploadFile',
		'text': 'Select your file here: '
	});
	let newInput = $('<input>', {
		'class': 'form-control',
		'type': 'file',
		'name': 'uploadFile'
	});
	let newButtonForm = $('<div>', {
		'class': 'form-group'
	});
	let newUploadButton = $('<button>', {
		'class': 'upload btn btn-default',
		'text': 'Upload'
	});
	let newLeaderBoardButton = $('<button>', {
		'class': 'leaderBoard btn btn-info',
		'text': 'Leader Board'
	});

	newUl.append(newLi1);
	newFileForm.append(newLabel, newInput);
	newButtonForm.append(newUploadButton, newLeaderBoardButton);
	newClues.append(newUl);
	newCluesContainer.append(newInstructions, newClues, newFileForm, newButtonForm);
	$('.container').append(newCluesContainer);

}
/****************************************************************************************************
* description: dom create instructions for game and allows time to send and receive data from servers, click to close, calls getImageDataFromWatson
 * @param:
 * @return: 
 */
function instructionsModal(){  
	var newPara = $('<p>', {
		text: `This is a image based scavenger hunt game. IBM's AI, Watson, will pick an random image from Flickr's database, and evaluate the image. 
				You will see the evaluation from Watson, and then you must send Watson a picture that you believe best represents his initial evaluation.
				You will receive points, depending on how similar your image evaluation is to the original image evaluation. Good luck on the hunt!`,
		class: 'instructions'
	});
	$('.modal-body').append(newPara)
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
function submitButtonHandler(event){  
  getImageDataFromWatson();




}
/****************************************************************************************************
* description: for in loop, compare keys and values gives points
 * @param: clueImgObj and guessImgObj
 * @return: 
 */
function compareClueImgToGuessImg(clueImgObj, guessImgObj){  
      




}
/****************************************************************************************************
* description:
 * @param: none
 * @return: none
 */
function getResultsModal(){  
      




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
 * @param: none
 * @return: Clue Image
 */
function getRandomImageFromFlickr(){  
      




}
/****************************************************************************************************
* description: 
 * @param: 
 * @return: 
 */
function getLeaderBoardModal(){  
      




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
function waitingModal(){  
  getTrumpQuote();




}
/****************************************************************************************************
* description:
 * @param: none
 * @return: trumpQuote
 */
function getTrumpQuote(){  
      




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
 * @param: image
 * @return: compressedImage
 */
function compressImageOnCanvas(){  
   
  




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
// function (){  
   
  




// }
/****************************************************************************************************
* description:
 * @param:
 * @return: 
 */
// function (){  
   
  




// }
/****************************************************************************************************/