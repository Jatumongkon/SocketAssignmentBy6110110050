

var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;


let num = 0

var client = new net.Socket();

client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write('start');
    
});
    client.on('data', function(data) {
        console.log('รับ :' + data);
        if (data == 'start!'){
            console.log('ส่ง : ' + num);
            client.write(`${num}`);}
        if (data != 'start!'){
            num = parseInt(data) + 3
            console.log('ส่ง : ' + num);
            client.write(`${num}`);}
        if (data == 'BYE'){
            console.log('รับ : ' + data);
            client.destroy();
        }
    });


    client.on('close', function() {
        console.log('Connection closed');
        client.destroy();
    });



//     client.on('data', function(data) {
//         console.log('รับ : ' + data);
//         if (data == 'start!')
//             console.log('ส่ง: ' + num);
//             client.write(`${num}`);
//         if (data != 'start!'){
//             console.log('ส่ง: ' + num);
//             num = data + 3
//             client.write(`${num}`);}
//    ;});