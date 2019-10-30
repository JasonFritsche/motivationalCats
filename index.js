let dataAuthor;
let dataQuoteText;
let catUrl;

let loadingIndicatorList = document.getElementsByClassName("loading-indicator");

const getData = () => {
  getQuote();
  getCat();
};

const getQuote = () => {
  setLoadingIndicator(true);
  quoteContainer.style.display = 'none';
  fetch("https://quote-garden.herokuapp.com/quotes/random")
    .then(res => res.json())
    .then(data => {
      dataAuthor = data.quoteAuthor;
      dataQuoteText = data.quoteText;
      quoteText.innerHTML = dataQuoteText;
      if (dataAuthor === "") {
        quoteAuthor.innerHTML = "Anonymous";
      } else {
        quoteAuthor.innerHTML = dataAuthor;
      }
      setLoadingIndicator(false);
      quoteContainer.style.display = '';
    });
};

const getCat = () => {
  setLoadingIndicator(true);
  catImgSrc.style.display = 'none';
  fetch("https://aws.random.cat/meow")
    .then(res => res.json())
    .then(data => {
      catUrl = data.file;
      catImgSrc.src = catUrl;
      setLoadingIndicator(false);
      catImgSrc.style.display = '';
    });
};

let quoteText = document.getElementById("moteQuote");
let quoteAuthor = document.getElementById("quoteAuthor");
let catImgSrc = document.getElementById("catImg");
let quoteContainer = document.getElementById("quote-container");

const quoteButton = document.getElementById("quoteGetter");
quoteButton.onclick = () => {
  getData();
};


setLoadingIndicator = (isShow=false) => {
  for( let i=0; i<loadingIndicatorList.length ;i++ ){
    let loading = loadingIndicatorList[i];
    loading.style.display = isShow ? '' : 'none';
  }
}