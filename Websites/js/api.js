let currentIndex = 0;
const carsPerBatch = 4;
let carData = [];

let currentType = 'All';
let currentMake = 'All';
let currentPreowned = 'All';
let currentSection = 'type'; // default render section

fetch('js/cars_api.json')
  .then(res => res.json())
  .then(data => {
    carData = data;
    renderCars(); // default initial load
  })
  .catch(err => console.error('Failed to load cars:', err));

// Type filter buttons
document.querySelectorAll('[data-type]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentType = e.target.getAttribute('data-type');
    currentMake = 'All';
    currentPreowned = 'All';
    currentIndex = 0;
    currentSection = 'type';
    renderCars();
  });
});

// Make (brand) filter buttons
document.querySelectorAll('[data-make]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentMake = e.target.getAttribute('data-make');
    currentType = 'All';
    currentPreowned = 'All';
    currentIndex = 0;
    currentSection = 'brand';
    renderCars();
  });
});

// Condition (preowned) filter buttons
document.querySelectorAll('[data-condition]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentPreowned = e.target.getAttribute('data-condition');
    currentType = 'All';
    currentMake = 'All';
    currentIndex = 0;
    currentSection = 'condition';
    renderCars();
  });
});

function renderCars() {
  const containerType = document.getElementById('car-card-type');
  const containerBrand = document.getElementById('car-card-brand');
  const containerCondition = document.getElementById('car-card-condition');

  // Hide or clear all containers first
  containerType.innerHTML = '';
  containerBrand.innerHTML = '';
  containerCondition.innerHTML = '';

  let container = containerType;
  if (currentSection === 'brand') container = containerBrand;
  if (currentSection === 'condition') container = containerCondition;

  let filteredCars = carData;

  if (currentType !== 'All') {
    filteredCars = filteredCars.filter(car => car.type.toLowerCase() === currentType.toLowerCase());
  }

  if (currentMake !== 'All') {
    filteredCars = filteredCars.filter(car => car.make.toLowerCase() === currentMake.toLowerCase());
  }

  if (currentPreowned !== 'All') {
    filteredCars = filteredCars.filter(car => car.condition.toLowerCase() === currentPreowned.toLowerCase());
  }

  const carsToShow = filteredCars.slice(currentIndex, currentIndex + carsPerBatch);

  if (carsToShow.length === 0) {
    container.innerHTML = `<p class="text-white">No cars found for this category.</p>`;
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
      renderCars();
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
      renderCars();
    };
  } else {
    prevButton.style.display = 'none';
  }
}
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const targetId = toggle.getAttribute('data-target');
    const content = document.querySelector(targetId);
    const parentCol = toggle.closest('.dropdown-column');
    const parentRow = parentCol.parentElement; 

    if (!content) return;

    const isActive = content.style.display === 'block';
    const notActive = content.style.dsipaly === 'none';

    // Reset all dropdowns and column widths
    document.querySelectorAll('.dropdown-content').forEach(drop => drop.style.display = 'none');
    document.querySelectorAll('.dropdown-column').forEach(col => {
      col.classList.remove('col-lg-12');
      col.classList.add('col-lg-');
    });

    if (!isActive) {
      // Move this section to the top
      parentRow.prepend(parentCol);
      content.style.display = 'block';
      parentCol.classList.remove('col-lg-4');
      parentCol.classList.add('col-lg-12');
    }
 
  });
});
