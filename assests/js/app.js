var backendUrl = "http://172.16.10.127:8000/api";
$(document).ready(function(){
  //login submit button click
  $("#loginForm").click(function(){             // click submit button;
      var username= $("#username").val().trim();
      var password = $("#password").val().trim();
       var data = {
            "username":username,
            "password":password
        };
        // debugger;
    $.post(backendUrl+ '/authenticate', data).done(function(response) {
          //user authrnticated
          console.log("response", response);
            window.location.href ="index.html";
         });
       });
    $.get(backendUrl+ '/product').done(function(response){
              console.log("response",response);
              response.forEach(function(product){
                 $("<tr><td>"+product.name +"</td>" +"<td>"+product.retailPrice +"</td>" +"<td>"+product.description +"</td></tr>").appendTo("tbody");

              // document.getElementById('name').innerHTML = product.name;
              //   document.getElementById('retail price').innerHTML = product.retailPrice;
              //  $("td").append(product.name);
            });
          });
        });
  //edit submit button
  $("#editForm").click(function(){
      var userid = localStorage.getItem("id");            // click submit button;
      var username= $("#username").val().trim();
          password= $("#password").val().trim();
          fullname= $("#fullname").val().trim();
          mobile=   $("#mobile").val().trim();
          birthday= $("#dob").val().trim();
          gender=   $("#password").val().trim();

       var data = {
            "username":username,
            "password":password,
            "fullName":fullname,
            "mobileNumber":mobile,
            "birthDay":birthday,
            "gender":gender
        };
        $.ajax({
           url:backendUrl+ '/users/'+ userid,
           type: 'PUT',
           data:data,
            }).done(function(response){
              //  $("<tr><td>"+response.fullname +"</td>"+"<td>"+response.mobile+"</td></tr>").appendTo("tbody");
              console.log("response",response);
                window.location.href ="userlist.html";
              });
        });

//Edit
  $(document).on('click','.edit',function(){
      var userid = ($(this).attr('data-userid'));
      localStorage.setItem("id", userid);
    });
//delete
     $(document).on('click','.delete',function(){
     var userid = ($(this).attr('data-userid'));
     console.log('id',userid);
    $(this).parent().parent().remove();

   //$.delete(backendUrl+ '/users/'+userid, {}).done(function(response){
         //console.log("response", response);
        // $(this).parent().parent().remove();
         //});
       $.ajax({
          url:backendUrl+ '/users/'+ userid,
          type: 'DELETE',
      }).done(function(response){
        var msg =response.message;
        $("p").append(msg);

      });
    });

//leftside menu
$(function () {
   $('#menu').metisMenu();
 });

//signup process
$(document).ready(function(){
  //signup submit button click
  var backendUrl = "http://172.16.10.127:8000/api";
  $("#signupForm").click(function(){             // click submit button;
      var username= $("#username").val().trim();
      var password = $("#password").val().trim();
      var data = {
          "username":username,
          "password":password
        };
        // debugger;
      $.post(backendUrl+ '/users', data).done(function(response){
        //user signup
        console.log('response',response);
        var msg = response.message;
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        $("p").append(msg);
        window.location.href ="userlist.html";
        });
      });
              // .get(backendUrl+ '/users').done(function(response){
              //           console.log("response",response);
              //           response.forEach(function(user){
              //           $("<tr><td>"+user.name +"</td>" +"<td>"+user.password +"</td></tr>").appendTo("tbody");
              //         //  document.getElementById('name').innerHTML = product.name;
              //            });
              //          });

   });


   function showUsers(){
     var username = localStorage.getItem("username"),
         password = localStorage.getItem("password");
    // console.log("username" , username, "password", password);
      // $.ajax({
      //     url: backendUrl +"/users",
      //     type: "GET",
      //     beforeSend: function(xhr){xhr.setRequestHeader("Authorization", "Basic " +"admin" + ":" + "admin");},
      //     success: function() { }
      //  });
       $.get(backendUrl+ '/users').done(function(response){  //post
                 console.log("response",response);
                 response.forEach(function(user){
                    $("<tr><td>"+user.username +"</td>"+"<td>"+user.password +"</td>"+"<td><button class='edit' data-userid='"+user._id+"'><a href='editpage.html'>Edit</a></button></td>" +"<td><button class='delete' data-userid="+user._id+">Delete</button></td></tr>").appendTo("tbody");
                  });
              });
      }

      function editUser(){
        var userid = localStorage.getItem("id");
        console.log("userid", userid);
        $.get(backendUrl+ '/users/'+userid).done(function(response){
                  console.log("response",response);
                  document.getElementById('username').value= response.username;
                  document.getElementById('password').value= response.password;
                });
              }
         // console.log("username" , username, "password", password);
           // $.ajax({
           //     url: backendUrl +"/users",
           //     type: "GET",
           //     beforeSend: function(xhr){xhr.setRequestHeader("Authorization", "Basic " +"admin" + ":" + "admin");},
           //     success: function() { }
           //  });
