document.addEventListener("DOMContentLoaded", function() {
    const addCarBtn = document.getElementById("addCarBtn");
    const updateCarBtn = document.getElementById("updateCarBtn");
    const deleteCarBtn = document.getElementById("deleteCarBtn");

    const addCarForm = document.getElementById("addCarForm");
    const updateCarForm = document.getElementById("updateCarDetailsForm");
    const deleteCarForm = document.getElementById("deleteCarDetailsForm");

    const feedbackMessage = document.getElementById("feedbackMessage");

    // Toggle functionality for forms
    addCarBtn.addEventListener("click", function() {
        hideForms();
        document.getElementById("addCarForm").parentElement.style.display = "block";
    });

    updateCarBtn.addEventListener("click", function() {
        hideForms();
        document.getElementById("updateCarForm").parentElement.style.display = "block";
    });

    deleteCarBtn.addEventListener("click", function() {
        hideForms();
        document.getElementById("deleteCarForm").parentElement.style.display = "block";
    });

    function hideForms() {
        document.querySelectorAll('.form-container').forEach(form => {
            form.style.display = "none";
        });
    }

    // Handle Add Car
    addCarForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // Simulated adding car logic; replace with API call
        const model = document.getElementById("carModel").value;
        const price = document.getElementById("carPrice").value;
        const year = document.getElementById("carYear").value;
        const mileage = document.getElementById("carMileage").value;
        const description = document.getElementById("carDescription").value;
        const imageUrl = document.getElementById("carImage").value;

        // Code to add car would go here, e.g., API call

        feedbackMessage.textContent = `Car ${model} added successfully!`;
        addCarForm.reset();
    });

    // Handle Update Car
    updateCarForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // Simulated updating car logic; replace with API call
        const carId = document.getElementById("carIdToUpdate").value;
        const newModel = document.getElementById("updatedCarModel").value;
        const newPrice = document.getElementById("updatedCarPrice").value;
        const newYear = document.getElementById("updatedCarYear").value;
        const newMileage = document.getElementById("updatedCarMileage").value;
        const newDescription = document.getElementById("updatedCarDescription").value;

        // Code to update car would go here, e.g., API call

        feedbackMessage.textContent = `Car ID ${carId} updated successfully!`;
        updateCarForm.reset();
    });

    // Handle Delete Car
    deleteCarForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // Simulated deleting car logic; replace with API call
        const carId = document.getElementById("carIdToDelete").value;

        // Code to delete car would go here, e.g., API call

        feedbackMessage.textContent = `Car ID ${carId} deleted successfully!`;
        deleteCarForm.reset();
    });
});

// JavaScript for rendering a chart in the canvas
const ctx = document.getElementById('trafficChart').getContext('2d');
const trafficChart = new Chart(ctx, {
    type: 'line', // type of chart (can also be bar, pie, etc.)
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // x-axis labels
        datasets: [{
            label: 'Visitors', // Legend for the dataset
            data: [65, 59, 80, 81, 56, 55, 40], // Data points for the chart
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color below the line
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

//js interaction with php
document.addEventListener('DOMContentLoaded', () => {
    const feedbackTable = document.getElementById('feedbackTable').getElementsByTagName('tbody')[0];
    const viewFeedbackBtn = document.getElementById('viewFeedbackBtn');
    const trafficStats = document.getElementById('trafficStatistics');
    
    // Function to fetch traffic data
    function fetchTrafficData() {
        fetch('admin.php?action=fetchTraffic')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    document.getElementById('totalVisitors').innerText = data.total_visitors;
                    document.getElementById('dailyVisitors').innerText = data.visitors_today;
                    document.getElementById('monthlyVisitors').innerText = data.visitors_this_month;
                }
            })
            .catch(error => console.error('Error fetching traffic data:', error));
    }

    // Function to fetch customer feedback
    function fetchCustomerFeedback() {
        fetch('admin.php?action=fetchFeedback')
            .then(response => response.json())
            .then(data => {
                feedbackTable.innerHTML = ""; // Clear previous data
                data.forEach(feedback => {
                    const row = feedbackTable.insertRow();
                    row.insertCell(0).innerText = feedback.customer_name;
                    row.insertCell(1).innerText = feedback.feedback_text;
                    row.insertCell(2).innerText = new Date(feedback.feedback_date).toLocaleDateString();
                    row.insertCell(3).innerHTML = '<button class="btn" onclick="deleteFeedback(' + feedback.id + ')">Delete</button>';
                });
            })
            .catch(error => console.error('Error fetching feedback:', error));
    }

    // Function to submit feedback
    document.getElementById('newFeedbackForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const customerName = document.getElementById('customerName').value;
        const feedbackText = document.getElementById('feedbackText').value;

        fetch('admin.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                action: 'submitFeedback',
                customer_name: customerName,
                feedback_text: feedbackText,
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchCustomerFeedback(); // Refresh feedback list
        })
        .catch(error => console.error('Error submitting feedback:', error));
    });
    
    // Fetch data on load
    fetchTrafficData();
    fetchCustomerFeedback();

    // You can set up an event listener or a function to call updateTraffic after each visit
});

//modal to view feedback
function openModal(feedbackText) {
    document.getElementById('modalFeedbackText').innerText = feedbackText;
    document.getElementById('feedbackModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('feedbackModal').style.display = 'none';
}
