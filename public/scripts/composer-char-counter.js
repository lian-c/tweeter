$(document).ready(function() {

  $('textarea').on('input', function(event) {
   
    console.log(this.value)
    let textLength = (this.value.length)
   let counter = this.parentNode.lastElementChild.childNodes[3]
    counter.innerHTML  =  (140-textLength);
    
  });

});