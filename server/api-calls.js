var https = require('https');

var options = {
    host: 'api.thingiverse.com',
    path: '/popular/',
    method: 'GET',
    headers: {
        "Authorization": "Bearer 33c4a53f6f6244c03008cf5f40e6e109"
    }
};

https.get(options, (res) => {

    const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` + `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` + `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.log(error.message);
        // consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        var val;
        try {
            val = JSON.parse(rawData);
        } catch (e) {
            console.log(e.message);
        }
    });
}).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
});
