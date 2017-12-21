const SDK = {
  serverURL: "http://localhost:8080/api",
  request: (options, cb) => {

    let headers = {};
    if (options.headers) {
      Object.keys(options.headers).forEach((h) => {
        headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
      });
    }

      let token = SDK.Storage.load("token");

      $.ajax({
      url: SDK.serverURL + options.url,
      method: options.method,
      headers: {'Authorization': token}, //headers
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(options.data),
      success: (data, status, xhr) => {
        cb(null, data, status, xhr);
      },
      error: (xhr, status, errorThrown) => {
        cb({xhr: xhr, status: status, error: errorThrown});
      }
    });

  },

  Food: {
    getFood: (cb) => {
      console.log('request')
      SDK.request({
        method: "GET",
        url: "/food",
      }, (err, food) => {
          if (err) return cb(err);
          console.log(2, food);
          cb(null, food)
            }, cb);
        }
    },

  Drink: {
    getDrinks: (cb) => {
      SDK.request({
        method: "GET",
        url: "/drink",
      }, (err, drink) => {
          if (err) return cb(err);
          cb(null, drink)
        }, cb);
      }
  },

  History: {
     FindMyHistory: (cb) => {
        SDK.request({
           method: "GET",
           url: "/history",
           headers: {
               Authorization: SDK.Storage.load("token")
           }
        }, cb)
    },
  },

  Order: {
      orderProduct: (id, data, cb) => {
          SDK.request({
              method: "POST",
              url: "/user/orders/1",
              data: {
                  user_Id: SDK.User.current().user_Id,
                  date: current.dateTime
              },
              headers: {
                  headers: {Authorization: SDK.Storage.load("token")}
              }
          }, (err, data) => {
              if (err) return cb(err);
              cb(null, data);
          })
      },

      /*orderProduct: (id, data, cb) => {
          SDK.request({
              method: "POST",
              url: "/users/order/" + id,
              data: data,
              headers: {Authorization: SDK.Storage.load("token")}
          }, cb);
      }*/
  },

        /*orderProduct: (orderId, id, productName, productPrice, cb) => {

          SDK.request({
              data: {
                  orderId: orderId,
                  id: id,
                  productName: productName,
                  productPrice: productPrice
              },

              method: "POST",
              url: "/users/orders" + orderId,
              headers: {
                Authorization: SDK.Storage.load("token")
              }
          }, (err, data) => {

              cb(null, data);
          });
      },

  },*/

  User: {
    findAll: (cb) => {
        SDK.request({method: "GET", url: "/users/"}, cb);
    },

    current: () => {
        return SDK.Storage.load("token");
    },

    logOut: (token, cb) => {
      SDK.request({
          data:{
            token: SDK.User.current().token
          },
          url: "/users/logout",
          method: "POST",
          headers: {
              authorization: "Bearer " + SDK.User.current().token
          }
      }, (err,data) => {
        console.log((2, err, data))

          if (err) return cb(err);

          cb(null, data);

      });
        window.location.href = "index.html";

    },

    login: (username, password, cb) => {
      SDK.request({
        data: {
          username: username,
          password: password
        },
        url: "/users/login",
        method: "POST"
      }, (err, data) => {
        console.log(2, err, data);

        //On login-error
        if (err) return cb(err);

        cb(null, data);

      });
    },

    createUser: (username, password, cb) => {
      SDK.request({
        data: {
          username: username,
          password: password
        },
        url: "/users/create",
        method: "POST"
      }, (err, data) => {
        console.log(2, err, data);

        if (err) return cb(err);

        cb(null, data);

      });
    },

    loadMenu: (cb) => {
      $("#menu-container").load("menu.html", () => {
        const currentUser = SDK.User.current();
        if (currentUser) {
          $(".navbar-right").html(`

          `);
        } else {
          $(".navbar-right").html(`
            <li><a href="index.html" id="logout-link">Sign out</a></li>
          `);
        }
          $("#logout-link").click(() => SDK.User.logOut());
          cb && cb();
      });
    }
  },

  Encryption: {
        encryptDecrypt(input) {
            let key = ['L', 'O', 'L']; //Can be any chars, and any size array
            let output = [];

            for (let i = 0; i < input.length; i++) {
                let charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
                output.push(String.fromCharCode(charCode));
            }
            return output.join("");
        }

    },

  Storage: {
        prefix: "canteenSDK",
        persist:
            (key, value) => {
                window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
            },
        load:
            (key) => {
                const val = window.localStorage.getItem(SDK.Storage.prefix + key);
                try {
                    return JSON.parse(val);
                }
                catch (e) {
                    return val;
                }
            },
        remove:
            (key) => {
                window.localStorage.removeItem(SDK.Storage.prefix + key);
            }
    }

};