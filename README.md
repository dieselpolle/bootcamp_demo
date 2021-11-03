# Bootcamp Demo

This app stores users with IP address information to a database by using my Bootcamp Backend REST API. 

The app is implemented by Java Script and these additional packages needed for running the app: express, cors, helmet.

## Install
Clone the repository and install packages:
```bash
git clone [repo url]
npm install
```
The app needs my backend app, install it here:
https://github.com/dieselpolle/bootcamp-backend

The backend app implements REST API for user ja IP address data handling. There is a MySQL database for storing the backend data.

This app also utilizes a free REST API for getting the public IP address information of the registered users. This API uses http protocol so it is essential to open my bootcamp demo app with this same protocol to avoid browser security issues of mixed protocols.

## Look and feel

You can see the working app here:
http://mikko-bootcamp-frontend.herokuapp.com/
