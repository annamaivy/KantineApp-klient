$(document).ready(() => {

  SDK.User.loadMenu();

  $("#login-button").click(() => {

    const username = $("#inputUsername").val();
    const password = $("#inputPassword").val();

    SDK.User.login(username, password, (err, data) => {
      console.log(err, data);
      if (err){
          console.log("Error - Could not log in")
      } else {
        console.log(data);
        window.location.href = "menu.html";
      }
    });

  });

});