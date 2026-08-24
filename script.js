/*=========================================
  SELECT ELEMENTS
=========================================*/

const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("section[id]");


/*=========================================
  MOBILE NAVIGATION
=========================================*/

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (!icon) return;

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("ri-menu-3-line");
            icon.classList.add("ri-close-line");

        } else {

            icon.classList.remove("ri-close-line");
            icon.classList.add("ri-menu-3-line");

        }

    });

}


/*=========================================
  CLOSE MENU AFTER CLICKING LINK
=========================================*/

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (!navMenu) return;

        navMenu.classList.remove("active");

        const icon = menuToggle?.querySelector("i");

        if (icon) {

            icon.classList.remove("ri-close-line");
            icon.classList.add("ri-menu-3-line");

        }

    });

});


/*=========================================
  ACTIVE NAVIGATION
=========================================*/

function updateActiveNav() {

    const scrollY = window.pageYOffset;

    sections.forEach(section => {

        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 180;
        const sectionId = section.getAttribute("id");

        const navLink = document.querySelector(
            `.nav-menu a[href="#${sectionId}"]`
        );

        if (!navLink) return;

        if (
            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight
        ) {

            navLink.classList.add("active");

        } else {

            navLink.classList.remove("active");

        }

    });

}


/*=========================================
  HEADER SCROLL EFFECT
=========================================*/

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.style.background = "rgba(8,9,15,.88)";
        header.style.backdropFilter = "blur(18px)";
        header.style.boxShadow =
            "0 10px 35px rgba(0,0,0,.25)";

    } else {

        header.style.background = "rgba(8,9,15,.55)";
        header.style.backdropFilter = "blur(18px)";
        header.style.boxShadow = "none";

    }

}


/*=========================================
  WINDOW SCROLL
=========================================*/

window.addEventListener("scroll", () => {

    updateHeader();

    updateActiveNav();

});


/*=========================================
  INITIALIZE
=========================================*/

window.addEventListener("load", () => {

    updateHeader();

    updateActiveNav();

});

/*=========================================
  SCROLL REVEAL
=========================================*/

const revealElements = document.querySelectorAll(`

.hero-content,
.hero-image,

.stat-card,

.featured-project,

.projects-header,

.project-card,

.timeline-item,

.experience-card,

.skill-card,

.certificate-card,

.contact-card,

.contact-info

`);

const revealObserver = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

            revealObserver.unobserve(entry.target);

        }

    });

},

{

    threshold:.15,

    rootMargin:"0px 0px -80px 0px"

}

);

revealElements.forEach((element,index)=>{

    element.classList.add("hidden");

    element.style.transitionDelay = `${index * 80}ms`;

    revealObserver.observe(element);

});


/*=========================================
  HERO PARALLAX
=========================================*/

const heroImage = document.querySelector(".image-card");

if(heroImage){

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    function animateHero(){

        currentX += (mouseX - currentX) * .08;
        currentY += (mouseY - currentY) * .08;

        heroImage.style.transform =

        `
        rotateY(${currentX}deg)
        rotateX(${-currentY}deg)
        `;

        requestAnimationFrame(animateHero);

    }

    animateHero();

    window.addEventListener("mousemove",(e)=>{

        mouseX =
        (window.innerWidth/2 - e.clientX)/35;

        mouseY =
        (window.innerHeight/2 - e.clientY)/35;

    });

    window.addEventListener("mouseleave",()=>{

        mouseX = 0;
        mouseY = 0;

    });

}


/*=========================================
  HERO FLOATING EFFECT
=========================================*/

if(heroImage){

    let float = 0;
    let direction = 1;

    setInterval(()=>{

        float += direction;

        heroImage.style.marginTop =

        `${float}px`;

        if(float >= 8){

            direction = -1;

        }

        if(float <= -8){

            direction = 1;

        }

    },80);

}


/*=========================================
  AVAILABILITY CARD HOVER
=========================================*/

const availabilityCard =
document.querySelector(".availability-card");

if(availabilityCard){

    availabilityCard.addEventListener(

        "mouseenter",

        ()=>{

            availabilityCard.style.transform =

            "translateY(-12px) scale(1.03)";

        }

    );

    availabilityCard.addEventListener(

        "mouseleave",

        ()=>{

            availabilityCard.style.transform =

            "translateY(0) scale(1)";

        }

    );

}


/*=========================================
  FEATURED PROJECT FLOAT
=========================================*/

const featuredProjectImage =
document.querySelector(".featured-image img");

if(featuredProjectImage){

    let move = 0;
    let dir = 1;

    setInterval(()=>{

        move += dir;

        featuredProjectImage.style.transform =

        `translateY(${move}px)`;

        if(move >= 10){

            dir = -1;

        }

        if(move <= -10){

            dir = 1;

        }

    },90);

}


/*=========================================
  FEATURED PROJECT HOVER
=========================================*/

const featuredProject =
document.querySelector(".featured-project");

if(featuredProject){

    featuredProject.addEventListener(

        "mouseenter",

        ()=>{

            featuredProject.style.boxShadow =

            "0 30px 80px rgba(66,116,217,.22)";

        }

    );

    featuredProject.addEventListener(

        "mouseleave",

        ()=>{

            featuredProject.style.boxShadow = "";

        }

    );

}
/*=========================================
  PROJECT CARD 3D TILT
=========================================*/

const projectCards =
document.querySelectorAll(".project-card");

projectCards.forEach(card=>{

    let currentX = 0;
    let currentY = 0;

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        currentY =
        ((x - rect.width / 2) / rect.width) * 16;

        currentX =
        -((y - rect.height / 2) / rect.height) * 16;

        requestAnimationFrame(()=>{

            card.style.transform =

            `
            perspective(1200px)
            rotateX(${currentX}deg)
            rotateY(${currentY}deg)
            translateY(-10px)
            `;

        });

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =

        `
        perspective(1200px)
        rotateX(0deg)
        rotateY(0deg)
        translateY(0)
        `;

    });

});


/*=========================================
  PROJECT CARD SPOTLIGHT
=========================================*/

projectCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background =

        `
        radial-gradient(
            circle at ${x}px ${y}px,
            rgba(66,116,217,.22),
            #111522 65%
        )
        `;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.background =
        "#111522";

    });

});


/*=========================================
  PROJECT IMAGE ZOOM
=========================================*/

const projectImages =
document.querySelectorAll(".project-image img");

projectCards.forEach((card,index)=>{

    const image = projectImages[index];

    if(!image) return;

    card.addEventListener("mouseenter",()=>{

        image.style.transform =

        "scale(1.05)";

    });

    card.addEventListener("mouseleave",()=>{

        image.style.transform =

        "scale(1)";

    });

});


/*=========================================
  PROJECT LINK ROTATION
=========================================*/

const projectLinks =
document.querySelectorAll(".project-link");

projectLinks.forEach(link=>{

    link.addEventListener("mouseenter",()=>{

        link.style.transform =

        "rotate(45deg) scale(1.15)";

    });

    link.addEventListener("mouseleave",()=>{

        link.style.transform =

        "rotate(0deg) scale(1)";

    });

});


/*=========================================
  PROJECT CARD STAGGER
=========================================*/

const projectObserver =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        projectCards.forEach((card,index)=>{

            setTimeout(()=>{

                card.style.opacity="1";

                card.style.transform=

                "translateY(0)";

            },

            index*120);

        });

        projectObserver.disconnect();

    });

},

{

    threshold:.25

}

);

if(projectCards.length){

    projectCards.forEach(card=>{

        card.style.opacity="0";

        card.style.transform=

        "translateY(40px)";

        card.style.transition=

        ".6s ease";

    });

    projectObserver.observe(projectCards[0]);

}


/*=========================================
  FEATURED PROJECT PARALLAX
=========================================*/

const featuredImage =
document.querySelector(".featured-image");

if(featuredImage){

    featuredImage.addEventListener(

        "mousemove",

        (e)=>{

            const rect =
            featuredImage.getBoundingClientRect();

            const x =
            (e.clientX - rect.left - rect.width/2)/20;

            const y =
            (e.clientY - rect.top - rect.height/2)/20;

            featuredImage.style.transform=

            `
            translate(${x}px,${y}px)
            `;

        }

    );

    featuredImage.addEventListener(

        "mouseleave",

        ()=>{

            featuredImage.style.transform=

            "translate(0,0)";

        }

    );

}


/*=========================================
  CASE STUDY BUTTON
=========================================*/

const caseButtons =
document.querySelectorAll(

".case-study-btn"

);

caseButtons.forEach(button=>{

    button.addEventListener(

        "mouseenter",

        ()=>{

            button.style.gap="18px";

        }

    );

    button.addEventListener(

        "mouseleave",

        ()=>{

            button.style.gap="12px";

        }

    );

});


/*=========================================
  PROJECT CARD SHADOW
=========================================*/

projectCards.forEach(card=>{

    card.addEventListener(

        "mouseenter",

        ()=>{

            card.style.boxShadow=

            "0 35px 80px rgba(66,116,217,.18)";

        }

    );

    card.addEventListener(

        "mouseleave",

        ()=>{

            card.style.boxShadow="";

        }

    );

});
/*=========================================
  EXPERIENCE TIMELINE
=========================================*/

const timelineItems =
document.querySelectorAll(".timeline-item");

const timelineObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";

    });

},
{
    threshold:.25
});

timelineItems.forEach((item,index)=>{

    item.style.opacity = "0";

    item.style.transform = "translateX(-40px)";

    item.style.transition = `
        opacity .6s ease ${index * .15}s,
        transform .6s ease ${index * .15}s
    `;

    timelineObserver.observe(item);

});


/*=========================================
  EXPERIENCE CARDS
=========================================*/

const experienceCards =
document.querySelectorAll(".experience-card");

const experienceObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        experienceCards.forEach((card,index)=>{

            setTimeout(()=>{

                card.style.opacity = "1";
                card.style.transform = "translateY(0)";

            },index*180);

        });

        experienceObserver.disconnect();

    });

},
{
    threshold:.20
});

if(experienceCards.length){

    experienceCards.forEach(card=>{

        card.style.opacity = "0";

        card.style.transform = "translateY(50px)";

        card.style.transition =
        "opacity .7s ease, transform .7s ease";

    });

    experienceObserver.observe(experienceCards[0]);

}


/*=========================================
  EXPERIENCE CARD HOVER
=========================================*/

experienceCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
        radial-gradient(
            circle at ${x}px ${y}px,
            rgba(66,116,217,.12),
            #111522 70%
        )`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.background =
        "linear-gradient(145deg,#111522,#0d1018)";

    });

});


/*=========================================
  EXPERIENCE TAGS
=========================================*/

const experienceTags =
document.querySelectorAll(".experience-tags span");

experienceTags.forEach(tag=>{

    tag.addEventListener("mouseenter",()=>{

        tag.style.transform =
        "translateY(-3px)";

    });

    tag.addEventListener("mouseleave",()=>{

        tag.style.transform =
        "translateY(0)";

    });

});


/*=========================================
  SKILLS
=========================================*/

const skillCards =
document.querySelectorAll(".skill-card");

const skillObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        skillCards.forEach((card,index)=>{

            setTimeout(()=>{

                card.style.opacity="1";

                card.style.transform="translateY(0)";

            },index*120);

        });

        skillObserver.disconnect();

    });

},
{
    threshold:.20
});

if(skillCards.length){

    skillCards.forEach(card=>{

        card.style.opacity="0";

        card.style.transform="translateY(40px)";

        card.style.transition=
        "opacity .6s ease, transform .6s ease";

    });

    skillObserver.observe(skillCards[0]);

}


/*=========================================
  SKILL CARD SPOTLIGHT
=========================================*/

skillCards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
        radial-gradient(
            circle at ${x}px ${y}px,
            rgba(66,116,217,.16),
            #111522 65%
        )`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.background =
        "linear-gradient(145deg,#111522,#0d1018)";

    });

});


/*=========================================
  CERTIFICATIONS
=========================================*/

const certificates =
document.querySelectorAll(".certificate-card");

const certificateObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        certificates.forEach((card,index)=>{

            setTimeout(()=>{

                card.style.opacity="1";

                card.style.transform="translateY(0)";

            },index*160);

        });

        certificateObserver.disconnect();

    });

},
{
    threshold:.20
});

if(certificates.length){

    certificates.forEach(card=>{

        card.style.opacity="0";

        card.style.transform="translateY(50px)";

        card.style.transition=
        "opacity .7s ease, transform .7s ease";

    });

    certificateObserver.observe(certificates[0]);

}


/*=========================================
  CERTIFICATE HOVER
=========================================*/

certificates.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
        radial-gradient(
            circle at ${x}px ${y}px,
            rgba(66,116,217,.14),
            #111522 72%
        )`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.background =
        "linear-gradient(145deg,#111522,#0d1018)";

    });

});
/*=========================================
  SMOOTH SCROLL
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target =
        document.querySelector(this.getAttribute("href"));

        if(!target) return;

        e.preventDefault();

        window.scrollTo({

            top: target.offsetTop - 90,

            behavior:"smooth"

        });

    });

});


/*=========================================
  BUTTON RIPPLE EFFECT
=========================================*/

const buttons =
document.querySelectorAll(

".primary-btn, .talk-btn, .case-study-btn"

);

buttons.forEach(button=>{

    button.addEventListener("click",function(e){

        const ripple =
        document.createElement("span");

        const rect =
        this.getBoundingClientRect();

        const size =
        Math.max(rect.width,rect.height);

        ripple.style.width =
        ripple.style.height =
        `${size}px`;

        ripple.style.left =
        `${e.clientX - rect.left - size/2}px`;

        ripple.style.top =
        `${e.clientY - rect.top - size/2}px`;

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


/*=========================================
  ACTIVE BUTTON STATE
=========================================*/

buttons.forEach(button=>{

    button.addEventListener("mousedown",()=>{

        button.style.transform =
        "scale(.96)";

    });

    button.addEventListener("mouseup",()=>{

        button.style.transform =
        "";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform =
        "";

    });

});


/*=========================================
  PAGE LOAD
=========================================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});


/*=========================================
  IMAGE LAZY ANIMATION
=========================================*/

const images =
document.querySelectorAll("img");

images.forEach(image=>{

    image.addEventListener("load",()=>{

        image.style.opacity="1";

    });

});


/*=========================================
  BACK TO TOP
=========================================*/

const logo =
document.querySelector(".logo");

if(logo){

    logo.addEventListener("click",(e)=>{

        e.preventDefault();

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/*=========================================
  RESIZE RESET
=========================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth > 992){

        navMenu?.classList.remove("active");

        const icon =
        menuToggle?.querySelector("i");

        if(icon){

            icon.classList.remove("ri-close-line");
            icon.classList.add("ri-menu-3-line");

        }

    }

});


/*=========================================
  ESC KEY CLOSE MENU
=========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key !== "Escape") return;

    navMenu?.classList.remove("active");

    const icon =
    menuToggle?.querySelector("i");

    if(icon){

        icon.classList.remove("ri-close-line");
        icon.classList.add("ri-menu-3-line");

    }

});


/*=========================================
  PERFORMANCE
=========================================*/

let resizeTimer;

window.addEventListener("resize",()=>{

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(()=>{

        updateHeader();
        updateActiveNav();

    },100);

});


/*=========================================
  PAGE VISIBILITY
=========================================*/

document.addEventListener(

"visibilitychange",

()=>{

    if(document.hidden){

        console.log("Portfolio paused");

    }else{

        console.log("Portfolio resumed");

    }

});


/*=========================================
  PORTFOLIO READY
=========================================*/

console.log(

"%cPortfolio Ready 🚀",

`
color:#4F8EF7;
font-size:16px;
font-weight:bold;
`

);

/*=========================================
  BACK TO TOP BUTTON
=========================================*/

const backToTopBtn = document.getElementById("backToTop");

function toggleBackToTop() {

    if (!backToTopBtn) return;

    if (window.scrollY > 500) {

        backToTopBtn.classList.add("show");

    } else {

        backToTopBtn.classList.remove("show");

    }

}

if (backToTopBtn) {

    window.addEventListener("scroll", toggleBackToTop);

    toggleBackToTop();

    backToTopBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}