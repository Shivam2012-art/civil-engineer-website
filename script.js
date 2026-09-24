// ==========================================
// HOME HERO IMAGE SLIDER
// ==========================================

const heroImages = [
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=90",

    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=90",

    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=90",

    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=90",

    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=90"
];

const hero = document.querySelector(".hero");
const dotsContainer = document.querySelector("#sliderDots");

let currentSlide = 0;
let slideTimer;


// Create slider dots
heroImages.forEach((image, index) => {

    const dot = document.createElement("button");

    dot.classList.add("slider-dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        showSlide(index);
    });

    dotsContainer.appendChild(dot);

});


// Show slide
function showSlide(index) {

    currentSlide = index;

    hero.style.backgroundImage =
        `url("${heroImages[currentSlide]}")`;

    const dots =
        document.querySelectorAll(".slider-dot");

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    dots[currentSlide].classList.add("active");

}


// Next slide
function nextSlide() {

    currentSlide++;

    if (currentSlide >= heroImages.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}


// Previous slide
function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = heroImages.length - 1;
    }

    showSlide(currentSlide);
}


// Buttons
document
    .querySelector("#nextBtn")
    .addEventListener("click", nextSlide);

document
    .querySelector("#prevBtn")
    .addEventListener("click", previousSlide);


// Automatic change every 5 seconds
function startSlider() {

    slideTimer = setInterval(() => {

        nextSlide();

    }, 5000);

}

startSlider();


// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn = document.querySelector("#menuBtn");
const navLinks = document.querySelector("#navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// Close mobile menu after clicking a link

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });


// ==========================================
// PROJECT FILTER
// ==========================================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active from all buttons

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active to clicked button

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");


        projectCards.forEach(card => {

            const category =
                card.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

});


// ==========================================
// ANIMATED STATISTICS
// ==========================================

const counters =
    document.querySelectorAll(".stat h2");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(counter.getAttribute("data-target"));

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 80));


        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.innerText =
                    target + (target === 100 ? "%" : "+");

                return;

            }

            counter.innerText = current;

            requestAnimationFrame(updateCounter);

        };


        updateCounter();

    });

}


// Start counters when stats section appears

const statsSection =
    document.querySelector(".stats");


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    startCounters();

                }

            });

        },

        {
            threshold: 0.4
        }

    );


observer.observe(statsSection);


// ==========================================
// IMAGE PRELOADING
// ==========================================

heroImages.forEach(image => {

    const img = new Image();

    img.src = image;

});