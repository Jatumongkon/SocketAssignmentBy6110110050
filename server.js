var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var key_list = ['aaa','bbb']
var is_client_key = false


net.createServer(function (sock) {
    var state = 0 //idle 
    
    sock.on('data', function (data) {
        if(data == 'start' && state == 0){
            console.log('รับ: ' + data);
            sock.write('start!') //
            state = 1 //wait data
            }
        if(state == 1){
            for (let i = 0 ;i < key_list.length ; i+=1){
                if(key_list[i] == data){
                    console.log('รับ key : ' + data);
                    sock.write(`${0}`)
                    is_client_key = true
                    state = 2 
                }
                
            }
            
        }
        
        if(parseInt(data) < 10 &&state ==2){
            console.log('รับ ' +`${data*2}`)
            sock.write(`${data*2}`)                     
        }
        else if(parseInt(data) > 10 &&state ==2){
            console.log('BYE')
            sock.write('BYE');
        }
        else if(data != 'start' &&state ==2 && data != 'NaN' && !is_client_key){
            console.log('INVALID');
            sock.write('INVALID');
        }
        else if(!is_client_key && state != 1){
            console.log('Key not in list ');
            sock.write('NotKey');
            state = 3 //End
        }

    });
    
}).listen(PORT, HOST);