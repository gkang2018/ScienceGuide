import firebase from "firebase";
import "@firebase/firestore";
import "firebase/auth";

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} from "react-native-dotenv";

class DatabaseService {
  constructor() {
    let firebaseConfig = {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      databaseURL: DATABASE_URL,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
      appId: APP_ID,
      measurementId: MEASUREMENT_ID
    };

    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    // Initialize Firebase Auth
    this.auth = firebase.auth();
  }

  fetchMentors() {
    return new Promise((resolve, reject) => {
      let jsonData = { mentors: [] };
      let getData = firebase
        .firestore()
        .collection("mentors")
        .get()
        .then(snapshot => {
          let data = snapshot.docs;

          for (let i = 0; i < data.length; i++) {
            let mentorData = data[i]["dm"]["proto"]["fields"];

            // parsing the research areas
            let researchAreas = [];

            for (
              let i = 0;
              i < mentorData["researchArea"]["arrayValue"]["values"].length;
              i++
            ) {
              researchAreas.push(
                mentorData["researchArea"]["arrayValue"]["values"][i][
                  "stringValue"
                ]
              );
            }

            let pushData = {
              name: mentorData.name.stringValue,
              email: mentorData.email.stringValue,
              researchArea: researchAreas.join(", ")
            };

            jsonData["mentors"].push(pushData);
            resolve(jsonData["mentors"]);
          }
        });
    });
  }

  signUpUserWithEmail(
    email,
    password,
    name,
    researchSkill,
    researchInterests,
    mentorName
  ) {
    return new Promise((resolve, reject) => {
      let mentorId = "";

      let mentor = firebase
        .firestore()
        .collection("mentors")
        .where("name", "==", mentorName)
        .get()
        .then(snapshot => {
          let data = snapshot.docs;
          let segments = data[0]["dm"]["key"]["path"]["segments"];
          mentorId = segments[segments.length - 1];

          this.auth
            .createUserWithEmailAndPassword(email, password)
            .then(async cred => {
              await firebase
                .firestore()
                .collection("students")
                .doc(cred.user.uid)
                .set({
                  name: name,
                  skillLevel: researchSkill,
                  researchAreas: researchInterests,
                  mentorId: mentorId
                });
              firebase
                .firestore()
                .collection("mentors")
                .doc(mentorId)
                .update({
                  students: firebase.firestore.FieldValue.arrayUnion(
                    cred.user.uid
                  )
                });
              resolve(cred);
            })
            .catch(error => {
              console.log(error);
            })
            .catch(error => {
              console.log(error);
            });
        });
    });
    // first we need to retrieve the mentor from the mentor name
  }
}

export default DatabaseService;
