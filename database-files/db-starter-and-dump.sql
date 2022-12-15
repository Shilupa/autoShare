
DROP DATABASE if exists autoshare;
CREATE database autoshare;

USE autoshare;


CREATE TABLE person
(
  id INT NOT NULL Auto_increment,
  PRIMARY KEY (id),
  name varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(200) NOT NULL,
  street_address varchar(50) NOT NULL,
  phone_ varchar(20) NOT NULL,
  city varchar(50) NOT NULL,
  postal_code_ varchar(10) NOT NULL,
  license varchar(50) NOT NULL,
  gender varchar(20) NOT NULL,
  dob DATE NOT NULL,
  role_ varchar(20) NOT NULL
);

CREATE TABLE profile
(
  person_id int NOT NULL,
  PRIMARY KEY (person_id),
  file varchar(100),
  FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

CREATE TABLE car
(
  reg_no varchar(50) NOT NULL,
  brand varchar(50) NOT NULL,
  model varchar(50) NOT NULL,
  year_ YEAR NOT NULL,
  transmission varchar(30) NOT NULL,
  fuel_type varchar(30) NOT NULL,
  seater INT NOT NULL,
  color varchar(20) NOT NULL,
  rent_price FLOAT NOT NULL,
  car_address varchar(50) NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  dropoff_date DATE NOT NULL,
  dropoff_time TIME NOT NULL,
  person_id int NOT NULL,
  PRIMARY KEY (reg_no),
  FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);


CREATE TABLE booking
(
  id INT NOT NULL AUTO_INCREMENT,
  intended_hour_of_booking FLOAT NOT NULL,
  intended_distance_of_travel FLOAT NOT NULL,
  person_id int NOT NULL,
  car_reg_no varchar(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE,
  FOREIGN KEY (car_reg_no) REFERENCES car(reg_no) ON DELETE CASCADE
);

CREATE TABLE pictures
(
  id INT NOT NULL AUTO_INCREMENT,
  file_name varchar(100) NOT NULL,
  car_reg_no varchar(50) NOT NULL,
  placeholder INT,
  PRIMARY KEY (id),
  FOREIGN KEY (car_reg_no) REFERENCES car(reg_no) ON DELETE CASCADE
);

CREATE TABLE review
(
  id INT NOT NULL AUTO_INCREMENT,
  comment varchar(500) NOT NULL,
  rating int NOT NULL,
  booking_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (booking_id) REFERENCES booking(id) ON DELETE CASCADE
);



/* -- Adding person with login address --*/
insert into person (name, email, password, street_address, phone_, city, postal_code_, license, gender,dob,role_)
values ('Admin','shilpa@haha.com','msbeautiful','wall street','00465851', 'Espoo', '02160', '123456', 'female', '2000-10-10', 'Admin');
insert into person (name, email, password, street_address, phone_, city, postal_code_, license, gender,dob,role_)
values ('User','bibke@haha.com','hansomehulk','roof street','00465852', 'Helsinki', '02140', '1234567', 'male', '2000-10-1', 'User');
insert into person(name, email, password, street_address, phone_, city, postal_code_, license, gender,dob,role_)
values ('User','suraj@haha.com','mridiot','floor street','00465853', 'Vanta', '02150', '1234567', 'male', '1991-10-10', 'User');

/* -- Adding profile with person address -- */
insert into profile (person_id, file) values (1,'http://placekitten.com/200/300');
insert into profile (person_id, file) values (2,'https://place-puppy.com/300x300');
insert into profile (person_id, file) values (3,'https://place-puppy.com/300x300');


/* -- Adding car with with person address --*/
insert into car values ('123-12', 'Toyota','Yaris','2010','Automatic', 'Petrol', '5', 'Black', 12.5,'Jamerantaival', '2022.10.10', '10:10:0','2022.10.10','12:10:10', 1);
insert into car values ('123-123', 'Toyota','Fortuner','2012','Automatic', 'Petrol', '5', 'Red', 15.5,'Jamerantaival', '2022.10.10', '10:10:0','2022.10.10','12:10:10', 1);

/* -- Adding car with with person address --*/
insert into car values ('1234-12', 'Tesla','Model S','2013','Automatic', 'Electric', '5', 'Black', 17.5,'Leppavara', '2022.10.10', '10:10:0','2022.10.10','12:10:10', 2);
insert into car values ('1234-123', 'Audi','e tron','2018','Automatic', 'Electric', '5', 'White', 15.5,'Leppavara', '2022.10.10', '10:10:0','2022.10.10','12:10:10', 2);

/* -- adding pictures of cars -- */
insert into pictures (file_name, car_reg_no, placeholder) values ('http://placekitten.com/200/300','123-12',1);
insert into pictures (file_name, car_reg_no, placeholder) values ('https://place-puppy.com/300x300','123-123',2);
insert into pictures (file_name, car_reg_no, placeholder) values ('http://placekitten.com/200/300','1234-12',1);
insert into pictures (file_name, car_reg_no, placeholder) values ('https://place-puppy.com/300x300','1234-123',3);
insert into pictures (file_name, car_reg_no, placeholder) values ('https://place-puppy.com/300x300','123-12',2);

/* -- adding booking info -- */
insert into booking (intended_hour_of_booking, intended_distance_of_travel, person_id, car_reg_no)
values (5.5, 100.0, 3, '1234-123');

/* -- adding booking info -- */
insert into booking (intended_hour_of_booking, intended_distance_of_travel, person_id, car_reg_no)
values (3.5, 50.0, 2, '123-12');

/* -- adding booking info -- */
insert into booking (intended_hour_of_booking, intended_distance_of_travel, person_id, car_reg_no)
values (4.5, 75.0, 2, '123-12');


/* -- adding review  -- */
insert into review (comment, rating, booking_id) values ('Awesome Car', 5, 1);
insert into review (comment, rating, booking_id) values ('The owner was really beautiful', 5, 2);
insert into review (comment, rating, booking_id) values ('The owner was really Hansome', 3, 3);