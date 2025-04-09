const carsPerPage = 4;

let currentPageBySection = {
    type: 0,
    brand: 0,
    condition: 0
};

async function fetchAndDisplayCars() {
    try {
        const response = await fetch('./js/cars_api.json');
        const data = await response.json();
        const cars = data.cars;

        const urlParams = new URLSearchParams(window.location.search);
        const carType = urlParams.get('type')?.toLowerCase();
        const carMake = urlParams.get('make')?.toLowerCase();
        const carCondition = urlParams.get('condition')?.toLowerCase();

        const filteredCars = cars.filter(car => {
            const typeMatch = carType ? car.type?.toLowerCase() === carType : true;
            const makeMatch = carMake ? car.make?.toLowerCase() === carMake : true;
            const conditionMatch = carCondition ? car.condition?.toLowerCase() === carCondition : true;
            return typeMatch && makeMatch && conditionMatch;
        });
        const carsByType = cars.filter(car => !carType || car.type?.toLowerCase() === carType);
        const carsByMake = cars.filter(car => !carMake || car.make?.toLowerCase() === carMake);
        const carsByCondition = cars.filter(car => !carCondition || car.condition?.toLowerCase() === carCondition);

        displayCarsInSection("car-card-type", carsByType, "type");
        displayCarsInSection("car-card-brand", carsByMake, "brand");
        displayCarsInSection("car-card-condition", carsByCondition, "condition");

        setupNextButton("car-card-type", carsByType, "type");
        setupNextButton("car-card-brand", carsByMake, "brand");
        setupNextButton("car-card-condition", carsByCondition, "condition");

    } catch (error) {
        console.error("Error fetching car data:", error);
    }
}
function displayCarsInSection(containerId, carList, sectionKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    const startIndex = currentPageBySection[sectionKey] * carsPerPage;
    const carsToShow = carList.slice(startIndex, startIndex + carsPerPage);
    const totalPages = Math.ceil(carList.length / carsPerPage);

    if (carsToShow.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5"><p>No cars available</p></div>`;
        return;
        }
    carsToShow.forEach(car => {
        const colDiv = document.createElement('div');
        colDiv.className = "col-lg-3 col-md-6 col-sm-12 p-2"
        colDiv.innerHTML = `

                    <div class="card h-100 shadow-sm">
                      <img src="${car.pic}" class="card-img-top" loading="lazy" alt="${car.title}" style="height: 180px; object-fit: cover;">
                      <div class="card-body">
                        <h5 class="card-title">${car.title}</h5>
                        <ul class="list-unstyled">
                          <li><strong>Model:</strong> ${car.model}</li>
                          <li><strong>Price:</strong> $${car.price.toLocaleString()}</li>
                          <li><strong>Year:</strong> ${car.year}</li>
                          <li><strong>Condition:</strong> ${car.condition}</li>
                        </ul>
                      </div>
                      <div class="card-footer border-0">
                        <a href="range.html" class="btn w-100">View Details</a>
                      </div>
                    </div>
        `;
        container.appendChild(colDiv);
    });
    const nextBtn = container.closest('.carousel-inner').parentElement.querySelector('.cards-control-next');
    if (nextBtn) {
        nextBtn.style.visibility = (currentPageBySection[sectionKey] < totalPages - 1) ? 'visible' : 'hidden';
    }
}

function setupNextButton(containerId, carList, sectionKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const nextBtn = container.closest('.carousel-inner').parentElement.querySelector('.cards-control-next');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentPageBySection[sectionKey]++;
            displayCarsInSection(containerId, carList, sectionKey);
        });
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayCars);

