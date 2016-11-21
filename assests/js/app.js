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

    $.get(backendUrl+ '/product').done(function(response){  //post
              console.log("response",response);
              response.forEach(function(product){
                 $("<tr><td>"+product.name +"</td>" +"<td>"+product.retailPrice +"</td>" +"<td>"+product.description +"</td></tr>").appendTo("tbody");

              // document.getElementById('name').innerHTML = product.name;
              //   document.getElementById('retail price').innerHTML = product.retailPrice;
              //  $("td").append(product.name);
       });
  });
});


  $(function () {        //sidebar menu
     $('#menu').metisMenu();
   });
