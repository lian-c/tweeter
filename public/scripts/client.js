/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

  //prevents scripts being run by client side
  const escape = function (str) { 
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  //Takes a json and creates a tweet 
  const renderTweets = function(tweets) {
    $('.current-tweets').empty(); 
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

// Submits text to /tweets which 
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
    
    $.post('/tweets', data, function() {
      $('.error.empty').hide(); //hide errors from view 
      $('.error.error-overlimit').hide();
      $('textarea').val(''); //clear input text area after submitting
      $('output.counter').val(140) //make the counter reset to 140 again
      loadTweets();

    });
  });


 
 // Toggles bomb icon in error message when clicking on error message
 $(function() {
  $("body").on('click', ".error", function() {
    console.log("clicked")
      $(this).toggleClass('clicked');
      return false;
  });

});

 // Toggles writing a new tweet/close a new tweet, text area hides/shows when clicking arrow on nav
 $(function() {
  $(".icon").on('click', ".fa-angles-down", function() {
    $(".nav-tweet").toggleClass('toggle'); 
    $(".close-tweet").toggleClass('toggle'); 
  if ($(".nav-tweet").hasClass('toggle')){
    $('.new-tweet').slideDown( "slow" );
  } 
  else {
    $('.new-tweet').slideUp("slow");
    $('.error.empty').hide();
    return false;
  }});
});


//grabs tweets from /tweets 
const loadTweets = function (){ 
  $.ajax('/tweets', {method: 'GET'}) 
  .then(function(newTweet){
    renderTweets(newTweet)
  })
};

loadTweets();


});