$(document).ready(() => {

    //SDK.User.loadNav();
    const $historyList = $("#history-list");


    SDK.History.FindMyHistory((err, data) => {

        if (err) {
            console.log("err")
        }
        console.log(SDK.Encryption.encryptDecrypt(data));
        let history = JSON.parse(SDK.Encryption.encryptDecrypt(data));
        history.forEach((order) => {

            let $productsOrdered = " ";
            let $productsTotalPrice = 0;

            for(let i = 0; i < history.items.length; i++) {

                $productsOrdered += " " + history.items[i].product.productName;

                $productsTotalPrice += parseInt(history.items[i].product.productPrice);
            }

            const HistoryHtml = `
            
            <tr>
                <td>${history.id}</td>
                <td>${history.date}</td>
                <td>${$productsOrdered}</td>
                <td>${$productsTotalPrice}</td>
                <td>${history.userId}</td>
            `;

            $historyList.append(HistoryHtml);

        });


    })

});