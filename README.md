
# Donation Api
routes: 

1. POST /signup -> requires name,password and confirmpassword profession. The password is first hashed and then store in the database

2. POST /login -> requires name and password. If the name and password are correct, then a token is returned. From that token you can access the rest of the API

3. POST /logout -> requires token. If the token is correct, then the token is deleted and the user gets logged out.

4. Get /paginted -> Show the users name by limiting it (paginted concpet)

5. Get /users -> Show the users who are logged in

6. POST /picture ->Uploads the url avatar of the users of creator screens

7. POST /donate a creator who is logged in can donate to other creators 

8. env file <br>
const link=process.env.password<br>
password='mongodb+srv://<username>:<password>@cluster0.7mylzvp.mongodb.net/?retryWrites=true&w=majority'<br>

9. run the database in your  mongodb atlas 



