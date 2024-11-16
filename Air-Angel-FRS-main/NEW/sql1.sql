CREATE DATABASE flight_reservation;

USE flight_reservation;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE flights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    flightNumber VARCHAR(10) NOT NULL,
    origin VARCHAR(50) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    departureTime VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
