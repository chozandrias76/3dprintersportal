var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var shopifyAPI = require('shopify-node-api');
var apiCalls = require('./api-calls.js');
var ap = apiCalls.PopularThings;

var Shopify = new shopifyAPI({
    shop: '3d-printers-portal.myshopify.com', // MYSHOP.myshopify.com
    shopify_api_key: '7753e3e9748faacdec91d7f0271a100d', // Your API key
    access_token: '9c72a5168f8e677d7ff30a31c522135a' // Your API password
});

function callback(err, data, headers) {
    var api_limit = headers['http_x_shopify_shop_api_call_limit'];
    console.log(api_limit); // "1/40"
}

Shopify.get('/admin/products.json', function(err, data, headers) {
    //console.log(data); // Data contains product json information
    //console.log(headers); // Headers returned from request
    products = data;
});

var products;

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/products.json', function(req, res) {
    res.send({products: products});
});

app.get('/popular.json', function(req, res) {
    //res.send(apiCalls.avaliableData);
    ap.getObject(function(err, responce) {
        if (err) {
            // include better error handling here
            return console.log(err);
        }
        // use response here
        return console.log(response);
    });
});

// app.get('/products', function(req, res) {
//   res.sendfile(__dirname + '/public/products.html');
// });

app.post('/products', function(req, res) {
    var productName = req.body.name;

    res.send('Successfully created product!');
});

app.put('/products/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    products.products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {}
    });

    res.send('Succesfully updated product!');
});

app.delete('/products/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            products.splice(index, 1);
        }
    });

    res.send('Successfully deleted product!');
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
