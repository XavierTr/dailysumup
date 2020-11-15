CREATE TABLE user (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(25) NOT NULL,
    short_description VARCHAR(40) DEFAULT '', 
    email VARCHAR(320) NOT NULL UNIQUE,
    pass_hash VARCHAR(60) NOT NULL,
    createdAt TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE thing (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT,
    description VARCHAR(150) NOT NULL,
    date TIMESTAMP DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
