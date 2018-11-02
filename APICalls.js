/****************************************************************************************************
* description: accesses Flickr API in order to receive a random image. 
* After we receive image, it gets sent to Clarifai. Once the results are received, calls createCluesOnDom
 * @param: wordArray, a randomList of words
 * @return: none
 */
function getRandomImageFromFlickr(wordArray) {
	let searchKeyWordList = wordArray;
	let randomKeyWord = searchKeyWordList[getRandomInt(0, searchKeyWordList.length - 1)];
	let flickrAttempts = 0;

	if (flickrAttempts > 3) {
		let errorTitle = 'Error: Server Not Responding';
		let errorMsgs = ['The image server is not responding. Please refresh the game and try again'];
		showErrorModal(errorTitle, errorMsgs);
	}

	const flickrConfig = {
		url: `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${flickrAPIKey}&format=json&nojsoncallback=1&text=${randomKeyWord}&per_page=5`,
		success: result => {
			const randomPhoto = result.photos.photo[getRandomInt(0, result.photos.photo.length - 1)];

			if (!randomPhoto && flickrAttempts < 3) {
				randomKeyWord = searchKeyWordList[getRandomInt(0, searchKeyWordList.length - 1)];
				flickrAttempts++;
				flickrConfig.url = `https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=${flickrAPIKey}&format=json&nojsoncallback=1&text=${randomKeyWord}&per_page=5`;
				$.ajax(flickrConfig);
			} else {
				const userID = randomPhoto.owner;
				retrieveFlickrUploaderInfo(userID);
			}

			let flickrImgURL = `https://farm${randomPhoto.farm}.staticflickr.com/${randomPhoto.server}/${randomPhoto.id}_${randomPhoto.secret}.jpg`;
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
* description: retrieves image uploader information to give credit for picture in results page
 * @param: userid
 * @return: none
 */
function retrieveFlickrUploaderInfo(userid) {
	const flickrConfig = {
		url: `https://api.flickr.com/services/rest?method=flickr.people.getInfo&api_key=${flickrAPIKey}&user_id=${userid}&format=json&nojsoncallback=1`,
		success: result => {
			savedGameImages.uploader = result.person.username._content;
		}
	}
	$.ajax(flickrConfig);
}

/****************************************************************************************************
* description: this gets the image the user uploads as a base64 image
 * @param: none
 * @return: none
 */
function handleImage() {
	emptyContainer();
	let img;
	let reader = new FileReader();
	reader.onload = event => {
		img = new Image();
		img.src = event.target.result;
		savedGameImages.guessImg = img;
		let clarifaiBase64Obj = { 'base64': img.src.substr((img.src.indexOf('4') + 2)) };
		clarifai.models.predict(Clarifai.GENERAL_MODEL, clarifaiBase64Obj).then(response => {
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
 * @return: none
 */
function getRandomWordsFromNYT() {
	let ajaxOptions = {
		url: "https://api.nytimes.com/svc/topstories/v2/travel.json",
		method: 'GET',
		data: {
			'api-key': NYTimesAPIKey
		},
		dataType: 'json',
		success: response => {
			const minWordLength = 4;
			const arrResults = response.results;
			let titleRandomIndex = getRandomInt(0, arrResults.length - 1);
			let abstractRandomIndex = getRandomInt(0, arrResults.length - 1);
			let textBlock = arrResults[titleRandomIndex].title + " " + arrResults[abstractRandomIndex].abstract;

			const wordArray = textBlock.split(' ');
			let randomWordArray = wordArray.filter(word => word.length > minWordLength);
			randomWordArray.push('meerkat');
			getRandomImageFromFlickr(randomWordArray);
		}
	}
	$.ajax(ajaxOptions);
}
