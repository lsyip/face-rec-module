/* Magic Mirror
* Module: face-rec-module
*
* By Lynn Yip, Alex Martinez, & Nicholas Balch
* For CIS11B, Montgomery County Community College
*/


// Registers module with default values. 
Module.register("face-rec-module", {
	// anything here in defaults will be added to the config data
	// and replaced if the same thing is provided in config
	defaults: {
		userName: "Unknown",
	},

	// Handles received notifications from node_helper.js
	socketNotificationReceived: function(notification, payload) {
		// If a name is received from node_helper.js, update userName and mirror display.
		if (notification === "NAME") {
			console.log("Name notification received");
			this.userName = payload;   // payload represents the name returned from RecognizeUser.py
			console.log("New name written " + payload);
			this.updateDom();     // Updates mirror display
			}
		// Else log the event to the console
		else {
			console.log("Name notification NOT received");
			}
		},
		
	// Initiates first request to node_helper to retrieve user's name.
	start: function(){
		console.log(this.name + " is starting!");
		this.sendSocketNotification("GET NAME", "initial");   // Send "GET NAME" notification to node_helper

	},


	// only called if the module header was configured in module config in config.js
	// Displays title on top of module. 
	getHeader: function() {
		return "Hello, CIS111B";
	},


	// Displays HTML content on the mirror. 
	getDom: function() {
		var wrapper = document.createElement("div");

		// if user supplied message text in its module config, use it
		if(this.config.hasOwnProperty("userName")){
			// using text from module config block in config.js
			wrapper.innerHTML = this.userName;
		}
		else{
		// use hard coded text
			wrapper.innerHTML = "no name found D:";
		}

		// pass the created content back to MM to add to DOM.
		return wrapper;
	},

})
