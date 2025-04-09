window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    let nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
        nav.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    if (window.scrollY > 50) {
        nav.classList.add("scrolled")
    } else {
        nav.classList.remove("scrolled")
    }
    ;
});

document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress-fill");
    const carousel = document.querySelector("#carouselExampleInterval");
    let activeIndex = 0;
    function startProgress(index) {
        progressBars.forEach((bar) => {
            bar.style.transition = "none";
            bar.style.width = "0%";
        });
        setTimeout(() => {
            progressBars[index].style.transition = "width 4.9s linear";
            progressBars[index].style.width = "100%";
        }, 50);
    }
    startProgress(0);


    carousel.addEventListener("slid.bs.carousel", function () {
        activeIndex = (activeIndex + 1) % progressBars.length; 
        startProgress(activeIndex);
    });
});
// overlay menu
function openNav() {
    document.getElementById("myNav").classList.toggle("menu_width");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");
}