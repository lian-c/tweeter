/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(() => {

  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Michael Scott",
        "avatars": "https://i.imgur.com/ShrnNhm.jpeg",
        "handle": "@prisonmike" },
      "content": {
        "text": "I AM HERE TO SCARE YOU STRAIGHT"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
      "name": "Retsuko",
      "avatars": "https://i.imgur.com/63pt6Hi.jpeg"
      ,
      "handle": "@deathmetalsanrio"
    },
    "content": {
      "text": "Underneath the smile, I’m metal till I die!"
    },
    "created_at": "10 days ago"
  }
  ]


const renderTweets = function(tweets) {
  for (const tweet of tweets){
    const $tweet = createTweetElement(tweet);
    $('.current-tweets').prepend($tweet);
    console.log($tweet)
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


renderTweets(data)

$('#tweet-text').submit(function(event){
  event.preventDefault();
});


});