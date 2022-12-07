$(document).ready(function() {

  $('textarea').on('input', function(event) {
   
    console.log(this.value)
    console.log(this.value.length)
    console.log(this.parentNode.lastElementChild)
    const counter = this.parentNode.lastElementChild.childNodes[3].innerHTML;
    console.log(counter);

  });


});