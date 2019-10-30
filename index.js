let dataAuthor;
let dataQuoteText;
let catUrl;
const getData = () => {
	getQuote();
	getCat();
};
const getQuote = () => {
	fetch("https://quote-garden.herokuapp.com/quotes/random").then(res => res.json()).then(data => {
		dataAuthor = data.quoteAuthor;
		dataQuoteText = data.quoteText;
		quoteText.innerHTML = dataQuoteText;
		if (dataAuthor === "") {
			quoteAuthor.innerHTML = "Anonymous";
		} else {
			quoteAuthor.innerHTML = dataAuthor;
		}
	});
};
const getCat = () => {
	fetch("https://aws.random.cat/meow").then(res => res.json()).then(data => {
		catUrl = data.file;
	});
	if (catUrl === undefined) {
		catImgSrc.src = "img/default-cat.jpg";
	} else {
		catImgSrc.src = catUrl;
	}
	console.log(catImgSrc);
};
let quoteText = document.getElementById("moteQuote");
let quoteAuthor = document.getElementById("quoteAuthor");
let catImgSrc = document.getElementById("catImg");
const quoteButton = document.getElementById("quoteGetter");
quoteButton.onclick = () => {
	getCat();
	getQuote();
};
