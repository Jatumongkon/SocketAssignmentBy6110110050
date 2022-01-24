var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;
var my_key = 'aaa'

let num = 0
let state = 0 //idle 
var client = new net.Socket();

client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write('start');
    
});
    client.on('data', function(data) {
        console.log('รับ :' + data);
        if (data == 'start!' && state ==0){
            console.log('ส่ง key : ' + my_key);
            client.write(`${my_key}`);
            state = 1
        }
        if (data != 'start!' && state == 1){
            num = parseInt(data) + 3

            if(data != NaN)
                console.log('ส่ง : ' + num);
            client.write(`${num}`);

        }
        if (data == 'BYE' && state == 1){
            client.destroy();
            console.log('รับ : ' + data);
            state = 2 // End
        }
        if(data == 'INVALID'&& state == 1){
            console.log('INVALID');
            client.destroy();
            state = 2 // End
        }
        if (data == 'NaN' && state == 1){
            console.log('Server turn off ');
            client.destroy();
            state = 2 // End
        }       
        if (data == 'NotKey' && state == 1){
            console.log('Sorry !!');
            client.destroy();
            state = 2 // End
        }
    });


    client.on('close', function() {
        console.log('Connection closed');
        client.destroy();
    });