project API's
Authurization API's :-
post('/register') &  You should put the input data in json file and this is the required data 
{
 "firstname":"",
"lastname":"",
"username":"",
"email":"",
"password":"",
"confirmPassword":"",
"gender":"",
"phone":""   
}
--------------------------------------------
post('/login') & You should put the input data in json file and this is the required data 
{
"email":"",
"password":""
}
-----------------------------------------------
post('/forgot-password') & You should put the input data in json file and this is the required data
{
    "email":""
}
------------------------------------------------
post('/reset-password/:token') & You should put the input data in json file and this is the required data
{
"email":"",
"newPassword":"",
"confirmNewPassword":""
}
=========================================

User API's:-
  get('/user/:Id') & Id means userId
  ------------------------------------------------------
	get('/searchUser/:Name') & You should put the input data in Headers and this is the required data: X-Access-Token = token 
 -------------------------------------------------------
	delet('/user') & You should put the input data in Headers and this is the required data: X-Access-Token = token 
 ------------------------------------------------
	patch('/user') &  You should put the input data in Headers and this is the required data: X-Access-Token = token And also there is another required data in body and this is the required data in body
 ["firstname","lastname"]=>type:"text" & ["coverPicture","profilePicture"]=>type:"file" and should be image
 
=========================================
Posts API's
 post('/addPost') & You should put the input data in Headers and this is the required data: X-Access-Token = token And also there is another required data in body and this is the required data in body
  ["description"]=>type:"text" & ["image"]=>type:"file" and should be image
  ------------------------------------------------
 put('/updatePost/:PostId/:UserId')
 You should put the input data in Headers and this is the required data: X-Access-Token = token And also there is another required data in body and this is the required data in body
  ["description"]=>type:"text" & ["image"]=>type:"file" and should be image
 ------------------------------------------------
 delete('/deletePost/:PostId/:UserId')  You should put the input data in Headers and this is the required data: X-Access-Token = token 
 ------------------------------------------------
 get('/userPosts/:UserId')  You should put the input data in Headers and this is the required data: X-Access-Token = token 
 ------------------------------------------------
 
