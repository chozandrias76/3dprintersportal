var jQuery = require("./node_modules/jquery/dist/jquery.js");

$(document).ready(function() {
    // var x = $(location).attr('<property>');
    var extract;
    if(location.search.match(/\?(.*)\&/))
      extract = location.search.match(/\?(.*)\&/).pop();
      else extract =location.search.match(/\?(.*)/).pop();
    //console.log(extract);

    var productsInCategory;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://api.thingiverse.com/categories/" + extract + "/things",
        headers: {
            "Authorization": "Bearer 33c4a53f6f6244c03008cf5f40e6e109"
        },
        success: function(data) {
            productsInCategory = data;
            var index = 0,
                row = 0;
            productsInCategory.forEach(elem => {
                var biggerImgUrl = elem.thumbnail;

                if (biggerImgUrl.indexOf("_thumb_medium.jpg") != -1) {
                    biggerImgUrl = biggerImgUrl.replace("_thumb_medium.jpg", "_preview_card.jpg");
                }
                if (biggerImgUrl.indexOf("_thumb_medium.JPG") != -1) {
                    console.log(`Wut: ${row} , ${index}`);
                    biggerImgUrl = biggerImgUrl.replace("_thumb_medium.JPG", "_preview_card.JPG");
                }
                if (biggerImgUrl.indexOf("Gears_preview_card.jpg") != -1) {
                    console.log(`Row: ${row} , Index: ${index}`);

                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url: "https://api.thingiverse.com/things/" + elem.id,
                        headers: {
                            "Authorization": "Bearer 33c4a53f6f6244c03008cf5f40e6e109"
                        },
                        success: function(data) {
                            if (data)
                                console.log(data.default_image.sizes);
                            data.default_image.sizes.forEach(imageType => {
                                if (imageType.type == "preview" && imageType.size == "card") {
                                    biggerImgUrl = imageType.url;
                                }
                            });
                        }
                    });
                }

                switch (index) {
                    case 0:
                        $("#products-container").append(`
                <div class="row" id="row-${row}">
                  <div class="col-md-4 product-container">
                  <img src="${encodeURI(biggerImgUrl)}" class = "product-img">
                  </div>`);
                        index++;
                        break;
                    case 1:
                        $("#products-container").find(`#row-${row}`).append(`<div class="col-md-4 product-container">
                <img src="${encodeURI(biggerImgUrl)}" class = "product-img">
                </div>`);
                        index++;
                        break;
                    case 2:
                        $("#products-container").find(`#row-${row}`).append(`<div class="col-md-4 product-container">
                  <img src="${encodeURI(biggerImgUrl)}" class = "product-img"></div>
                  </div>`);
                        index = 0;
                        row++;
                        break;
                    default:
                        break;
                }
            });
        }
    });
    // $("#products-container").append(`
    // <div class="row">
    // <div class="col-md-4">.col-md-4</div>
    // <div class="col-md-4">.col-md-4</div>
    // <div class="col-md-4">.col-md-4</div>
    // </div>
    // `);

});
