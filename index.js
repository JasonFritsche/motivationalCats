let quoteText = document.getElementById('moteQuote');
let quoteAuthor = document.getElementById('quoteAuthor');
let catImgSrc = document.getElementById('catImg');

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
        });
};

const quoteButton = document.getElementById('quoteGetter');
quoteButton.onclick = () => {
    getData();
};
