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

  getMentorName(uid) {
    return new Promise((resolve, reject) => {
      let mentor = firebase
        .firestore()
        .collection("mentors")
        .doc(uid)
        .get()
        .then(snapshot => {
          let data = snapshot;
          let mentorData = data["dm"]["proto"]["fields"];
          let name = mentorData["name"]["stringValue"];
          resolve(name);
        })
        .catch(error => {
          reject("Could not retrieve Mentor Name by Id", error);
        });
    });
  }

  filterMentorByLanguage(allMentors, englishSpeaker) {
    /*
      Gets mentors that can speak english/spanish or just spanish depending on the param value
      param englishSpeaker- boolean value (student is comfortable speaking english)
    */

    if (englishSpeaker) {
      return allMentors;
    }  else {
      // here if the student is only comfortable with spanish, in this case we filter mentors that can 
      return allMentors.filter(function(mentor) {
          return mentor.languages.includes("spanish");
      });
    }
  }

  filterMentorByReasearchAreas(allMentors, researchAreas) {
    /*
      Gets mentors that have the given research areas
      param researchAreas- array of string research areas 
    */
    let a = allMentors.filter(function(mentor) {
      for (let i=0; i< researchAreas.length; i++) {
        if ( researchAreas[i] && mentor.researchArea.includes(researchAreas[i])) {
          return true;
        }  
      } return false;
    });
    return a;
  }

  filterMentorByReasearchExp(allMentors, level) {
    /*
      Gets mentors that have the given research levels/experience
      param level-  String (can be Beginner, Intermediate, Experienced)! 
    */
    let researchLevel = allMentors.filter(function(mentor) {
      if (level == "Intermediate" || level == "Experienced") {
          return mentor.researchLevel === "Intermediate" ||  mentor.researchLevel === "Experienced";
      } return mentor.researchLevel === level;
    });
    return researchLevel;
  }
  

  async getCuratedMentors(englishSpeaker, researchAreas, researchLevel) {
    const allMentors = await this.fetchAllMentors();
    let language = this.filterMentorByLanguage(allMentors, englishSpeaker);
    let levels = this.filterMentorByReasearchExp(allMentors, researchLevel);
    let interests = this.filterMentorByReasearchAreas(allMentors, researchAreas);

    let firstFilter = language.filter(val => levels.includes(val));
    let secFilter = firstFilter.filter(val => interests.includes(val));
    if (secFilter.length == 0) {
      return firstFilter.slice(0, 3);
    } else {
      return secFilter.slice(0, 3);
    }
  }

  getMentorWithID(uid) {
    return new Promise((resolve, reject) => {
      let user = firebase
        .firestore()
        .collection("mentors")
        .doc(uid)
        .get()
        .then(snapshot => {
          let data = snapshot;
          // grab all of the mentor data
          let mentorData = data["dm"]["proto"]["fields"];

          // parse through this data

          let email = mentorData["email"]["stringValue"];
          let job = mentorData["job"]["stringValue"];
          let location = mentorData["location"]["geoPointValue"];
          let name = mentorData["name"]["stringValue"];
          let researchObject =
            mentorData["researchAreas"]["arrayValue"]["values"];
          let researchAreas = [];
          for (let i = 0; i < researchObject.length; i++) {
            researchAreas.push(researchObject[i]["stringValue"]);
          }

          let studentObject = mentorData["students"]["arrayValue"]["values"];
          let students = [];
          for (let j = 0; j < studentObject.length; j++) {
            students.push(studentObject[j]["stringValue"]);
          }

          let mentor = {
            name: name,
            email: email,
            location: location,
            job: job,
            researchAreas: researchAreas,
            students: students
          };
          resolve(mentor);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getStudentWithID(uid) {
    return new Promise((resolve, reject) => {
      let user = firebase
        .firestore()
        .collection("students")
        .doc(uid)
        .get()
        .then(snapshot => {
          let data = snapshot;

          // grab all of the student data
          let studentData = data["dm"]["proto"]["fields"];
          // parse through this data

          let mentorId = studentData["mentorId"]["stringValue"];

          // retrieve mentor name by their id

          let mentorName = this.getMentorName(mentorId);
          mentorName
            .then(val => {
              let name = studentData["name"]["stringValue"];
              let researchObject =
                studentData["researchAreas"]["arrayValue"]["values"];
              let researchAreas = [];
              for (let i = 0; i < researchObject.length; i++) {
                researchAreas.push(researchObject[i]["stringValue"]);
              }
              let skillLevel = studentData["skillLevel"]["stringValue"];

              let student = {
                id: uid,
                name: name,
                researchAreas: researchAreas,
                skillLevel: skillLevel,
                mentorId: mentorId,
                mentorName: val
              };
              resolve(student);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  parseArrayFields(data, field) {
    let parsedField = [];
    let vals = data[field]["arrayValue"]["values"];

    for (
      let i = 0;
      i < vals.length;
      i++
    ) {
      parsedField.push(vals[i]["stringValue"]);
    }
    return parsedField;
  }

  fetchAllMentors() {
    return new Promise((resolve, reject) => {
      let jsonData = { "mentors": [] };
      let getData = firebase
        .firestore()
        .collection("mentors")
        .get()
        .then(snapshot => {
          let data = snapshot.docs;

          for (let i = 0; i < data.length; i++) {
            let idArray = data[i]["dm"]["proto"]["name"].split("/");
            let id = idArray[idArray.length - 1];
            let mentorData = data[i]["dm"]["proto"]["fields"];

            let pushData = {
              id: id,
              name: mentorData.name.stringValue,
              job: mentorData.job.stringValue,
              email: mentorData.email.stringValue,
              researchArea: this.parseArrayFields(mentorData, "researchAreas"),
              researchLevel: mentorData.researchLevel.stringValue,
              languages: this.parseArrayFields(mentorData, "languages")
            };

            jsonData["mentors"].push(pushData);
            resolve(jsonData["mentors"]);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  signInUserWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then(cred => {
          resolve(cred);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  signOutUser() {
    return new Promise((resolve, reject) => {
      this.auth
        .signOut()
        .then(() => {
          resolve("Succesfully Sign Out");
        })
        .catch(error => {
          reject("Unsuccessful Sign Out", error);
        });
    });
  }

  signUpUserWithEmail(
    email,
    password,
    name,
    researchSkill,
    researchInterests,
    mentorName,
    mentorId
  ) {
    return new Promise((resolve, reject) => {
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
              students: firebase.firestore.FieldValue.arrayUnion(cred.user.uid)
            });
          resolve(cred);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default DatabaseService;
