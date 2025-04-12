let currentIndex = 0;
const carsPerBatch = 4;
let carData = [];
let currentType = 'Sedan'; // Store the current type

fetch('js/cars_api.json')
  .then(res => res.json())
  .then(data => {
    carData = data;
    renderCars(currentType);
  })
  .catch(err => console.error('Failed to load cars:', err));

// Set up filter buttons
document.querySelectorAll('[data-type]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentType = e.target.getAttribute('data-type');
    currentIndex = 0; // Reset on filter change
    renderCars(currentType);
  });
});

function renderCars(type) {
  const container = document.getElementById('car-card-type');
  container.innerHTML = '';

  const filteredCars = type === 'All'
    ? carData
    : carData.filter(car => car.type.toLowerCase() === type.toLowerCase());

  const carsToShow = filteredCars.slice(currentIndex, currentIndex + carsPerBatch);

  if (carsToShow.length === 0) {
    container.innerHTML = '<p class="text-white">No cars found in this category.</p>';
    return;
  }

  carsToShow.forEach(car => {
    const colDiv = document.createElement('div');
    colDiv.className = "col-lg-3 col-md-6 col-sm-12 p-2";
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

  updateNextButton(filteredCars);
  updatePrevButton(filteredCars);
}

function updateNextButton(filteredCars) {
  const nextButton = document.querySelector('.cards-control-next');
  if (!nextButton) return;

  if (currentIndex + carsPerBatch < filteredCars.length) {
    nextButton.style.display = 'block';
    nextButton.onclick = () => {
      currentIndex += carsPerBatch;
      renderCars(currentType);
    };
  } else {
    nextButton.style.display = 'none';
  }
}

function updatePrevButton(filteredCars) {
  const prevButton = document.querySelector('.cards-control-prev');
  if (!prevButton) return;

  if (currentIndex > 0) {
    prevButton.style.display = 'block';
    prevButton.onclick = () => {
      currentIndex -= carsPerBatch;
      renderCars(currentType);
    };
  } else {
    prevButton.style.display = 'none';
  }
}