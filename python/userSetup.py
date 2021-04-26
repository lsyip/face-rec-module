# Import necessary modules
import face_recognition

imagePaths = ["images/lynn_yip.jpg"]
faceEncodings = []
userImages = []


# Load the picture of the user and learn to recognize it
def loadImages():
    for path in imagePaths:
        userImages.append(face_recognition.load_image_file(path))
    return userImages


def getEncodings():
    for image in userImages:
        faceEncodings.append(face_recognition.face_encodings(image)[0])
    return faceEncodings
