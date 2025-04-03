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
        // Reset all progress bars
        progressBars.forEach((bar) => {
            bar.style.transition = "none";
            bar.style.width = "0%";
        });

        // Start progress for the current slide
        setTimeout(() => {
            progressBars[index].style.transition = "width 4.9s linear";
            progressBars[index].style.width = "100%";
        }, 50);
    }

    // Start first progress bar on page load
    startProgress(0);


    carousel.addEventListener("slid.bs.carousel", function () {
        activeIndex = (activeIndex + 1) % progressBars.length; // Loop through bars
        startProgress(activeIndex);
    });
});
        // API CALL 
        fetch('./js/cars_api.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("car-card");

        // ✅ Get type from query string (URL)
        const urlParams = new URLSearchParams(window.location.search);
        const carType = urlParams.get('type')?.replace(/'/g, ""); // Remove quotes if they exist

        // ✅ Filter cars based on type
        let filteredCars = carType ? data.cars.filter(car => car.type === carType) : data.cars;

        // ✅ Limit to only 4 cars
        filteredCars.slice(0, 4).forEach(car => {
            const carElement = document.createElement("div");
            carElement.classList.add("car-item");
            carElement.innerHTML = `
                <div class="card" style="width: 18rem; display: flex;">
                    <img src="${car.pic}" class="card-img-top" alt="${car.title}">
                    <div class="card-body">
                        <h5 class="card-title">${car.title}</h5>
                        <p class="card-text">
                            <strong>Model:</strong> ${car.model}<br>
                            <strong>Price:</strong> $${car.price}<br>
                            <strong>Year:</strong> ${car.year}<br>
                            <strong>Condition:</strong> ${car.condition}
                        </p>
                        <a href="#" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `;
            container.appendChild(carElement);
        });
    });

    // overlay menu
function openNav() {
    document.getElementById("myNav").classList.toggle("menu_width");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");
}