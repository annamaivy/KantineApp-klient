$(document).ready(() => {

    SDK.User.loadMenu();

    $("#logout-button").click(() => {

        const token = $("#inputToken").val();

        SDK.User.logOut(token, (err, data) => {
            console.log(err, data);
            if (err) {
                console.log("Error - Could not log out")
            } else {
                console.log(data);
                window.location.href = "menu.html";
            }
        });

    });

});