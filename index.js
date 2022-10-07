let quoteText = document.getElementById("quoteText");
let quoteAuthor = document.getElementById("quoteAuthor");
let catImgSrc = document.getElementById("catImg");
let loader = document.getElementById("loader");

const activateLoader = () => {
  loader.classList.add("loader_activated");
};

const deactivateLoader = () => {
  loader.classList.remove("loader_activated");
};

const getData = async () => {
  activateLoader();

  await getQuote();
  await getCatImage();

  if (catImgSrc.dataset.loading === "false") {
    deactivateLoader();
  }
};

const getQuote = async () => {
  const res = await fetch("https://quote-garden.herokuapp.com/api/v3/quotes/random?genre=motivational");
  const response = await res.json();
  const data = response.data[0];
  const dataAuthor = `${data.quoteAuthor}`;
  const dataQuoteText = `"${data.quoteText}"`;

  quoteText.innerHTML = dataQuoteText;
  if (dataAuthor === "") {
    quoteAuthor.innerHTML = "Anonymous";
  } else {
    quoteAuthor.innerHTML = dataAuthor;
  }
};

const getCatImage = async () => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await res.json();
  const catUrl = data[0].url;

  catImgSrc.src = catUrl;
  catImgSrc.dataset.loading = true;
};

const quoteButton = document.getElementById("quoteGetter");
quoteButton.onclick = () => {
  getData();
};

catImgSrc.addEventListener("load", () => {
  catImgSrc.dataset.loading = false;
});

const imageObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutationRecord) => {
    const { loading } = mutationRecord.target.dataset;

    if (loading === "false") {
      deactivateLoader();
    }
  });
});

imageObserver.observe(catImgSrc, {
  attributes: true,
  attributeFilter: ["data-loading"],
});

let copyBtn = document.getElementById("copy-btn");
let copyText = document.getElementById("copy-text");
copyBtn.addEventListener("click", () => {
  const cb = navigator.clipboard;
  cb.writeText(`${quoteText.innerText} by ${quoteAuthor.innerText}`).then(() => {    
    copyText.style.display = "inline-block";
    setTimeout(function(){
      copyText.style.display = "none";
  }, 1000);
  });
});
