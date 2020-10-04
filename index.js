let quoteText = document.getElementById('moteQuote');
let quoteAuthor = document.getElementById('quoteAuthor');
let catImgSrc = document.getElementById('catImg');
let quoteLoader = document.getElementById('quoteLoader');

const getData = async () => {
    await getQuote();
    await getCatImage();
};

const getQuote = async () => {
    const res = await fetch('https://quote-garden.herokuapp.com/quotes/random');
    const data = await res.json()
    const dataAuthor = `- ${data.quoteAuthor}`;
    const dataQuoteText = `"${data.quoteText}"`;
    quoteText.innerHTML = dataQuoteText;
    if (dataAuthor === '') {
        quoteAuthor.innerHTML = 'Anonymous';
    } else {
        quoteAuthor.innerHTML = dataAuthor;
    }
};

const getCatImage = async () => {
    const res = await fetch('https://api.thecatapi.com/v1/images/search')
    const data = await res.json()
    const catUrl = data[0].url;

    catImgSrc.src = catUrl;
};

const quoteButton = document.getElementById('quoteGetter');
quoteButton.onclick = () => {
    getData();
};
