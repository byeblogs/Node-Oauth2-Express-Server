# Node-Oauth2-Express-Server

Hii Everyone,\
If you are familiar to Nodejs or Javascript (ofcourse thats why you are here). You know that for authentication we use JWT token and then check that token for identifying that the user is valid or not.

**But wait...** is this the only scenerio??
##### No

Today there are many ways to authorize and authenticate the user. One of them is Oauth2 that is used for third party login like **login to Google** and **login to Facebook**.\
The way this third party login works is first the Google or any thirs party server provide the authentication code to the first party and then that first party again send that authentication code to the third party server. Now that server revert back to clientId and secretId that is passed with our credentials.

**_before starting further, I would like to tell that here we are using password grant_type and our client_id and secret_id is null (as we our Oauth2 and application server is same)._**

**What happen when the Oauth2 server and application server is the same.**\
Today, we are here to deal with such a scenerio where both servers is the same.\
For this, we will use node-oauth2-server that is a very good node module with error handling.

## How to use it ??
So, first import the node-oauth2-server using require keyword in the index.js or app.js file.\
Then, create a model.js file in any folder or wherever you want. And copy the code that is in our authorization/model.js file.\
Now, check our projects index.js file where we have use the node-oauth2-module with express server.

## About Project 
This project is based on Oauth2 authentication of the user via its credentials where we will generate the access-token of the user with Oauth2 mechanism.\
The Access-token will have an scope where that scope can access the urls or endpoints if it has the following permissions.\
Also we can generate the access-token of the particular scope.


## About API's

#### Auth User
This API's is for the operations on the user like register and login. Both the API are of POST HTTPMethods.
###### Register API 
Register API is to register any user in DB. The required things are **_username_**, **_password_**, **_phone_**.\
**username** should be an email address.\
**password** can be anything.\
**phone** is your phone number in integer.

###### Login API
Login API is to login the registered user using Oauth2 mechanism where the required things are **_username_**, **_password_**, **_client_id_**, **_client_secret_**, **_grant_type_**.\
**username** should be an email address.\
**password** can be anything.\
**client_id** should be null as our Oauth2 server and application server is same.\
**client_secret** should be null as our Oauth2 server and application server is same.\
**grant_type** should be password as this is credential based authentication.


#### Category (only Admin have permission to access this API's)
This API's is used for the operations on category i.e. the any product have a category type. This consists of one API _create_category_.
###### Create Category API
Create Category API is used to create a category like vehicles that contains various cars and bikes informations. The required things are **_category_name_**, **_category_description_**.\
**category_name** should be any name of the category.\
**category_description** should be the description about that category.


#### Product (admin can access 2 API's and user can access only 1 API)
This API's is used for the operations on product. This consists of 3 API's _create_product, getProductByProductId, delete_product_.
###### Create Product API
This API is used to create a product like Pulsar,a bike from Bajaj. The required things are **_product_name_**, **_product_description_**, **_product_price_**, **_category_id_**.\
**product_name** should be any name like Pulsar.\
**product_description** should be the description about that product.\
**product_price** should be the price of that product in integer.\
**category_id** should be the id of the category that product belong to.

###### Get Product API
This API is used to get the product details by the product id. The required things are **_id_**.\
**id** should be the valid product id. If invalid, you will get error.

###### Delete Product API
This API is used to delete a particular product bu its id. The required things are **_id_**.\
**id** should be valid product id, If invalid, you will get error.


#### Scope (only Admin have permission to access this API's)
This API's is used for the operations on scopes that an access-token can have. This consists of 1 API _addScope_.
###### Add Scope
This API is used to add an scope and that scope have permissions to some endpoints that an access-token can access. The required things are **_scopeNumber_**, **_permissions_**.\
**scopeNumber** should be any alphabet like A or B.\
**permissions** should be an array of endpoints like http://localhost:5000/products/create_product. If not like this you will get an error.


#### User Cart (both admin and user can access this API's)
This API's is used for the operations on user carts that the user can add product to their cart or delete a product from their cart or more.\
This consists of 3 API's _addProductToUserCart_, _getAllProductOfUserByUserId_, _deleteProductFromUserCart_.
###### Add Product to User Cart API
This API is used to add a product to users cart that a user want to add. The required things are **_userId_**, **_product_id_**.\
**userId** should be a valid user id otherwise you will get an error.\
**product_id** should be a valid product id otherwise you will get an error.

###### Get All product of User API
This API is used to get all the product that the user has already added to their cart. The required things are **_userId_**.\
**userId** should be a valid user id otherwise you will get an error.

###### Delete Product from User Cart API
This APi is used to delete a product from the user cart. The required things are **_userId_**, **_product_id_**.\
**userId** should be a valid user id otherwise you will get an error.\
**product_id** should be a valid product id otherwise you will get an error.
