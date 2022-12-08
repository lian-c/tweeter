/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(() => {

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.current-tweets').prepend($tweet);
    }
  };


  const createTweetElement = function(tweetObject) {
    const $tweetHTML = $(`
  <article>
    <header>
        <div class="leftside-header">
            <img class="user-icon" src="${tweetObject.user.avatars}">
            <div class="tweet-name">
            ${tweetObject.user.name}
            </div>
        </div>
          <div class="username">
          ${tweetObject.user.handle}
          </div>
    </header>
        <p class="tweet-text">${tweetObject.content.text}</p>
    <footer>
      <p class="date">${timeago.format(tweetObject.created_at)}</p>
      <div class="tweet-icon">
         <i class="fa-solid fa-flag"></i>
         <i class="fa-solid fa-retweet"></i>
         <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `);
    return $tweetHTML;
  };


  // renderTweets(data);
// Text that is written in text box is displayed in console.log
  $('#tweet-text').submit(function(event) {
    event.preventDefault();
    const data = $('#tweet-text').serialize();
    $.post('/tweets', data, function(response) {
      console.log(`data ${data} and response ${response}`);
      loadTweets();
    });
  });

  const loadTweets = function (){
      $.ajax('/tweets', {method: 'GET'}) //.ajax implements the promise interface
      .then(function(newTweet){
        renderTweets(newTweet)
      })

  };
 loadTweets();
 

});