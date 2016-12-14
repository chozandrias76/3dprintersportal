/**
 * Created by colin on 11/19/16.
 */
//module.exports = "";

var jQuery = require("./node_modules/jquery/dist/jquery.js");
const ShopifyBuy = require('./node_modules/shopify-buy/lib/shopify.js');

//var fs = require('fs');

//console.log(fs.readFileSync('shopifyData', 'utf8'));
const client = ShopifyBuy.buildClient({
    apiKey: 'f433b939b151eb13939281a30b9db245',
    appId: '6',
    domain: '3d-printers-portal.myshopify.com'
});

client.fetchAllProducts()
    .then(function(products){
        //console.log(products);
    })
    .catch(function(){
        console.log('Request failed')
    });

$(document).ready(function () {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://api.thingiverse.com/popular/",
        headers: {
            "Authorization": "Bearer 33c4a53f6f6244c03008cf5f40e6e109"
       },
        success: function(data){
            //var divs = $("#splashProducts").find("#cover-image");
            var divs = $('.cover-image'), theData = data, theDiv;
            for(var i = 0; i < divs.length; i++){
                theDiv = $(divs[i]);
                theDiv.attr("id", theData[i].id);
                theDiv.find(".text-overlay").text(theData[i].name);
                drawPicture(i, theData, divs);
            }
        }
    });

$(".cover-image").on("click", function() {
        var e = $(this).attr("id");
        client.fetchProduct(e)
            .then(function (product) {
                console.log(product);
            })
            .catch(function () {
                console.log('Request failed');
                var productA = new Product("A","B","C","D","E");
                console.log(productA);
            });
    });
    //console.log($("#splashProducts").toArray().each);
});

function Product(title, body_html, vendor, product_type, images){
  this.name = title;
  this.__html = body_html;
  this.vendor = vendor;
  this.type = product_type;
  this.images = images;
};


var addProduct = function(id){

};

function drawPicture(divIndex, data, divsToChange){
    $.ajax({
        type: "GET",
        dataType: "json",
        url: data[divIndex].url + "images",
        headers: {
            "Authorization": "Bearer 33c4a53f6f6244c03008cf5f40e6e109"
        },
        success: function(imageData){
            $(divsToChange[divIndex]).css('background-image', 'url(\'' + imageData.default_image.url + '\')');
        }
    });
};

client.fetchProduct('7785801291').then(function(product) {
    //console.log(product);

});

$(function() {
    //$('#product').attr("src", "https://cdn.shopify.com/s/files/1/1611/1523/products/download.jpg?v=1479611304");
});
