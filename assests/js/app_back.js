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
    $.get(backendUrl+ '/product').done(function(response){  //post
              console.log("response",response);
              response.forEach(function(product){
                 $("<tr><td>"+product.name +"</td>" +"<td>"+product.retailPrice +"</td>" +"<td>"+product.description +"</td></tr>").appendTo("tbody");

              // document.getElementById('name').innerHTML = product.name;
              //   document.getElementById('retail price').innerHTML = product.retailPrice;
              //  $("td").append(product.name);
       });
  });
//Edit
  $(document).on('click','.edit',function(){
    var userid = ($(this).attr('data-userid'));
    $(this).parent().parent().remove();
  });
//delete
  $(document).on('click','.delete',function(){
    var userid = ($(this).attr('data-userid'));
    console.log('id',userid);

   $.delete(backendUrl+'/users/'+userid, data).done(function(response){
         $(this).parent().parent().remove();
         });
       });

//left side menu
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
        window.location.href ="users.html";
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
                    $("<tr><td>"+user.username +"</td>"+"<td>"+user.password +"</td>" +"<td><button class='edit' data-userid='"+user._id+"'> Edit</button></td>" +"<td><button class='delete' data-userid="+user._id+">Delete</button></td></tr>").appendTo("tbody");
                  });
              });
            }
