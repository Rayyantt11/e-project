document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("./js/cars_api.json");
        const data = await response.json();
        const cars = data.cars;

        cars.forEach(car => {
            const type = car.type?.toLowerCase();
            const container = document.getElementById(`${type}-cards`);

            if (container) {
                const carCard = document.createElement('div');
                carCard.innerHTML = `               
                    <div class="container my-4">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="card custom-card flex-lg-row">
                                            <div class="col-lg-4 p-0">
                                                <img src="${car.pic}" class="car-image" loading="lazy" alt="Audi A6">
                                            </div>
                                            <div class="col-lg-8">
                                                <div class="card-body">
                                                    <h5 class="card-title">${car.title}</h5>
                                                    <h6 class="text-success">${car.price}$</h6>
                                                    <p class="mb-2">
                                                        <strong>Type:</strong> ${car.type} &nbsp;|&nbsp;
                                                        <strong>Fuel:</strong> ${car.fuel} &nbsp;|&nbsp;
                                                        <strong>Transmission:</strong> ${car.transmission}
                                                    </p>
                                                    <p class="mb-2">
                                                        <strong>Color:</strong> ${car.color} &nbsp;|&nbsp;
                                                        <strong>Driven:</strong> ${car.driven} km &nbsp;|&nbsp;
                                                        <strong>Owners:</strong> ${car.number_of_owner}                                                        
                                                    </p>
                                                    <div class="mb-3">
                                                        <span class="badge bg-primary">${car.condition}</span>
                                                        <span class="badge bg-secondary">Seats: ${car.number_of_seats}</span>
                                                        <span class="badge bg-info text-dark">${car.model}</span>
                                                        <span class="badge bg-dark text-light">${car.make}</span>
                                                    </div>
                                                    <a href="#" class="btn btn-outline-primary">View Details</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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