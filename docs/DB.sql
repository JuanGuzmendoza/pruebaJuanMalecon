-- Create Data Base
CREATE DATABASE IF NOT EXISTS PruebaJuanMalecon;
USE PruebaJuanMalecon;

-- Sensors Table
CREATE TABLE Sensors (
    sensor_id INT AUTO_INCREMENT PRIMARY KEY,
    sensor_code varchar(30) NOT NULL,
    type_sensor VARCHAR(200),
    price DECIMAL(12,2) NOT NULL,
    watering DATETIME NOT NULL,
    irrigation_system varchar(100) ,
    sensor_status varchar(100) ,
    maintenance DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Technicians Table
CREATE TABLE Technicians (
    technical_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Crop table
CREATE TABLE Crops (
    crop_id INT AUTO_INCREMENT PRIMARY KEY,
    type_crop VARCHAR(200) NOT NULL,
    type_soil VARCHAR(100) NOT NULL,
    fertilizer VARCHAR(250) NOT NULL,
    it_organic boolean NOT NULL,
    crop_variety VARCHAR(205) NOT NULL,
    tons_produced DECIMAL(12,2),
	sensor_id INT NOT NULL,
	CONSTRAINT fk_sensor FOREIGN KEY (sensor_id) REFERENCES Sensors(sensor_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Farms Table
CREATE TABLE Farms (
    farm_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    region VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    technical_id INT NOT NULL,
    crop_id INT, 
    CONSTRAINT fk_technical FOREIGN KEY (technical_id) REFERENCES Technicians(technical_id),
    CONSTRAINT fk_crop FOREIGN KEY (crop_id) REFERENCES Crops(crop_id) ON DELETE SET NULL
);

