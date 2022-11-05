const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1b7197f7a5msh77b06ed09b7fe0cp156c3bjsn6470e99d7eda',
		'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
	}
};
let inputUrl = document.querySelector('input')
const converter = {
	videoContainer: document.querySelector('.video'),

	fetchMp3: function (videoUrl) {
		fetch(`https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess?url=${videoUrl}&format=mp3&responseFormat=json&lang=en`, options)
			.then(response => response.json())
			.then(response => {
				this.createVideo(
					response.YoutubeAPI.thumbUrl,
					response.YoutubeAPI.titolo,
					response.YoutubeAPI.urlMp3,
				)
				inputUrl.placeholder = 'Converting...'
				inputUrl.style.boxShadow = '0px 0px 15px green'
			})
	},

	createVideo: function (videoImg, videoTitle, urlMp3Donwload) {
		this.videoContainer.innerHTML = ''
		this.videoContainer.insertAdjacentHTML('afterbegin',

			`
				<img src=${videoImg}>
				<p>${videoTitle}</p>
				<a href='${urlMp3Donwload}'>Download</a>
			`		
		)
		inputUrl.value = ''
		inputUrl.placeholder = 'Enter Url...'
		inputUrl.style.boxShadow = 'box-shadow: 0px 0px 15px grey'
	
	},

	convertVideo: function () {
		if (inputUrl.value === '') {
			inputUrl.placeholder = 'URL is empty'
			inputUrl.style.boxShadow = '0px 0px 15px red'
		}
		else {
			this.fetchMp3(inputUrl.value)
		}
	}
}

const convertBtn = document.querySelector('#convert')

convertBtn.addEventListener('click', e => {
	converter.convertVideo()
})


