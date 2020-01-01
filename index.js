let quoteText = document.getElementById("moteQuote");
let quoteAuthor = document.getElementById("quoteAuthor");
let catImage = document.getElementById("catImg");

const getApi = async url => {
  const req = await fetch(url);
  const res = await req.json();
  return res;
};

const getData = async () => {
  const imageData = await getApi("https://aws.random.cat/meow");
  const quoteData = await getApi("https://quote-garden.herokuapp.com/quotes/random");
  catImage.src = imageData.file;
  quoteText.innerHTML = quoteData.quoteText;
  quoteData.quoteAuthor === "" ? quoteAuthor.innerHTML = "Anonymous": quoteAuthor.innerHTML = quoteData.quoteAuthor;
};

document.getElementById("quoteGetter").onclick = () => getData();
document.addEventListener("DOMContentLoaded", () => getData());