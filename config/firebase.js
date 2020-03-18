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

    this.firstName = "";
    // Initialize Firebase

    firebase.initializeApp(firebaseConfig);
  }
  getAllMentors = () => {
    firebase
      .firestore()
      .collection("mentors")
      .doc("PYt0gxrJgGatLLU9k28x")
      .get()
      .then(doc => {
        if (doc.exists) {
          let parse = this.dataParse(doc.data());
          console.log(parse);
        } else {
          console.log("no such document");
        }
      })
      .catch(error => {
        console.log("Error getting document", error);
      });
  };

  dataParse = data => {
    let parsedObj = {
      firstName: data.firstName,
      lastName: data.lastName
    };
    return parsedObj;
  };
}

export default DatabaseService;
