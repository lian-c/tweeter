$(document).ready(function() {

  $('textarea').on('input', function(event) {
   
    let textLength = (this.value.length);
   let counter = this.parentNode.lastElementChild.childNodes[3];
    counter.innerHTML  =  140 - textLength;
    
    if (textLength > 140) {
      $(counter).addClass("overlimit")
    } 
    if (textLength <= 140) {
      $(counter).removeClass("overlimit")
    }
  });

});