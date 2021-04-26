/* Magic Mirror
* Module: face-rec-module
*
* By Lynn Yip, Alex Martinez, & Nicholas Balch
* For CIS11B, Montgomery County Community College
*/


Module.register("face-rec-module", {
	// anything here in defaults will be added to the config data
	// and replaced if the same thing is provided in config
	defaults: {
		userName: "Unknown",
	},

	// socket notification received handler
	socketNotificationReceived: function(notification, payload) {
		if (notification === "NAME") {
			console.log("Name notification received");
			this.userName = payload;
			console.log("New name written " + payload);
			this.updateDom();
			}
		else {
			console.log("Name notification NOT received");
			}
		},
		
	start: function(){
		console.log(this.name + " is starting!");
		this.sendSocketNotification("GET NAME", "initial");

	},


	// only called if the module header was configured in module config in config.js
	getHeader: function() {
		return "Hello, CIS111B";
	},


	// this is the major worker of the module, it provides the displayable content for this module
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
