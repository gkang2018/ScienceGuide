import firebase from "firebase";
import "@firebase/firestore";

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

    firebase.initializeApp(firebaseConfig);
  }


  fetchMentors() {
    return new Promise((resolve, reject) => {

        let jsonData = {"mentors" : []};
        let getData = firebase.firestore().collection("mentors").get().then((snapshot) => {
          
          let data = snapshot.docs;

          for (let i=0; i<data.length; i++) {
              let mentorData = data[i]["dm"]["proto"]["fields"];

              // parsing the research areas 
              let researchAreas = [];
              
              for (let i=0; i<mentorData["researchArea"]["arrayValue"]["values"].length; i++) {
                researchAreas.push(mentorData["researchArea"]["arrayValue"]["values"][i]["stringValue"]);
              }

              let pushData = {
                "name": mentorData.firstName.stringValue + " " + mentorData.lastName.stringValue,
                "email": mentorData.email.stringValue,
                "researchArea": researchAreas.join(", ")
              };

              jsonData["mentors"].push(pushData);
              resolve(jsonData["mentors"]);
          }
        });
      })
  }

}

export default DatabaseService;
