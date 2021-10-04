let quoteText = document.getElementById("moteQuote");
let quoteAuthor = document.getElementById("quoteAuthor");
let catImgSrc = document.getElementById("catImg");
let loader = document.getElementById("loader");

const activateLoader = () => {
    loader.classList.add("activated");
};

const deactivateLoader = () => {
    loader.classList.remove("activated");
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
    const res = await fetch(
        "https://quote-garden.herokuapp.com/api/v3/quotes/random?genre=motivational"
    );
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
