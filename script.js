// ======================
// MOBILE MENU
// ======================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {

mobileMenu.classList.toggle("active");
overlay.classList.toggle("active");

});

// CLOSE MENU

overlay.addEventListener("click", () => {

mobileMenu.classList.remove("active");
overlay.classList.remove("active");

});

// CLOSE AFTER CLICK MENU

const menuLinks = document.querySelectorAll(".mobile-menu a");

menuLinks.forEach(link => {

link.addEventListener("click", () => {

mobileMenu.classList.remove("active");
overlay.classList.remove("active");

});

});

// ======================
// TYPING EFFECT
// ======================

const texts = [

"MODERN PORTFOLIO",
"WEB DEVELOPER",
"UI DESIGNER",
"CREATIVE EDITOR"

];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function typing(){

if(count === texts.length){
count = 0;
}

currentText = texts[count];

letter = currentText.slice(0, ++index);

document.getElementById("typing").textContent = letter;

if(letter.length === currentText.length){

count++;
index = 0;

setTimeout(typing, 1500);

}else{

setTimeout(typing, 100);

}

})();