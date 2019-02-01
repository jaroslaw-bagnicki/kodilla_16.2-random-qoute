
// Consts
var TWEET_LINK = 'https://twitter.com/intent/tweet?text=';
var QUOTE_URL = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';
var SAFE_PREFIX = 'https://cors-anywhere.herokuapp.com/';

// UI binds
var UIquote = $('#quote');
var UIauthor = $('#author');
var UIGetQuoteBtn = $('#get-quote-btn');
var UITweetBtn = $('#tweet-btn');

$(document).ready(function() {
  getQuote();
  UIGetQuoteBtn.click(getQuote);
});

function getQuote() {
  $.ajaxSetup({ cache: false });
  $.getJSON(SAFE_PREFIX + QUOTE_URL, createTweet);
}

function createTweet(input) {
  var data = input[0];
  var quoteText = $(data.content).text().trim();
  var quoteAuthor = data.title.length ? 'Author: ' + data.title : 'Unknown author';
  var tweetText = 'Quote of the day - ' + quoteText + quoteAuthor;
  
  if (tweetText.length > 140) {
    getQuote();
  } else {
    var tweet = TWEET_LINK + encodeURIComponent(tweetText);
    UIquote.text(quoteText);
    UIauthor.text(quoteAuthor);
    UITweetBtn.attr('href', tweet);
  }
}