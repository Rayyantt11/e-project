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
function openNav() {
    document.getElementById("myNav").classList.toggle("menu_width");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");
}