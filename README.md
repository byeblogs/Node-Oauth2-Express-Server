# Node-Oauth2-Express-Server

Hii Everyone,
If you are familiar to Nodejs or Javascript (ofcourse thats why you are here). You know that for authentication we use JWT token and then check that token for identifying that the user is valid or not.

**But wait...** is this the only scenerio??
##### No

Today there are many ways to authorize and authenticate the user. One of them is Oauth2 that is used for third party login like **login to Google** and **login to Facebook**.
The way this third party login works is first the Google or any thirs party server provide the authentication code to the first party and then that first party again send that authentication code to the third party server. Now that server revert back to clientId and secretId that is passed with our credentials.

**_before starting further, I would like to tell that here we are using password grant_type and our client_id and secret_id is null (as we our Oauth2 and application server is same)._**

**What happen when the Oauth2 server and application server is the same.**
Today, we are here to deal with such a scenerio where both servers is the same.
For this, we will use node-oauth2-server that is a very good node module with error handling.

#### How to use it ??
So, first import the node-oauth2-server using require keyword in the index.js or app.js file.
Then, create a model.js file in any folder or wherever you want. And copy the code that is in our authorization/model.js file.
Now, check our projects index.js file where we have use the node-oauth2-module with express server.

#### About Project 
This project is based on Oauth2 authentication of the user via its credentials where we will generate the access-token of the user with Oauth2 mechanism.
The Access-token will have an scope where that scope can access the urls or endpoints if it has the following permissions.
Also we can generate the access-token of the particular scope.


# Test this
hello teasting

# Test2 this
hello teasting

# Test3 this
hello teasting


# Test4 this
hello teasting

# Test5 this
hello teasting
