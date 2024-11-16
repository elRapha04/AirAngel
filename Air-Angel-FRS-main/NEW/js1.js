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

// Navigation functions
function navigateToLogin() {
    document.getElementById("flightSearchSection").style.display = "none";
    document.getElementById("bookingSection").style.display = "none";
    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("loginSection").style.display = "block";
}

function navigateToSignup() {
    document.getElementById("flightSearchSection").style.display = "none";
    document.getElementById("bookingSection").style.display = "none";
    document.getElementById("paymentSection").style.display = "none";
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("signupSection").style.display = "block";
}

// Search flights
function searchFlights() {
    const origin = document.getElementById("origin").value.toLowerCase();
    const destination = document.getElementById("destination").value.toLowerCase();
    const flightResults = document.getElementById("flightResults");

    const results = flights.filter(flight => 
        flight.origin.toLowerCase() === origin && 
        flight.destination.toLowerCase() === destination
    );

    flightResults.innerHTML = "";
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

// Select flight for booking
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

function confirmPayment() {
    document.getElementById("bookingSection").style.display = "none";
    document.getElementById("paymentSection").style.display = "block";
}

function finalizeBooking() {
    const paymentStatus = document.getElementById("paymentStatus");
    const paymentMethod = document.getElementById("paymentMethod").value;
    paymentStatus.innerText = `Payment confirmed using ${paymentMethod}. Booking completed for flight ${selectedFlight.flightNumber}. Thank you!`;
    document.getElementById("paymentSection").style.display = "none";
}

// Login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginStatus = document.getElementById("loginStatus");

    if (username === mockUser.username && password === mockUser.password) {
        loginStatus.innerText = "Login successful!";
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("flightSearchSection").style.display = "block";
    } else {
        loginStatus.innerText = "Invalid credentials. Please try again.";
    }
}

// Sign up
function signUp() {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    const signupStatus = document.getElementById("signupStatus");

    fetch("signup.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.text())
    .then(data => {
        signupStatus.innerText = data;
    })
    .catch(error => {
        signupStatus.innerText = "Error during signup. Please try again.";
    });
}
