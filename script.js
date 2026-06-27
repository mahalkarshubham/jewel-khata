/* ==========================================
   JewelKhata Landing Page
   Part 3.1
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const header = document.querySelector("header");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");
    const faqItems = document.querySelectorAll(".faq-item");

    /* ==========================================
       MOBILE MENU
    ========================================== */

    let menuToggle = document.querySelector(".menu-toggle");

    if (!menuToggle) {

        menuToggle = document.createElement("div");
        menuToggle.className = "menu-toggle";
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

        document
            .querySelector(".nav-container")
            .appendChild(menuToggle);

    }

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("mobile-open");

        if (nav.classList.contains("mobile-open")) {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

        } else {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });

    /* ==========================================
       CLOSE MENU WHEN LINK CLICKED
    ========================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("mobile-open");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });

    /* ==========================================
       STICKY HEADER
    ========================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.style.background =
                "rgba(13,13,13,.96)";

            header.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.35)";

        } else {

            header.style.background =
                "rgba(13,13,13,.90)";

            header.style.boxShadow = "none";

        }

    });

    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            if (!href.startsWith("#")) return;

            e.preventDefault();

            const section =
                document.querySelector(href);

            if (!section) return;

            const headerHeight =
                header.offsetHeight;

            const target =
                section.offsetTop - headerHeight;

            window.scrollTo({

                top: target,

                behavior: "smooth"

            });

        });

    });

    /* ==========================================
       ACTIVE NAVIGATION LINK
    ========================================== */

    const sections = document.querySelectorAll("section");

    function updateActiveLink() {

        const scrollPos =
            window.scrollY + 120;

        sections.forEach(section => {

            const top = section.offsetTop;
            const bottom =
                top + section.offsetHeight;

            if (scrollPos >= top &&
                scrollPos < bottom) {

                navLinks.forEach(link =>
                    link.classList.remove("active"));

                const active =
                    document.querySelector(
                        `nav a[href="#${section.id}"]`
                    );

                if (active)
                    active.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();

    /* ==========================================
       FAQ ACCORDION
    ========================================== */

    faqItems.forEach(item => {

        const title =
            item.querySelector("h3");

        title.addEventListener("click", () => {

            faqItems.forEach(faq => {

                if (faq !== item) {

                    faq.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });
    
    /* ==========================================
   MOBILE NAVIGATION
========================================== */

@media (max-width: 900px) {



}

/* ==========================================
   PART 3.2.1
   Scroll Reveal
   Counter Animation
   Back To Top
========================================== */

/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(
    ".feature-card, .screens-grid img, .why-grid div, .faq-item, .download, .hero-content, .hero-image"
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");
            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }

    });

}, {

    threshold:0.15

});

revealElements.forEach(element=>{

    element.classList.add("fade-up");

    revealObserver.observe(element);

});


/* ==========================================
   COUNTER ANIMATION
========================================== */

const counters = document.querySelectorAll(".hero-stats h3");

let counterStarted = false;

function animateCounter(counter){

    const text = counter.innerText;

    let target = parseFloat(text.replace(/[^\d.]/g,""));

    let suffix = "";

    if(text.includes("%")) suffix="%";
    if(text.includes("+")) suffix="+";
    if(text.toUpperCase().includes("K")){

        suffix="K+";
        target = target * 1000;

    }

    let current = 0;

    const duration = 1800;

    const increment = target/(duration/16);

    const timer = setInterval(()=>{

        current += increment;

        if(current>=target){

            current = target;

            clearInterval(timer);

        }

        if(target>=1000){

            counter.innerHTML =
            Math.floor(current/1000)+"K+";

        }
        else if(suffix=="%"){

            counter.innerHTML =
            current.toFixed(1)+"%";

        }
        else{

            counter.innerHTML =
            Math.floor(current)+suffix;

        }

    },16);

}

const counterObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !counterStarted){

            counters.forEach(counter=>{

                animateCounter(counter);

            });

            counterStarted=true;

        }

    });

},{threshold:0.5});

const stats=document.querySelector(".hero-stats");

if(stats){

counterObserver.observe(stats);

}


/* ==========================================
   BACK TO TOP BUTTON
========================================== */

const backToTop=document.createElement("div");

backToTop.className="back-to-top";

backToTop.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(backToTop);

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/* ==========================================
   PART 3.2.2
   Screenshot Lightbox
   Lazy Loading
   Hero Parallax
   Performance Helpers
========================================== */


/* ==========================================
   SCREENSHOT LIGHTBOX
========================================== */

const screenshots = document.querySelectorAll(".screens-grid img");

let currentImage = 0;

const lightbox = document.createElement("div");
lightbox.className = "lightbox";

lightbox.innerHTML = `
<div class="lightbox-overlay"></div>

<div class="lightbox-content">

<button class="lightbox-close">
<i class="fa-solid fa-xmark"></i>
</button>

<button class="lightbox-prev">
<i class="fa-solid fa-chevron-left"></i>
</button>

<img src="" alt="Screenshot">

<button class="lightbox-next">
<i class="fa-solid fa-chevron-right"></i>
</button>

</div>
`;

document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");

function openLightbox(index){

    currentImage=index;

    lightboxImg.src=screenshots[index].src;

    lightbox.classList.add("active");

    document.body.style.overflow="hidden";

}

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow="";

}

function nextImage(){

    currentImage++;

    if(currentImage>=screenshots.length){

        currentImage=0;

    }

    lightboxImg.src=screenshots[currentImage].src;

}

function prevImage(){

    currentImage--;

    if(currentImage<0){

        currentImage=screenshots.length-1;

    }

    lightboxImg.src=screenshots[currentImage].src;

}

screenshots.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        openLightbox(index);

    });

});

lightbox.querySelector(".lightbox-close")
.addEventListener("click",closeLightbox);

lightbox.querySelector(".lightbox-overlay")
.addEventListener("click",closeLightbox);

lightbox.querySelector(".lightbox-next")
.addEventListener("click",nextImage);

lightbox.querySelector(".lightbox-prev")
.addEventListener("click",prevImage);


/* Keyboard */

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active"))
        return;

    if (e.key === "Escape") {
    closeLightbox();
}

    if(e.key==="ArrowRight") nextImage();

    if(e.key==="ArrowLeft") prevImage();

});


/* ==========================================
   TOUCH SWIPE SUPPORT
========================================== */

let startX=0;

lightbox.addEventListener("touchstart",(e)=>{

    startX=e.changedTouches[0].screenX;

});

lightbox.addEventListener("touchend",(e)=>{

    let endX=e.changedTouches[0].screenX;

    if(endX-startX>70){

        prevImage();

    }

    if(startX-endX>70){

        nextImage();

    }

});


/* ==========================================
   LAZY LOADING IMAGES
========================================== */

const lazyImages=document.querySelectorAll("img");

const lazyObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.loading="lazy";

lazyObserver.unobserve(entry.target);

}

});

});

lazyImages.forEach(img=>{

lazyObserver.observe(img);

});


/* ==========================================
   HERO PARALLAX
========================================== */

const hero=document.querySelector(".hero");

const heroPhone=document.querySelector(".hero-image img");

if(heroPhone){

hero.addEventListener("mousemove",(e)=>{

const x=(window.innerWidth/2-e.pageX)/40;

const y=(window.innerHeight/2-e.pageY)/40;

heroPhone.style.transform=

`translate(${x}px,${y}px)`;

});

hero.addEventListener("mouseleave",()=>{

heroPhone.style.transform="translate(0,0)";

});

}


/* ==========================================
   BUTTON RIPPLE
========================================== */

document.querySelectorAll(".primary-btn,.btn-download")
.forEach(button=>{

button.addEventListener("click",(e)=>{

const circle=document.createElement("span");

circle.className="ripple";

const rect=button.getBoundingClientRect();

circle.style.left=e.clientX-rect.left+"px";
circle.style.top=e.clientY-rect.top+"px";

button.appendChild(circle);

setTimeout(()=>{

circle.remove();

},600);

});

});


/* ==========================================
   PERFORMANCE THROTTLE
========================================== */

function throttle(callback,delay){

let wait=false;

return(...args)=>{

if(wait) return;

callback(...args);

wait=true;

setTimeout(()=>{

wait=false;

},delay);

}

}

window.addEventListener("resize",

throttle(()=>{

console.log("Layout Updated");

},250)

);


/* ==========================================
   IMAGE HOVER SCALE
========================================== */

screenshots.forEach(img=>{

img.addEventListener("mouseenter",()=>{

img.style.transform="scale(1.05)";

});

img.addEventListener("mouseleave",()=>{

img.style.transform="scale(1)";

});

});

document.querySelectorAll(".faq-item").forEach(item => {

    const question = item.querySelector("h3");
    const answer = item.querySelector("p");

    answer.style.maxHeight = "0px";

    question.addEventListener("click", () => {

        document.querySelectorAll(".faq-item").forEach(other => {

            if (other !== item) {

                other.classList.remove("active");

                const otherAnswer = other.querySelector("p");
                otherAnswer.style.maxHeight = "0px";

            }

        });

        item.classList.toggle("active");

        if (item.classList.contains("active")) {

            answer.style.maxHeight = answer.scrollHeight + "px";

        } else {

            answer.style.maxHeight = "0px";

        }

    });

});


/* ==========================================
   END
========================================== */

});