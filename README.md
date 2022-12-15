
# Autoshare
## Rates so low, you won't think twice

Auto Share is the car renting marketplace. Whether you are hiring a car for business or pleasure, or you need a car or van, Autoshare has the varieties of car for you. Our main aim is to showcase a platform where people can rent their car as well book them and use them whenever they need. 

## Features
- As an anonymous user, you can view the list of car and search car by name.
- As a log-in user, in addition to the above features, you can add cars, edit and delete the car. You can create an account, login and logout. Further, in your profile page, you can update your information along with the profile image and password. It is also possible to delete the user account and deleting the user account automatically deletes all the cars owned by that specific user. Likewise, logged in user can check the car in more detail, can check the availability time and date, and make a booking.

## How to use Autoshare?
- The website comprises of different pages: Home/front page, Car detail page, Profile page, My car page, About us.
- On the Front page, there is all the list of the cars visbile. It can be sorted out based on average rating, most expensive and the cheapest. Searching the car based on the brand name is possible from the search bar. Logged in user can see their name in the top right of the page.
- On the Car detail page, there is info of the car in more detail including brand, transmission, fuel, year, seats and rent price per hour. There are images of the cars along with the availability details. Further, there is details of the user: name, phone number, email and address. There is map allocating the address for the car pick up. There is also the section for rating. This is page which enables us to do a booking.
- On the Profile page, you can upload the profile image and update all the informations except the email address. 
- On the My car page, there is list of your car. It is possible to click it and edit the information of the car and respectively delete the car using the delete button. It is also possible to add a new car from this page and upload the images.
- On About us page, there is more in details about how our website works and our contact details. 

## Website development using 
- Front-end: HTML and CSS for creating and styling all the pages. Javascript for changing the DOM and communicating with Back-end.
- Back-end: NodeJS and Express
- Database: MariaDB
- For the app deployment in server: Microsoft Azure


## Installation

#### Cloning the repo

```http
    git@github.com:Shilupa/autoShare.git
```
### Running the back end using: 

```http
    cd autoshare
    cd server
    npm install
```

### Create .env file:

```http
    DB_HOST="localhost"
    DB_NAME="autoshare"
    DB_USER="autouser"
    DB_PASSWORD="test123"
    JWT_SECRET="secret"
```

To run front end: For VSCode, you can click the Go Live on the bottom bar to open the web on your default browser.

### Dependencies
    nodemon
    Express
    multer
    dotenv
    express-validator
    bcryptjs
    jsonwebtoken
    npm i mysql2
    npm install express-validator
    npm i passport passport-local passport-jwt
    npm i exif
    
##Some screenshots from our web page
### About us page
![image](https://user-images.githubusercontent.com/91323947/207741712-e75e1a71-eabc-4b66-9337-07f2a3a35213.png)

### Login Page
![image](https://user-images.githubusercontent.com/91323947/207741851-33bb16cd-186e-413e-90b0-089e6c105bab.png)

### Home page 
![image](https://user-images.githubusercontent.com/91323947/207741933-457eab57-22b8-498b-a7ea-023bb2da93d8.png)

### editing/deleting user profile
![image](https://user-images.githubusercontent.com/91323947/207742096-a69e4f5d-41ad-4a02-a795-8ef2742b1997.png)

### adding car
![image](https://user-images.githubusercontent.com/91323947/207742214-42769a79-ae30-4d18-bdca-ba55c5ab60d2.png)

### editing car
![image](https://user-images.githubusercontent.com/91323947/207742306-8218bcfa-365c-4d9a-a97a-f89cd6570a89.png)

### Contributors
    Bibek Shrestha 
    Suraj Rana Bhat
    Shilpa Singh Yadav
