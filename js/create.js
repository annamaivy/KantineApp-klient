$(document).ready(() => {

    SDK.User.loadMenu();

    $("#createUser-button").click(() => {

        const username = $("#inputUsername").val();
        const password = $("#inputPassword").val();

        SDK.User.createUser(username, password, (err, data) => {
            console.log(err, data);
            if (err){
                console.log("Error - Could not create user")
            } else {
                console.log(data);
                window.location.href = "login.html";
            }
        });

    });

});