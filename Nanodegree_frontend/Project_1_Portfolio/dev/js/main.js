'use strict';

$(".portfolio-item").on("click",function(e){
  // find the nearest hidden text and show it
  $(this).find(".hidden-text").toggleClass("expanded");
})