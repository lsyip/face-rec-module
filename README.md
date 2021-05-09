# face-rec-module
Team Members: Alex Martinez, Nicholas Balch, and Lynn Yip

Final Project for CIS111B, Spring 2021

[Video Demo](https://youtu.be/1X5kIvcxsyU)


## What it does: 
A smart mirror module that identifies the current user through both facial and fingerprint recognition. If the user is authorized, the mirror will display their name on the screen. 

## Hardware:
For this project we used 3 main pieces of technology: Raspberry Pi 3 B+, Optical Fingerprint Scanner, and a Raspberry Pi camera module. We chose the Raspberry Pi 3 because it was in our price range and it was compatible with the fingerprint scanner and the camera. It also had the right ports to put a locking mechanism in the project. The specific fingerprint scanner was the DIYmall Optical Fingerprint Reader Sensor Module for ArDuino 2560 R3 Raspberry Pi ESP8266 ESP32 51 AVR STM32 Red Light DC 3.8-7V. This was chosen because it had the fastest shipping time and connecting it to the Pi was simple. Also its code was the simplest to work with and had good documentation.  We went with the Raspberry Pi camera module because it was made for the Pi and setting it up was easy and straightforward. 

## Software:
For the facial recognition code, we used the face_recognition Python API from ageitgey on Github. This API gave us access to the methods needed to encode and recognize faces without having to train our own model. For fingerprinting, we used the adafruit_fingerprint API because it was compatible with the scanner we purchased. The main python file RecognizeUser.py uses both of these libraries to verify the user’s identity and return a name if it is known.
We used the open source MagicMirror platform as the base to build our recognition module from. Using node.js, we ran the python script through the node_helper.js file and sent the returned name or result to the mirror display with the face-rec-module.js file. The code was structured this way in order to communicate with the already existing MagicMirror software and run our own python code. 

## Installation:
1. Install dependencies:
Picamera, face_recognition, adafruit_fingerprint, nodejs, and python-shell
2. Install the [MagicMirror](https://github.com/MichMich/MagicMirror) base module. 
3. Clone the face-rec-module repository into the MagicMirror/modules directory:
  `git clone https://github.com/lsyip/face-rec-module.git`
4. Add user images to the python/images folder.
5. Add the module to config.js. Sample below:
```
{
		Module: “face-rec-module”,
		Position: “bottom_left”,
},
```
6. Run the smart mirror: `npm start`

## Challenges and What We Learned:
One of the main challenges was making the connections between the existing MagicMirror software and our own module without any experience with node.js and very little with python. The solution for this was to take the time to study a lot of other third-party modules to try and understand how they did this. We also faced some challenges with the hardware aspect of the project, specifically with the circuitry needed to activate the locking mechanism which we were unable to finalize, in addition to doing ample enough research on all the hardware that would be necessary for the fingerprint scanner to properly connect to our Raspberry Pi. 

In the end, we learned that a lot can be accomplished if we just put in the time to figure things out. 
	
## Accomplishments We’re Proud of:
   * Building our own module that uses facial recognition and fingerprinting.
   * Learning several new technologies in a short period of time: Javascript, Python, Raspberry Pi, command line commands, basic hardware assembly, and minor electronics circuitry. 

## What’s Next for our Smart Mirror Module:
   * Connecting a solenoid to secure a medicine cabinet door.
   * Session timers so the mirror won’t have to be restarted to rerun the recognition code.
   * Realtime setup so images and fingerprints don’t have to be manually uploaded.
   * Voice recognition to set up a keyword to initiate the python code once the user wants access to the secret compartment. 
