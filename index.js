let quoteText = document.getElementById('moteQuote');
let quoteAuthor = document.getElementById('quoteAuthor');
let catImgSrc = document.getElementById('catImg');
let catLoader = document.getElementById('catLoader');
let quoteLoader = document.getElementById('quoteLoader');

const getData = () => {
    getQuote();
    getCatImage();
};

const getQuote = () => {
    fetch('https://quote-garden.herokuapp.com/quotes/random')
        .then((res) => res.json())
        .then((data) => {
            const dataAuthor = `- ${data.quoteAuthor}`;
            const dataQuoteText = `"${data.quoteText}"`;
            quoteLoader.style.display = 'none';
            quoteText.innerHTML = dataQuoteText;
            if (dataAuthor === '') {
                quoteAuthor.innerHTML = 'Anonymous';
            } else {
                quoteAuthor.innerHTML = dataAuthor;
            }
        });
};

const getCatImage = () => {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then((res) => res.json())
        .then((data) => {
            const catUrl = data[0].url;
            catImgSrc.src = catUrl;
            catImgSrc.style.display = 'block';
            catLoader.style.display = 'none';
        });
};

const quoteButton = document.getElementById('quoteGetter');
quoteButton.onclick = () => {
    getData();
};
