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
  MEASUREMENT_ID,
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
      measurementId: MEASUREMENT_ID,
    };

    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

    this.fire = firebase.firestore();

    // Initialize Firebase Auth
    this.auth = firebase.auth();
  }

  getStudentName(uid) {
    return new Promise((resolve, reject) => {
      let student = firebase
        .firestore()
        .collection("students")
        .doc(uid)
        .get()
        .then((val) => {
          let studentName = val.data().name;
          resolve(studentName);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  getMentorName(uid) {
    return new Promise((resolve, reject) => {
      let mentor = firebase
        .firestore()
        .collection("mentors")
        .doc(uid)
        .get()
        .then((snapshot) => {
          let data = snapshot;
          let mentorData = data["dm"]["proto"]["fields"];
          let name = mentorData["name"]["stringValue"];
          resolve(name);
        })
        .catch((error) => {
          reject("Could not retrieve Mentor Name by Id", error);
        });
    });
  }

  getRecipientName(recipientID) {
    return new Promise((resolve, reject) => {
      let status = this.determineStudentOrMentor(recipientID)
        .then((val) => {
          if (val === "Student") {
            resolve(this.getStudentName(recipientID));
          } else if (val === "Mentor") {
            resolve(this.getMentorName(recipientID));
          }
        })
        .catch((error) => {
          console.log("unable to determine user's status");
          reject(error);
        });
    });
    // determine if the user is a student or a mentor
  }

  determineStudentOrMentor(id) {
    return new Promise((resolve, reject) => {
      console.log(id);
      firebase
        .firestore()
        .collection("mentors")
        .doc(id)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {
            console.log("Mentor");
            resolve("Mentor");
          } else {
            console.log("student");
            resolve("Student");
          }
        })
        .catch((error) => {
          console.log("error determinning student or mentor");
          resolve(error);
        });
    });
  }

  getMentorWithID(uid) {
    return new Promise((resolve, reject) => {
      let user = firebase
        .firestore()
        .collection("mentors")
        .doc(uid)
        .get()
        .then((snapshot) => {
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
            students: students,
          };
          resolve(mentor);
        })
        .catch((error) => {
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
        .then((snapshot) => {
          let data = snapshot;

          // grab all of the student data
          let studentData = data["dm"]["proto"]["fields"];
          // parse through this data

          let mentorId = studentData["mentorId"]["stringValue"];

          // retrieve mentor name by their id

          let mentorName = this.getMentorName(mentorId);
          mentorName
            .then((val) => {
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
                mentorName: val,
              };
              resolve(student);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  fetchMentors() {
    return new Promise((resolve, reject) => {
      let jsonData = { mentors: [] };
      let getData = firebase
        .firestore()
        .collection("mentors")
        .get()
        .then((snapshot) => {
          let data = snapshot.docs;

          for (let i = 0; i < data.length; i++) {
            let idArray = data[i]["dm"]["proto"]["name"].split("/");
            let id = idArray[idArray.length - 1];
            let mentorData = data[i]["dm"]["proto"]["fields"];

            // parsing the research areas
            let researchAreas = [];

            for (
              let i = 0;
              i < mentorData["researchAreas"]["arrayValue"]["values"].length;
              i++
            ) {
              researchAreas.push(
                mentorData["researchAreas"]["arrayValue"]["values"][i][
                  "stringValue"
                ]
              );
            }

            let pushData = {
              id: id,
              name: mentorData.name.stringValue,
              job: mentorData.job.stringValue,
              email: mentorData.email.stringValue,
              researchArea: researchAreas.join(","),
            };

            jsonData["mentors"].push(pushData);
            resolve(jsonData["mentors"]);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  signInUserWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((cred) => {
          resolve(cred);
        })
        .catch((error) => {
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
        .catch((error) => {
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
        .then(async (cred) => {
          // get the chat id
          let chatID = this.getChatRoom(cred.user.uid, mentorId);
          await firebase
            .firestore()
            .collection("students")
            .doc(cred.user.uid)
            .set({
              name: name,
              skillLevel: researchSkill,
              researchAreas: researchInterests,
              mentorId: mentorId,
              chatRooms: firebase.firestore.FieldValue.arrayUnion(chatID),
            });
          // create the chat room
          this.createChatRoom(cred.user.uid, mentorId);

          firebase
            .firestore()
            .collection("mentors")
            .doc(mentorId)
            .update({
              students: firebase.firestore.FieldValue.arrayUnion(cred.user.uid),
            });
          resolve(cred);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // MESSAGE SENDING

  getChatRoom(senderID, recipientID) {
    const comparison = senderID.localeCompare(recipientID);
    if (comparison === -1) {
      return senderID + "-" + recipientID;
    } else if (comparison === 0) {
      return recipientID + "-" + comparisonID;
    } else {
      return recipientID + "-" + senderID;
    }
  }

  getUsersChatRooms(userID) {
    return new Promise((resolve, reject) => {
      // handle situation to determine whether the student or the mentor is asking for chat rooms
      firebase
        .firestore()
        .collection("students")
        .doc(userID)
        .get()
        .then((snapshot) => {
          let chatRooms = snapshot.data().chatRooms;
          resolve(chatRooms);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  createChatRoom(senderID, recipientID) {
    let chatID = this.getChatRoom(senderID, recipientID);
    let chat = firebase.firestore().collection("chats").doc(chatID);
    chat
      .set({
        lastMessage: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        chat.collection("messages").add();
      })
      .catch((error) => {
        console.log("unable to create chat room");
      });
  }

  lastMessageSent(senderID, recipientID) {
    return new Promise((resolve, reject) => {
      let chatId = this.getChatRoom(senderID, recipientID);
      let recipientName = this.getRecipientName(recipientID)
        .then((val) => {
          let status = val;
          firebase
            .firestore()
            .collection("chats")
            .doc(chatId)
            .get()
            .then((snapshot) => {
              let lastMessage = snapshot.data().lastMessage;
              let timeStamp = snapshot.data().timestamp;
              timeStamp = new Date(timeStamp);
              let data = {
                lastMessage,
                status,
                timeStamp,
                recipientID,
              };
              resolve(data);
            })
            .catch((error) => {
              console.log("Chat Room Does Not Exist");
              reject(error);
            });
        })
        .catch((error) => {
          console.log("user id not linked to a mentor or a student");
          reject(error);
        });
    });
  }

  sendMessage(messages, senderID, recipientID) {
    return new Promise((resolve, reject) => {
      let chatID = this.getChatRoom(senderID, recipientID);
      let message = {};
      for (let i = 0; i < messages.length; i++) {
        const { text, user } = messages[i];
        user = user._id;
        message = {
          text,
          user,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        };
      }

      // update the last message and timestamp then send the message

      firebase
        .firestore()
        .collection("chats")
        .doc(chatID)
        .set({
          lastMessage: message.text,
          timestamp: message.timestamp,
        })
        .then(() => {
          firebase
            .firestore()
            .collection("chats")
            .doc(chatID)
            .collection("messages")
            .add({
              from: message.user,
              text: message.text,
              time: message.timestamp,
            })
            .then(() => {
              resolve("Successful");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("Unable to set last message and timestamp");
          reject(error);
        });
    });
  }

  getMessages(senderID, recipientID) {
    // get chat room
    let chatID = this.getChatRoom(senderID, recipientID);

    firebase
      .firestore()
      .collection("chats")
      .doc(chatID)
      .collection("messages")
      .onSnapshot((snapshot) => {
        let parse = [];
        snapshot.forEach((doc) => {
          parse.push({
            _id: doc.id,
            text: doc.data().text,
            time: new Date(doc.data().time),
            user: { _id: doc.data().from },
          });
          console.log(parse.time);
        });

        return parse;
      });
  }
}

export default DatabaseService;
