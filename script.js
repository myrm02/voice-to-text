if ('webkitSpeechRecognition' in window) {
	let recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
  
	let colorTable = {
	  "bleu": "blue",
	  "rouge": "red",
	  "vert": "green",
	  "jaune": "yellow",
	  "rose": "pink",
	  "violet": "purple",
	  "orange": "orange",
	  "gris": "gray",
	  "noir": "black",
	  "blanc": "white"
	};
  
	let fruitGifTable = {
	  "banane": "#bananaRain",
	  "pomme": "#appleRain",
	  "citron": "#citronRain",
	  "fraise": "#fraiseRain",
	  "cerise": "#ceriseRain",
	};
  
	document.querySelector('#start-bouton').addEventListener('click', () => {
	  recognition.start();
	});
  
	recognition.onresult = (event) => {
	  let result = event.results[event.results.length - 1][0].transcript;
  
	  for (let color in colorTable) {
		if (result.toLowerCase().includes(color)) {
		  document.body.style.backgroundColor = colorTable[color];
		  break;
		} else {
		  document.body.style.backgroundColor = "";
		}
	  }
  
	  for (let fruit in fruitGifTable) {
		let fruitGif = document.querySelector(fruitGifTable[fruit]);
		if (fruitGif) { 
		  if (result.toLowerCase().includes(fruit)) {
			fruitGif.style.display = "block";
		  } else {
			fruitGif.style.display = "none";
		  }
		}
	  }
  
	  let output = document.querySelector('#output');
	  let newParagraph = document.createElement("p");
	  newParagraph.textContent = result;
	  output.appendChild(newParagraph);

	  fetch("https://voice-to-text-api.onrender.com/", {
		// Adding method type
		method: "POST",

		headers: {
			'x-rapidapi-key': '5279274116mshfb09f8d31d5c9e4p18d144jsn5da42cdeb7c7',
			'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
			'Content-Type': 'application/json'
		},
	
		// Adding body or contents to send
		body: JSON.stringify({
			q: result,
			source: "fr",
			target: "en"
		})
	  }).then((res) => {
		console.log(res.json().then((text) => myDisplay(text.translatedText)))
	  })

	  function myDisplay(text) {
		let output = document.querySelector('#translation');
	  	let newParagraph = document.createElement("p");
	  	newParagraph.textContent = text;
	  	output.appendChild(newParagraph);
	  }
  
	};
  
	document.querySelector('#stop-bouton').addEventListener('click', () => {
	  recognition.stop();
	});
  
	document.querySelector('#reset-bouton').addEventListener('click', () => {
	  document.body.style.backgroundColor = "";
	  document.querySelector('#output').innerHTML = '';
	});
  } else {
	alert('Web Speech API is not supported in this browser.');
  }
  
// keywords button
let btnKeywords = document.getElementById('btn-keywords');
let divKeywords = document.getElementById('keywords');

btnKeywords.addEventListener('click', () => {
	if (divKeywords.classList.contains('none')) {
		divKeywords.classList.remove('none');
	} else {
		divKeywords.classList.add('none');
	}
});
