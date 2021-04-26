# Module setup of user profiles to recognize
# Code structure from ageitgey: https://github.com/ageitgey/face_recognition/blob/master/examples/facerec_from_webcam_faster.py

import face_recognition
import cv2
import numpy as np

#TODO: Make it return the user's name, feed that into the MagicMirror display

# Get reference to first available webcam (0), the default
webcam = cv2.VideoCapture(0)

# Load user pictures and encode it
obama = face_recognition.load_image_file("python/images/barack_obama.jpg")
obama_encoding = face_recognition.face_encodings(obama)[0]
lynn = face_recognition.load_image_file("python/images/lynn_yip.jpg")
lynn_encoding = face_recognition.face_encodings(lynn)[0]

# Array of known encodings and names
known_encodings = [obama_encoding, lynn_encoding]
known_names = ["Barack Obama", "Lynn Yip"]

#def identify(self):
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

while True:   #infinite loop runs the webcam (replace with session timer)
    # Get single frame of video
    ret, frame = webcam.read()

    # Resize for faster processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)


    # Convert BGR (OpenCV) color to RGB (face_recognition)
    rgb_small_frame = small_frame[:, :, ::-1]

    # Process every other frame to save time (TODO: could be optimized?)
    if process_this_frame:
        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_encodings, face_encoding)
            name = "Unknown"

        # # If a match was found in known_face_encodings, just use the first one.
        # if True in matches:
        #     first_match_index = matches.index(True)
        #     name = known_face_names[first_match_index]

            # Or instead, use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(known_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)   #numpy argmin() method returns index of min values
            if matches[best_match_index]:
                name = known_names[best_match_index]

            face_names.append(name)
            print(name)

        process_this_frame = not process_this_frame

    # Release handle to the webcam
    webcam.release()
    cv2.destroyAllWindows()

