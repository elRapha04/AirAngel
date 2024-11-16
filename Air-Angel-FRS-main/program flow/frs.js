// Mock flight data
const flights = [
    { flightNumber: "AB123", origin: "Manila", destination: "Cebu", departureTime: "10:00 AM", price: 5000 },
    { flightNumber: "CD456", origin: "Manila", destination: "Davao", departureTime: "1:00 PM", price: 6000 },
    { flightNumber: "EF789", origin: "Cebu", destination: "Manila", departureTime: "3:00 PM", price: 4500 },
];

// Mock user credentials
const mockUser = {
    username: "testuser",
    password: "password123"
};

// 1. Show Login Section from Dashboard
function navigateToLogin() {
    document.getElementById("flightSearchSection").style.display = "none";
    document.getElementById("bookingSection").style.display = "none";
    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}

// 2. Search Flights Function
function searchFlights() {
    const origin = document.getElementById("origin").value.toLowerCase();
    const destination = document.getElementById("destination").value.toLowerCase();
    const flightResults = document.getElementById("flightResults");

    // Filter flights based on search criteria
    const results = flights.filter(flight => 
        flight.origin.toLowerCase() === origin && 
        flight.destination.toLowerCase() === destination
    );

    // Display search results
    flightResults.innerHTML = ""; // Clear previous results
    if (results.length > 0) {
        results.forEach(flight => {
            flightResults.innerHTML += `
                <p>Flight Number: ${flight.flightNumber}, 
                Departure: ${flight.departureTime}, 
                Price: ${flight.price} PHP
                <button onclick="selectFlight('${flight.flightNumber}')">Select</button></p>
            `;
        });
    } else {
        flightResults.innerHTML = "<p>No flights available for your search criteria.</p>";
    }
}

// 3. Select Flight for Booking
let selectedFlight = null;
function selectFlight(flightNumber) {
    selectedFlight = flights.find(flight => flight.flightNumber === flightNumber);
    
    const bookingSummary = document.getElementById("bookingSummary");
    bookingSummary.innerHTML = `
        <p>Flight Number: ${selectedFlight.flightNumber}</p>
        <p>Origin: ${selectedFlight.origin}</p>
        <p>Destination: ${selectedFlight.destination}</p>
        <p>Departure Time: ${selectedFlight.departureTime}</p>
        <p>Price: ${selectedFlight.price} PHP</p>
    `;
    
    document.getElementById("flightSearchSection").style.display = "none";
    document.getElementById("bookingSection").style.display = "block";
}

// 4. Confirm Payment
function confirmPayment() {
    document.getElementById("bookingSection").style.display = "none";
    document.getElementById("paymentSection").style.display = "block";
}

// 5. Finalize Booking after Payment
function finalizeBooking() {
    const paymentStatus = document.getElementById("paymentStatus");
    const paymentMethod = document.getElementById("paymentMethod").value;

    paymentStatus.innerText = `Payment confirmed using ${paymentMethod}. Booking completed for flight ${selectedFlight.flightNumber}. Thank you!`;
    document.getElementById("paymentSection").style.display = "none";
}

// 6. Login (Optional)
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginStatus = document.getElementById("loginStatus");

    if (username === mockUser.username && password === mockUser.password) {
        loginStatus.innerText = "Login successful!";
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("flightSearchSection").style.display = "block"; // Return to the dashboard
    } else {
        loginStatus.innerText = "Invalid credentials. Please try again.";
    }
}
