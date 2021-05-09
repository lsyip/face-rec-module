# Import necessary modules
import face_recognition # Facial Recognition API
import picamera    # PiCamera module
import numpy as np
import busio
from digitalio import DigitalInOut, Direction
import RPi.GPIO as GPIO    # Needed for controlling GPIO Pins
import adafruit_fingerprint

################################################################################

# The get_fingerprint() method waits for a fingerprint to be recognized on the scanner and returns
# a boolean True if a fingerprint has a match, False if not. 
def get_fingerprint():
    """Get a fingerprint image, template it, and see if it matches!"""
    print("Waiting for image...")
    while finger.get_image() != adafruit_fingerprint.OK:
        pass
    
    # Tries to convert scanning finger to template, if fails return false
    print("Templating...")
    if finger.image_2_tz(1) != adafruit_fingerprint.OK:
        return False
    
    # Searches if print is stored, returns false if not in system
    print("Searching...")
    if finger.finger_search() != adafruit_fingerprint.OK:
        return False
    
    return True

# Create a reference to the camera
camera = picamera.PiCamera()
camera.resolution = (352, 240)    # Define the camera resolution
output = np.empty((240, 352, 3), dtype=np.uint8) # Creates an array  of given dimensions

# Load the picture of the user.
userImage = face_recognition.load_image_file("/home/pi/MagicMirror/modules/face-rec-module/python/images/lynn_yip.jpg")
userFaceEncoding = face_recognition.face_encodings(userImage)[0]

# Create a reference to the fingerprint scanner
import serial
uart = serial.Serial("/dev/ttyUSB0", baudrate = 57600, timeout = 1)
finger = adafruit_fingerprint.Adafruit_Fingerprint(uart)

# Specify GPIO PIN numbering mode & disable warnings
#GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)

# Set up the pin being used for activating solenoid
GPIO.setup(7, GPIO.OUT, initial = GPIO.LOW)

# Initialize 2 lists for storing face details and encodings
faceLocations = []
faceEncodings = []

# Get a picture of the user currently in front of the mirror
camera.capture(output, format = "rgb")

# Define the face and face encoding in the current frame
faceLocations = face_recognition.face_locations(output)

# If you can't read the face, notify the user
if(len(faceLocations) == 0):
    print("No Face Detected")

# Encode the face found in frame
faceEncodings = face_recognition.face_encodings(output, faceLocations)

# compare the current user face encoding with the user encoding in the database
for faceEncoding in faceEncodings:
    match = face_recognition.compare_faces([userFaceEncoding], faceEncoding)
    name = ""

    """
    Validate that the user is in the frame and grant access to the compartment
    If it's not the correct user, validate identity through fingerprint
    scanner, otherwise, deny access.
    """
    if match[0]:
        print("Access Granted. \nHello Alex!")
        GPIO.output(7, GPIO.HIGH)
    else:
        print("Access Denied.\nPlease Validate Fingerprint.")
        if(get_fingerprint()):
            print("Access Granted. \nHello Alex!")
            GPIO.output(7, GPIO.HIGH)
        else:
            print("Access Denied")
            exit(0)
        


        
        
        

    


