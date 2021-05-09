//Helps run the Python code

// Establish dependencies
var NodeHelper = require("node_helper");     
const {PythonShell} = require("python-shell");

// Creates a NodeHelper to run Python code within MagicMirror module
module.exports = NodeHelper.create({
    // Start function logs event to console
    start:function(){
            console.log("Starting module: " + this.name);
    },

    // socketNotificationReceived handles the requests made from face-rec-module.js
    socketNotificationReceived: function(notification, payload) {
            // If "GET NAME" request is received, run the getName() function.
    		if (notification === 'GET NAME') {
    			console.log('Initial name request received.');
    			this.getName();
    		};
    	},


    // The getName function returns the identity of user via webcam.
    // If no known face is detected, the fingerprint scanner will activate.
    // Returns a string status. 
    getName: function() {
        const self = this;
        const fileName = 'RecognizeUser.py';  //The file that we want to run
        console.log('Running ' + fileName);   // Log event
                
        
        //Create new PythonShell, use that to run the file
        //Note: This step takes a long time- Could be optimized?
        let pyShell = new PythonShell(fileName, {scriptPath: 'modules/face-rec-module/python'});
        console.log('Creating new pyShell');
        
        // start input stream
        pyShell.on('message', function (message) {
                // If the python script returns a string, return that value to face-rec-module.js as message
                if (typeof(message) == 'string') {
                    console.log('got name');
                    self.sendSocketNotification('NAME', message);   // Here, 'NAME' is the notification sent and message is the returned string.
                }
                // Else log event to console
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
