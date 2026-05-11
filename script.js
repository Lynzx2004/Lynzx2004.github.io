// =====================
// HAMBURGER
// =====================

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {

  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");

});

// CLOSE MENU

overlay.addEventListener("click", () => {

  hamburger.classList.remove("active");
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");

});

// CLOSE AFTER CLICK

document.querySelectorAll(".mobile-menu a")
.forEach(link => {

  link.addEventListener("click", () => {

    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");

  });

});

// =====================
// TYPING EFFECT
// =====================

const texts = [

  "Web Developer",
  "UI Designer",
  "Programmer",
  "Creative Editor"

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

    setTimeout(typing, 1200);

  }else{

    setTimeout(typing, 100);
  }

})();

// =====================
// THEME
// =====================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// LOAD

if(localStorage.getItem("theme") === "light"){

  document.body.classList.add("light-mode");

  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");

}

// TOGGLE

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  if(document.body.classList.contains("light-mode")){

    localStorage.setItem("theme", "light");

    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");

  }else{

    localStorage.setItem("theme", "dark");

    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");

  }

});