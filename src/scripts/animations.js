import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const introTimeline = gsap.timeline({ paused: true });
introTimeline
    .from("#home > div:first-child > *", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
    })
    .from(
        "#home > div:last-child",
        { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3",
    )
    .play();

gsap.from("#services", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#services",
        start: "top 80%",
        toggleActions: "play none none reverse",
    },
});

gsap.fromTo(
    "#progressBar",
    { scaleX: 0 },
    {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        },
    },
);

const replayButton = document.getElementById("replayIntro");
replayButton?.addEventListener("click", () => introTimeline.restart());

const toggleButton = document.getElementById("toggledark");
toggleButton?.setAttribute(
    "aria-pressed",
    document.documentElement.classList.contains("dark").toString(),
);
toggleButton?.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleButton.setAttribute("aria-pressed", isDark.toString());

    gsap.to(toggleButton, {
        rotation: "+=360",
        duration: 0.6,
        ease: "bounce.out",
    });
});

const year = document.getElementById("year");
if (year) {
    year.textContent = new Date().getFullYear().toString();
}

const contactForm = document.getElementById("contactForm");
const formNotice = document.getElementById("formNotice");
contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (formNotice) {
        formNotice.textContent =
            "Thank you! Your form is ready, but sending messages requires a backend or email service.";
    }

    contactForm.reset();
});
