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
let currentPage = 0;
const carsPerPage = 4;
let filteredCars = [];

async function fetchAndDisplayCars() {
    try {
        const response = await fetch('./js/cars_api.json');
        const data = await response.json();
        
        // Get car type from URL
        const urlParams = new URLSearchParams(window.location.search);
        const carType = urlParams.get('type')?.replace(/'/g, "");
        
        // Filter cars based on type, brand, condition   
        filteredCars = carType 
            ? data.cars.filter(car => car.type === carType) 
            : data.cars;            
        
        displayCars();
        
        // Set up next button event
        document.querySelector('.cards-control-next')
            .addEventListener('click', () => {
                currentPage++;
                displayCars();
            });
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("car-card").innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-danger">Failed to load car data</p>
            </div>
        `;
    }
}

function displayCars() {
    const container = document.getElementById("car-card");
    container.innerHTML = '';
    
    const startIndex = currentPage * carsPerPage;
    const carsToShow = filteredCars.slice(startIndex, startIndex + carsPerPage);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);
    
    if (carsToShow.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <p>No more cars to display</p>
            </div>
        `;
        currentPage = 0; // Reset to first page
        return;
    }
    
    // Create row div
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row g-4';
    
    // Add 4 cards in the row
    carsToShow.forEach(car => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-3 col-sm-6';
        colDiv.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${car.pic}" class="card-img-top" alt="${car.title}" style="height: 180px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${car.title}</h5>
                    <ul class="list-unstyled">
                        <li><strong>Model:</strong> ${car.model}</li>
                        <li><strong>Price:</strong> $${car.price.toLocaleString()}</li>
                        <li><strong>Year:</strong> ${car.year}</li>
                        <li><strong>Condition:</strong> ${car.condition}</li>
                    </ul>
                </div>
                <div class="card-footer bg-white border-0">
                    <a href="#" class="btn btn-primary w-100">View Details</a>
                </div>
            </div>
        `;
        rowDiv.appendChild(colDiv);
    });
    
    container.appendChild(rowDiv);
    
    // Hide next button if no more pages
    const nextBtn = document.querySelector('.cards-control-next');
    nextBtn.style.visibility = (currentPage < totalPages - 1) ? 'visible' : 'hidden';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', fetchAndDisplayCars);



// overlay menu
function openNav() {
    document.getElementById("myNav").classList.toggle("menu_width");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");
}