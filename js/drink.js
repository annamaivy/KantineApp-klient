$(document).ready(() => {

    //henter menu navigationen i toppen
    //SDK.User.loadMenu();
    // ikk nødvendigt at returnere status osv.

    const drinkList = $("#drink-list");


    SDK.Drink.getDrinks((err, data) => {
        console.log(err, data);
        let drinks = JSON.parse(SDK.Encryption.encryptDecrypt(data));
        console.log(drinks);
        //console.log(1, food);
        drinks.forEach(drink => {
            console.log(1, drink);
            drinkList.append(
                "<tr>" +
                "<td>"+drink.productName+"</td>" +
                "<td>"+drink.productPrice+"</td>" +
                "<td><button class=\"btn btn-success addToHistory-button\" data-event-id=\"${event.idEvent}\">Order</button></td>"+
                "</tr>"
            )
        })
    /*SDK.Products.findDrinks((err, drinks) => {
        drinks.forEach((drink) => {

            const drinkHtml = `
        <div class="col-lg-4 product-container">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">${drink.title}</h3>
                </div>

                <div class="panel-footer">
                    <div class="row">
                        <div class="col-lg-4 price-label">
                            <p>Kr. <span class="price-amount">${drink.price}</span></p>
                        </div>
                        <div class="col-lg-8 text-right">
                            <button class="btn btn-success purchase-button" data-drink-id="${drink.id}">Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

            $drinkList.append(drinkHtml);

        });*/

    });

    const orderId = $(this).data("order-id");
    $(".order-button").click(function () {
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