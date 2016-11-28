/**
 * Created by colin on 11/19/16.
 */
module.exports = "";
require("./node_modules/shopify-buy/lib/shopify.js");
var jQuery = require("./node_modules/jquery/dist/jquery.js");

require('./node_modules/jquery/dist/jquery.js');
const ShopifyBuy = require('./node_modules/shopify-buy/lib/shopify.js');

const client = ShopifyBuy.buildClient({
    apiKey: 'f433b939b151eb13939281a30b9db245',
    appId: '6',
    domain: '3d-printers-portal.myshopify.com'
});

$(document).ready(function () {
   $("#carousel").css('min-height', $(window).height());
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://api.thingiverse.com/popular/",
        headers: {
            "Authorization": "Bearer 33c4a53f6f6244c03008cf5f40e6e109"
       },
        success: function(data){
            var divs = $("#splashProducts div img");

            for(var i = 0; i < divs.length; i++){
                drawPicture(i, data);
            }
        }
    });
    //console.log($("#splashProducts").toArray().each);
});

var drawPicture = function(divIndex, data){
    var divs = $("#splashProducts div img");

    $.ajax({
        type: "GET",
        dataType: "json",
        url: data[divIndex].url + "images",
        headers: {
            "Authorization": "Bearer 33c4a53f6f6244c03008cf5f40e6e109"
        },
        success: function(imageData){

            //console.log(imageData.default_image.url);
            $("#splashProducts div img")[divIndex].src=imageData.default_image.url;
            //$("#splashProducts div img")[divIndex].width=180;
            $("#splashProducts div img")[divIndex].height=250;
            //console.log(imageData);
        }
    });
};

client.fetchProduct('7785801291').then(function(product) {
    //console.log(product);

});

$(function() {
    //$('#product').attr("src", "https://cdn.shopify.com/s/files/1/1611/1523/products/download.jpg?v=1479611304");
});