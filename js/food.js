$(document).ready(() => {

    //henter menu navigationen i toppen
    //SDK.User.loadMenu();
    // ikk nødvendigt at returnere status osv.

    const foodList = $("#food-list");


    SDK.Food.getFood((err, data) => {
        console.log('getFood');
        console.log(err, data);
        let foods = JSON.parse(SDK.Encryption.encryptDecrypt(data));
        console.log(foods);
        //console.log(1, food);
        foods.forEach(food => {
            console.log(1, food);
            foodList.append(
                "<tr>" +
                "<td>"+food.productName+"</td>" +
                "<td>"+food.productPrice+"</td>" +
                //"<td><button class=\"btn btn-success order-button\" data-order-id=\"${History.orderId}\">Order</button></td>"+
                "<td><button class=\"btn btn-info btn-lg\" data-toggle=\"modal\" data-target=\"#myModal\">Order</button>\n</td>"+
                "</tr>"
            )
        })

        const orderId = $(this).data("order-id");
        $(".order-button").click(function () {
            //$purchaseModal.modal('toggle');
            SDK.History.FindMyHistory((error, data) => {
                const orders = JSON.parse(SDK.Encryption.encryptDecrypt(data));
                let currentOrder = null;
                orders.forEach((order) => {
                    if (order.id === orderId) {
                        currentOrder = order;
                    }
                })
                console.log(currentOrder);
                SDK.Order.orderProduct(orderId, (err, data) => {
                    console.log(data);

                })
            });
        });

    });
});