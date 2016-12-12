var shopifyAPI = require('shopify-node-api');
var fs = require('fs');

var Shopify = new shopifyAPI({
  shop: '3d-printers-portal.myshopify.com', // MYSHOP.myshopify.com
  shopify_api_key: '7753e3e9748faacdec91d7f0271a100d', // Your API key
  access_token: '9c72a5168f8e677d7ff30a31c522135a' // Your API password
});

function callback(err, data, headers) {
  var api_limit = headers['http_x_shopify_shop_api_call_limit'];
  console.log( api_limit ); // "1/40"
}

var shopifyData = fs.readFileSync('shopifyData', 'utf8');

Shopify.get('/admin/products.json', function(err, data, headers){
  //console.log(data); // Data contains product json information
  //console.log(headers); // Headers returned from request
  fs.writeFileSync('shopifyData', JSON.stringify(data));
});
