//To make navbar sticky on scroll up
let lastScrollY = window.scrollY; 

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
        // Scrolling up
        navbar.classList.add('sticky');
    } else {
        // Scrolling down
        navbar.classList.remove('sticky');
    }

    lastScrollY = currentScrollY; 
});




// Control the video modal
function openModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('youtube-video');
    iframe.src = 'https://www.youtube.com/embed/sp6Dnvjm-s8?autoplay=1';
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('youtube-video');
    iframe.src = '';
    modal.style.display = 'none';
}



// Control the Roadmap modal
document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("web-modal");
    const webCard = document.getElementById("developpement-web");
    const closeBtn = document.querySelector(".close");

    webCard.addEventListener("click", function () {
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});



// The stats Counter
document.addEventListener('DOMContentLoaded', function () {
    const staffNumber = document.getElementById('staff-number');
    const placesNumber = document.getElementById('places-number');
    const laureatsNumber = document.getElementById('laureats-number');
    const filieresNumber = document.getElementById('filieres-number');

    const duration = 1500; 
    const targets = {
        staff: 12,
        places: 120,
        laureats: 43,
        filieres: 2,
    };

    function startAnimation() {
        const startTime = performance.now();

        function updateNumbers(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); 

            staffNumber.textContent = Math.floor(progress * targets.staff);
            placesNumber.textContent = Math.floor(progress * targets.places);
            laureatsNumber.textContent = Math.floor(progress * targets.laureats);
            filieresNumber.textContent = Math.floor(progress * targets.filieres);

            if (progress < 1) {
                requestAnimationFrame(updateNumbers);
            } else {
                staffNumber.textContent = targets.staff;
                placesNumber.textContent = targets.places;
                laureatsNumber.textContent = targets.laureats;
                filieresNumber.textContent = targets.filieres;
            }
        }

        requestAnimationFrame(updateNumbers);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startAnimation(); 
                }
            });
        },
        {
            threshold: 0.5, 
        }
    );

    const statsSection = document.querySelector('.stats-section');
    observer.observe(statsSection); 
});




// Typing effect
document.addEventListener('DOMContentLoaded', function () {
    const aboutUsText = document.querySelector('#about-us p');
    const aboutUsContent = `SOLICODE est un centre de formation solidaire et inclusif, ouvert aux jeunes motivés et intéressés par les métiers du Développement Web et Mobile. L’apprenant à SOLICODE se considère comme acteur principal tout au long de son processus d’apprentissage. C’est lui qui construit ses savoirs à travers la réalisation des projets, individuels ou par groupe, inspirés du milieu professionnel afin de favoriser une meilleure insertion au marché de travail. La formation au sein de SOLICODE est axée sur différents volets: technique, soft-skills, entreprenariat et gestion de projet. A l’issue de cette formation, les apprenants bénéficieront d’une double certification délivrée par SIMPLON et OFPPT.`;

    let isTyping = false;

    function typeWriterEffect() {
        if (isTyping) return; 
        isTyping = true;
        let index = 0;
        aboutUsText.textContent = ''; 

        function typeCharacter() {
            if (index < aboutUsContent.length) {
                aboutUsText.textContent += aboutUsContent.charAt(index);
                index++;
                setTimeout(typeCharacter, 30); 
            }
        }

        typeCharacter();
    }

    // Intersection Observer to trigger the effect
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriterEffect();
                observer.unobserve(entry.target); // Remove observer after first trigger
            }
        });
    });

    observer.observe(document.querySelector('.info-section'));
});


// Testimonies's scroll
document.addEventListener("DOMContentLoaded", () => {
    const prevButton = document.querySelector(".slider-control.prev");
    const nextButton = document.querySelector(".slider-control.next");
    const testimonials = document.querySelectorAll(".testimonial");
    let currentIndex = 0;

    const updateTestimonials = () => {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle("active", index === currentIndex);
        });
    };

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonials();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonials();
    });

    updateTestimonials();
});
