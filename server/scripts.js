$(function() {
    // GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.products.products.forEach(function(product) {

                });
            }
        });
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createInput = $('#create-input');

        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: function(response) {
                console.log(response);

            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {


        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);

            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function() {

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
            }
        });
    });
});
