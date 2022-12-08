/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(() => {
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const renderTweets = function(tweets) {
  for (const tweet of tweets){
    const $tweet = createTweetElement(tweet);
    $('current-tweets').prepend($tweet);
  }
}


const createTweetElement = function(tweetObject){
  const $tweetHTML = $(`
  <article>
        <header>
          <div class="leftside-header">
            <img class="user-icon" src="${tweetObject.user.avatars}">
            <div class="tweet-name">${tweetObject.user.name}</div>
          </div>
          <div class="username">${tweetObject.user.handle}</div>
        </header>
        <p class="tweet-text">${tweetObject.content.text}</p>
        <footer>
          <p class="date">${tweetObject.created_at}</p>
          <div class="tweet-icon">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
        </div>
        </footer>
      </article>
  `);
  return $tweetHTML
}
const $tweet = createTweetElement(tweetData);
// Test / driver code (temporary)
console.log(tweetData.user.name)
console.log($tweet); // to see what it looks like
$('.current-tweets').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});