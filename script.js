const languageBtn = document.getElementById("languageBtn");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");
const changingText = document.getElementById("changingText");

let currentLanguage = localStorage.getItem("language") || "ar";

const phrases = {
    ar: [
        "مطور ويب",
        "مهتم بتطوير البرمجيات",
        "شغوف بالتعلم المستمر"
        
    ],
    en: [
        "Web Developer",
        "Interested in Software Development",
        "Passionate About Learning"
    
    ]
};

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;
let typingTimer;

function typePhrase() {
    const currentPhrase = phrases[currentLanguage][phraseIndex];

    if (!deleting) {
        characterIndex++;
        changingText.textContent = currentPhrase.substring(0, characterIndex);

        if (characterIndex === currentPhrase.length) {
            deleting = true;
            typingTimer = setTimeout(typePhrase, 1800);
            return;
        }

        typingTimer = setTimeout(typePhrase, 70);
    } else {
        characterIndex--;
        changingText.textContent = currentPhrase.substring(0, characterIndex);

        if (characterIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases[currentLanguage].length;
            typingTimer = setTimeout(typePhrase, 400);
            return;
        }

        typingTimer = setTimeout(typePhrase, 35);
    }
}

function restartTyping() {
    clearTimeout(typingTimer);

    phraseIndex = 0;
    characterIndex = 0;
    deleting = false;

    changingText.textContent = "";

    typePhrase();
}

function updateSkillDirection() {
    document.querySelectorAll(".skill-info").forEach(skillInfo => {
        skillInfo.style.direction =
            currentLanguage === "ar" ? "rtl" : "ltr";

        skillInfo.style.display = "flex";
        skillInfo.style.flexDirection = "row";
        skillInfo.style.justifyContent = "space-between";
        skillInfo.style.alignItems = "center";
    });
}

function updateLanguage() {
    document.querySelectorAll("[data-ar][data-en]").forEach(element => {
        element.textContent =
            currentLanguage === "ar"
                ? element.dataset.ar
                : element.dataset.en;
    });

    document.documentElement.lang = currentLanguage;

    document.documentElement.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";

    languageBtn.textContent =
        currentLanguage === "ar" ? "EN" : "AR";

    document.title =
        currentLanguage === "ar"
            ? "نواف علي | مطور ويب"
            : "Nawaf Ali | Web Developer";

    localStorage.setItem("language", currentLanguage);

    updateSkillDirection();
    restartTyping();
}

languageBtn.addEventListener("click", () => {
    currentLanguage =
        currentLanguage === "ar" ? "en" : "ar";

    updateLanguage();
});

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    menuToggle.innerHTML =
        navMenu.classList.contains("active")
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';
    });
});

document.addEventListener("click", event => {
    if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navMenu.classList.remove("active");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';
    }
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

const skillElements = document.querySelectorAll(".skill");

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        const fill = entry.target.querySelector(".skill-fill");
        const progress = fill.dataset.progress;

        fill.style.width = `${progress}%`;

        skillObserver.unobserve(entry.target);
    });
}, {
    threshold: 0.35
});

skillElements.forEach(skill => {
    skillObserver.observe(skill);
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});

const particles =
    document.querySelectorAll(".floating-particles span");

particles.forEach((particle, index) => {
    particle.style.setProperty(
        "--delay",
        `${index * -1.7}s`
    );

    particle.style.setProperty(
        "--duration",
        `${8 + (index % 5)}s`
    );

    particle.style.setProperty(
        "--x",
        `${(index * 83) % 100}%`
    );

    particle.style.setProperty(
        "--size",
        `${2 + (index % 4)}px`
    );
});

const pageLoader = document.getElementById("pageLoader");
const loaderProgress = document.getElementById("loaderProgress");
const loaderPercentage = document.getElementById("loaderPercentage");
const loaderStatus = document.getElementById("loaderStatus");

const loaderMessages = {
    ar: [
        "جاري تجهيز الموقع...",
        "تحميل المكونات...",
        "تهيئة الواجهة...",
        "تشغيل النظام...",
        "جاهز"
    ],
    en: [
        "Preparing website...",
        "Loading components...",
        "Initializing interface...",
        "Starting system...",
        "Ready"
    ]
};

let loaderValue = 0;

function updateLoaderLanguage() {
    const messageIndex =
        loaderValue >= 100
            ? 4
            : Math.min(Math.floor(loaderValue / 25), 4);

    loaderStatus.textContent =
        loaderMessages[currentLanguage][messageIndex];
}

function startLoader() {
    const loaderInterval = setInterval(() => {
        loaderValue += Math.floor(Math.random() * 5) + 1;

        if (loaderValue >= 100) {
            loaderValue = 100;
            clearInterval(loaderInterval);

            updateLoaderLanguage();

            setTimeout(() => {
                pageLoader.classList.add("hidden");
            }, 500);
        }

        loaderProgress.style.width = `${loaderValue}%`;
        loaderPercentage.textContent = `${loaderValue}%`;

        updateLoaderLanguage();
    }, 70);
}

startLoader();
updateLanguage();

updateLanguage();