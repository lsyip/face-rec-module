//Helps run the Python code

var NodeHelper = require("node_helper");
const {PythonShell} = require("python-shell");

module.exports = NodeHelper.create({
    start:function(){
            console.log("Starting module: " + this.name);
    },

    //sendSocketNotification processes request
    socketNotificationReceived: function(notification, payload) {
    		if (notification === 'GET NAME') {
    			console.log('Initial name request received.');
    			this.getName();
    		};
    	},


    // Returns identity of user via webcam
    getName: function() {
        const self = this;
        const fileName = 'RecognizeUser.py';  //The file that we want to run
        console.log('Running ' + fileName);   // Log event
                
        
        //Create new PythonShell, use that to run the file
        //Note: This step takes a long time- Could be optimized?
        let pyShell = new PythonShell(fileName, {scriptPath: 'modules/face-rec-module/python'});
        console.log('Creating new pyShell');
        
        //start input stream
        pyShell.on('message', function (message) {
                if (typeof(message) == 'string') {
                    console.log('got name');
                    self.sendSocketNotification('NAME', message);
                }
                else {
                        console.log('didnt get name');
                        }
        });

        //end input stream, allow process to exit
        pyShell.end(function (err) {
                if (err) throw err;
                self.sendSocketNotification('UPDATE', 'Finished getting name');
                console.log('Finished getting name');
        });
    },
});
