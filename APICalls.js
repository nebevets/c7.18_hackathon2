/****************************************************************************************************
* description:
 * @param: wordArray, a randomList
 * @return: Clue Image
 */
function getRandomImageFromFlickr(wordArray){
	getQuote();
  	const apiKey = "2bcd2e195e7ea98f459f7bd6bdde6a29";
  	let searchKeyWordList = wordArray;
  	let randomKeyWord = searchKeyWordList[getRandomInt(0, searchKeyWordList.length-1)];
	const flickrConfig = {
		url: `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${randomKeyWord}&per_page=5`,
    	success: result => {
      		const randomPhoto = result.photos.photo[getRandomInt(0, result.photos.photo.length-1)]
      		if(randomPhoto === undefined) {
				randomKeyWord = searchKeyWordList[getRandomInt(0, searchKeyWordList.length-1)];
				flickrConfig.url = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&text=${randomKeyWord}&per_page=5`;
				$.ajax(flickrConfig);
      		}
    		let flickrImgURL = `https://farm${randomPhoto.farm}.staticflickr.com/${randomPhoto.server}/${randomPhoto.id}_${randomPhoto.secret}.jpg`
			savedGameImages.clueImg = flickrImgURL;
    		clarifai.models.predict(Clarifai.GENERAL_MODEL, flickrImgURL).then(response => {
        		let clarifaiResponse = response;
        		clueImg = clarifaiResponse.outputs[0].data.concepts;
        		createCluesOnDom(clueImg);
    		});
    	}
  	}
  	$.ajax(flickrConfig);
}
/****************************************************************************************************
 * description: gets a quote from geek jokes
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
		}
	}
	$.ajax(quotesAndJokesConfig);
}
/****************************************************************************************************
* description: this gets the image the user uploads as a base64 image
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
			randomWordArray.push('meerkat');
			getRandomImageFromFlickr(randomWordArray);
		}
	}
	$.ajax( ajaxOptions );
}
