
# Creators Api
routes: 

1. POST /signup -> requires name,password and confirmpassword profession. The password is first hashed and then store in the database

2. POST /login -> requires name and password. If the name and password are correct, then a token is returned. From that token you can access the rest of the API

3. POST /logout -> requires token. If the token is correct, then the token is deleted and the user gets logged out.

4. Get /paginted -> Show the users name by limiting it (paginated concpet)

5. Get /users -> Show the users who are logged in

6. POST /picture ->Uploads the url avatar of the users of creator screens

7. POST /donate a creator who is logged in can donate to other creators 

8. env file <br>
const link=process.env.password<br>
password=mongodb+srv://(username):(password)@cluster0.7mylzvp.mongodb.net/?retryWrites=true&w=majority'<br>

9. Run the database in your  mongodb atlas <br>

10. script in login page
    ![image](https://user-images.githubusercontent.com/87666139/194013993-76e2beea-4b56-4efb-af8a-746dd9702d0d.png)<br>
    ![image](https://user-images.githubusercontent.com/87666139/194014638-6569696e-f6f7-4e4d-8f29-9ee6a0e38e12.png)<br>
    ![image](https://user-images.githubusercontent.com/87666139/194014735-21c58c79-32de-41e4-b12e-a970005eb06e.png)<br>

11. Note=Done till task 4 currently working on task 5(optional task)(Duckcart)


