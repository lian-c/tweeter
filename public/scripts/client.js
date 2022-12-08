/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(() => {

  const escape = function (str) { //prevents scripts being run by client side
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  

  const renderTweets = function(tweets) {
    $('.current-tweets').empty(); //empty so it doesn't repeat
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
        <p class="tweet-text">${escape(tweetObject.content.text)}</p>
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




  $('#tweet-text').submit(function(event) { 
    event.preventDefault();
    const data = $(this).serialize();

    if($('textarea').val() === ""){
      $('.error.error-overlimit').hide();  //hide so it won't show both error
        $('.error.empty').slideDown( "slow" );
        return;
      
    }
    if ($('output.counter').hasClass("overlimit")) { //class only exist if over the character limit
      $('.error.empty').hide(); 
      $('.error.error-overlimit').slideDown( "slow" );
        return;
      
    } 
 
    $.post('/tweets', data, function(response) {
      console.log(`data ${data} and response ${response}`);
      $('.error.empty').hide(); //hide errors from view 
      $('.error.error-overlimit').hide();
      $('textarea').val('');
      loadTweets();


    });
  });

  const loadTweets = function (){ //grabs tweets from /tweets 
      $.ajax('/tweets', {method: 'GET'}) 
      .then(function(newTweet){
        renderTweets(newTweet)
      })

  };
 loadTweets();
 

$(function() {

  $("body").on('click', ".error", function() {
      $(this).toggleClass('toggle');
      return false;
  });
  
});



});