$(document).ready(function(){
  var backendUrl = "http://192.99.172.172:8000/api";
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
  });// document close


  $(function () {
     $('#menu').metisMenu();
   });
