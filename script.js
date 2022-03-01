const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const NewQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoading() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

let apiQuotes = [];

// Show New Quote

function newQuote() {
  showLoading();
  // Pick a random quote from apiQuotes array

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if Author field is balnk and replace it with 'Unknown'

  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote lenght to determine the styling

  if (quote.text.length > 110) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoading();
}

// Get Quotes From API
async function getQuotes() {
  showLoading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
NewQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// On Load
getQuotes();
loader.hidden = false;
