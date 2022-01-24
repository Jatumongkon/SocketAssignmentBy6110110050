var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;



net.createServer(function (sock) {
    var state = 0 //idle 
    
    sock.on('data', function (data) {
        if(data == 'start' && state == 0){
            console.log('รับ: ' + data);
            sock.write('start!') //
            state = 1 //wait data
            }
        
        if(parseInt(data) < 10 &&state ==1){
            console.log('รับ ' +`${data*2}`)
            sock.write(`${data*2}`)                     
        }
        else if(parseInt(data) > 10 &&state ==1){
            console.log('BYE')
            sock.write('BYE');
        }
        else if(data != 'start' &&state ==1 && data != 'NaN'){
            console.log('INVALID');
            sock.write('INVALID');
        }
        else if (data == 'NaN'){
            console.log('Client turn off ');
            state = 3 //End
        }
    });
    
}).listen(PORT, HOST);