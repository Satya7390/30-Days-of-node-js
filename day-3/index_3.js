const cp = require('child_process');


function executeCommand(command){
    cp.exec(command,function(err,data){
        if(err){
            console.log(err);
            return;
        }
        console.log(data);
    });
}

executeCommand('echo File1.txt');
executeCommand('echo File2.txt');
executeCommand('echo "Hello, Node.js!"');
