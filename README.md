# Money-exchange
Money exchange api 

## Prerequisites

Docker and Docker Compose installed on your system.

###  For Running the App

1. **Clone the Repository**:

2. **Start the Docker Compose Services**:

    ```bash
   docker-compose up -d
   ```

3. **Access the App**:
    - The Express app will be running on port `4000` on your localhost. 
    - You can access it and play with the api's at `http://localhost:4000/api-docs`.


## API Endpoints

The application was implemented using Swagger for the API documentation. 
- You can check it at `http://localhost:4000/api-docs`.

After using the login route, add the provided token in the response to allow requests that require authentication.

![image](https://github.com/Louhdy/money-exchange/assets/62039139/5c9b9169-3a55-40ca-ae53-b5357b251b89)

![image](https://github.com/Louhdy/money-exchange/assets/62039139/4b8381f6-6824-4869-aef7-ac464fc166f5)


#### Login

- **URL Login**: http://localhost:4000/api/auth/login
- **POST**
```
{
    "password": "prestamype",
    "email": "melgomez.gar@gmail.com"
}
```

#### New user

To log in and obtain an authentication token, make a POST request to the following URL:

- **URL**: http://localhost:4000/api/users
- **Body**
- **POST**
```
{
    "password": "prestamype",
    "email": "melgomez.gar@gmail.com"
}
```

#### New Exchange

To create Request, make a POST request to the following URL:

- **URL**: http://localhost:4000/api/exchange
- **Body**
- **POST**
```
{
    "tipo_de_cambio": "venta",
    "monto_enviar": 90
}
```
#### Get Exchanges

To list my Requests, make a GET request to the following URL:

- **URL**: http://localhost:4000/api/exchange
- **GET**

#### Get an Exchange

To see the details of one Request, make a GET request to the following URL:

- **URL**: http://localhost:4000/api/exchange/:id
- **GET**

#### Delete Exchange

To delete Request, make a Delete request to the following URL:

- **URL**: http://localhost:4000/api/exchange/:id
- **Delete**
