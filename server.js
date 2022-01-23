var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;



net.createServer(function (sock) {
    var state = 0 //idle 
    sock.on('data', function (data) {
    console.log('รับ: ' + data);
        if(data == 'start'){
            sock.write('start!')
            }
        
        if(parseInt(data) < 10){
            console.log('รับ ' +`${data*2}`)
            sock.write(`${data*2}`)                     
        }
        else if(parseInt(data) > 10){
            console.log('BYE')
                        
        }
    });
    
}).listen(PORT, HOST);
