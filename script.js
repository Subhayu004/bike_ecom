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
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileDrawer = document.getElementById("mobileDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");

function openDrawer() {
    mobileDrawer.classList.add("open");
    drawerBackdrop.classList.add("show");

    menuBtn.setAttribute("aria-expanded", "true");

    document.body.style.overflow = "hidden";
}

function closeDrawer() {
    mobileDrawer.classList.remove("open");
    drawerBackdrop.classList.remove("show");

    menuBtn.setAttribute("aria-expanded", "false");

    document.body.style.overflow = "";
}

menuBtn.addEventListener("click", openDrawer);

closeBtn.addEventListener("click", closeDrawer);

drawerBackdrop.addEventListener("click", closeDrawer);


/* Close drawer after clicking a navigation link */
document.querySelectorAll(".drawer-links a").forEach(link => {
    link.addEventListener("click", closeDrawer);
});


/* Close with Escape key */
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeDrawer();
    }
});
const navbar = document.querySelector("nav");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    /* At the top of the page */
    if (currentScrollY <= 50) {
        navbar.classList.remove("nav-fixed");
        navbar.classList.remove("nav-hidden");

        lastScrollY = currentScrollY;
        return;
    }

    /* Make navbar fixed after leaving the top */
    navbar.classList.add("nav-fixed");

    if (currentScrollY > lastScrollY) {
        /* Scrolling DOWN → show navbar */
        navbar.classList.remove("nav-hidden");
    } else {
        /* Scrolling UP → hide navbar */
        navbar.classList.add("nav-hidden");
    }

    lastScrollY = currentScrollY;
});
const collectionsSlider = document.querySelector(".collections-grid");

let isDragging = false;
let startX = 0;
let startScrollLeft = 0;

collectionsSlider.addEventListener("pointerdown", (event) => {
    isDragging = true;

    collectionsSlider.classList.add("dragging");

    startX = event.clientX;
    startScrollLeft = collectionsSlider.scrollLeft;

    collectionsSlider.setPointerCapture(event.pointerId);
});

collectionsSlider.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const distance = event.clientX - startX;

    collectionsSlider.scrollLeft =
        startScrollLeft - distance;
});

function stopDragging(event) {
    if (!isDragging) return;

    isDragging = false;

    collectionsSlider.classList.remove("dragging");

    if (
        event.pointerId !== undefined &&
        collectionsSlider.hasPointerCapture(event.pointerId)
    ) {
        collectionsSlider.releasePointerCapture(event.pointerId);
    }
}

collectionsSlider.addEventListener("pointerup", stopDragging);
collectionsSlider.addEventListener("pointercancel", stopDragging);