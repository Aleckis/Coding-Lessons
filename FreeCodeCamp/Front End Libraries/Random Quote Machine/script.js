const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
let quotes = [];

const getNewQuote = () => {
  const currentQuote = quotes[Math.floor(Math.random() * 102)];

  $("#text").html(
    '<i class="fa-solid fa-quote-left"></i> ' + currentQuote.quote
  );
  $("#author").text("- " + currentQuote.author);
};

$(document).ready(() => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error status: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      quotes = data.quotes;
      getNewQuote();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  $("#new-quote").on("click", getNewQuote);
});
