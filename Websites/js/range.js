document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("./js/cars_api.json");
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      const cars = await response.json(); // No .cars now
  
      if (!Array.isArray(cars)) {
        throw new Error("Expected an array of cars");
      }
  
      cars.forEach(car => {
        const type = car.type?.toLowerCase();
        const container = document.getElementById(`${type}-cards`);
  
        if (container) {
          const carCard = document.createElement('div');
          carCard.className = "col-lg-3 col-md-6 col-sm-12 p-2 d-flex justify-content-center align-items-center";
          const modalId = `carModal-${car.id || Math.random().toString(36).substr(2, 9)}`;
  
          carCard.innerHTML = `
            <div class="card custom-card">
              <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div class="modal-content bg-dark text-light">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5 text-light" id="${modalId}-label">${car.title}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <img src="${car.pic}" class="car-image" loading="lazy" alt="${car.title}">
                      <p><strong>Type:</strong> ${car.type}</p>
                      <p><strong>Fuel:</strong> ${car.fuel}</p>
                      <p><strong>Transmission:</strong> ${car.transmission}</p>
                      <p><strong>Color:</strong> ${car.color}</p>
                      <p><strong>Driven:</strong> ${car.driven} km</p>
                      <p><strong>Owners:</strong> ${car.number_of_owner}</p>
                      <div class="mb-3">
                        <span class="badge bg-light text-dark">${car.condition}</span>
                        <span class="badge bg-light text-dark">Seats: ${car.number_of_seats}</span>
                        <span class="badge bg-light text-dark">${car.model}</span>
                        <span class="badge bg-light text-dark">${car.make}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <img src="${car.pic}" class="car-image" loading="lazy" alt="${car.title}">
              <div class="card-body">
                <h5 class="card-title">${car.title}</h5>
                <h6 class="text-success">${car.price}$</h6>
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#${modalId}">
                  View details
                </button>
              </div>
            </div>
          `;
          container.appendChild(carCard);
        } else {
          console.warn(`No container found for type: ${type}`);
        }
      });
    } catch (error) {
      console.error("Error loading car data:", error);
    }
  });
  