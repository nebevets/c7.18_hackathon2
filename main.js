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
    
  



}
/****************************************************************************************************
* description: dom create instructions for game and allows time to send and receive data from servers, click to close, calls getImageDataFromWatson
 * @param:
 * @return: 
 */
function instructionsModal(){  
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
function (){  
   
  




}
/****************************************************************************************************
* description:
 * @param:
 * @return: 
 */
function (){  
   
  




}
/****************************************************************************************************/