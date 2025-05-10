 // Sample data representing car listings (In a real application, you would fetch this from your server)
const carListings = [
    {
        id: 1,
        model: "Toyota Corolla",
        price: 15000,
        year: 2020,
        mileage: 30000,
        description: "A reliable and fuel-efficient car.",
        image: "images/toyota_corolla.jpg"
    },
    {
        id: 2,
        model: "Honda Civic",
        price: 18000,
        year: 2021,
        mileage: 20000,
        description: "A stylish and compact car.",
        image: "images/honda_civic.jpg"
    },
    // Add more sample car listings here...
];

// Function to render car listings on the page
function renderCarListings(cars) {
    const carListContainer = document.getElementById('carList');
    carListContainer.innerHTML = ''; // Clear previous listings

    cars.forEach(car => {
        const carElement = document.createElement('div');
        carElement.classList.add('car-card');
        carElement.innerHTML = `
            <img src="${car.image}" alt="${car.model}" class="car-image">
            <h3>${car.model}</h3>
            <p>Price: $${car.price}</p>
            <p>Year: ${car.year}</p>
            <p>Mileage: ${car.mileage} km</p>
            <p>${car.description}</p>
            <button class="view-details" data-id="${car.id}">View Details</button>
        `;
        carListContainer.appendChild(carElement);
    });
}

// Function to filter cars based on the search input
function filterCars() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCars = carListings.filter(car => {
        return car.model.toLowerCase().includes(searchInput);
    });
    renderCarListings(filteredCars);
}

// Function to show car details in a modal (optional for better UX)
function showCarDetails(carId) {
    const car = carListings.find(c => c.id === carId);
    if (car) {
        const modalContent = `
            <h2>${car.model}</h2>
            <img src="${car.image}" alt="${car.model}" class="modal-image">
            <p>Price: $${car.price}</p>
            <p>Year: ${car.year}</p>
            <p>Mileage: ${car.mileage} km</p>
            <p>${car.description}</p>
            <button id="closeModal">Close</button>
        `;
        const modal = document.getElementById('modal');
        modal.innerHTML = modalContent;
        modal.style.display = 'block';

        // Close modal event
        document.getElementById('closeModal').onclick = function () {
            modal.style.display = 'none';
        };
    }
}

// Initial rendering of cars
renderCarListings(carListings);

// Event listeners
document.getElementById('searchInput').addEventListener('input', filterCars);

// Event delegation for viewing car details
document.getElementById('carList').addEventListener('click', function (event) {
    if (event.target.classList.contains('view-details')) {
        const carId = parseInt(event.target.getAttribute('data-id'));
        showCarDetails(carId);
    }
});

// Optional: Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
};



