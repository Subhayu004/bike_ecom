const slides = document.querySelectorAll(".carousel-slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const slideNumber = document.querySelector(".slide-number");
const progressActive = document.querySelector(".progress-active");

let currentSlide = 0;
let autoSlideInterval;

// Time between automatic slides
const autoSlideDelay = 5000;


function updateCarousel() {

    // Hide all slides
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    // Show current slide
    slides[currentSlide].classList.add("active");


    // Update counter: 01/06, 02/06, etc.
    const current = String(currentSlide + 1).padStart(2, "0");
    const total = String(slides.length).padStart(2, "0");

    slideNumber.textContent = `${current}/${total}`;


    // Update progress bar
    const progress = ((currentSlide + 1) / slides.length) * 100;

    progressActive.style.width = `${progress}%`;
}


// NEXT SLIDE
function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    updateCarousel();
}


// PREVIOUS SLIDE
function prevSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    updateCarousel();
}


// START AUTOMATIC SLIDING
function startAutoSlide() {

    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, autoSlideDelay);
}


// RESET TIMER AFTER MANUAL CLICK
function resetAutoSlide() {

    clearInterval(autoSlideInterval);
    startAutoSlide();
}


// NEXT BUTTON
nextButton.addEventListener("click", () => {

    nextSlide();
    resetAutoSlide();

});


// PREVIOUS BUTTON
prevButton.addEventListener("click", () => {

    prevSlide();
    resetAutoSlide();

});


// INITIAL SETUP
updateCarousel();
startAutoSlide();