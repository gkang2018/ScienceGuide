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
          let name = snapshot.data().name;
          resolve(name);
        })
        .catch((error) => {
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
    } else {
      // here if the student is only comfortable with spanish, in this case we filter mentors that can
      return allMentors.filter(function (mentor) {
        return mentor.languages.includes("spanish");
      });
    }
  }

  filterMentorByReasearchAreas(allMentors, researchAreas) {
    /*
      Gets mentors that have the given research areas
      param researchAreas- array of string research areas 
    */
    let a = allMentors.filter(function (mentor) {
      for (let i = 0; i < researchAreas.length; i++) {
        if (
          researchAreas[i] &&
          mentor.researchAreas.includes(researchAreas[i])
        ) {
          return true;
        }
      }
      return false;
    });
    return a;
  }

  filterMentorByReasearchExp(allMentors, level) {
    /*
      Gets mentors that have the given research levels/experience
      param level-  String (can be Beginner, Intermediate, Experienced)! 
    */
    let researchLevel = allMentors.filter(function (mentor) {
      if (level == "Intermediate" || level == "Experienced") {
        return (
          mentor.researchLevel === "Intermediate" ||
          mentor.researchLevel === "Experienced"
        );
      }
      return mentor.researchLevel === level;
    });
    return researchLevel;
  }

  async getCuratedMentors(englishSpeaker, researchAreas, researchLevel) {
    const allMentors = await this.fetchAllMentors();
    let language = this.filterMentorByLanguage(allMentors, englishSpeaker);
    let levels = this.filterMentorByReasearchExp(allMentors, researchLevel);
    let interests = this.filterMentorByReasearchAreas(
      allMentors,
      researchAreas
    );

    let firstFilter = language.filter((val) => levels.includes(val));
    let secFilter = firstFilter.filter((val) => interests.includes(val));

    if (firstFilter.length == 0) {
      return language.slice(0, 3);
    } else if (secFilter.length == 0) {
      return firstFilter.slice(0, 3);
    } else {
      return secFilter.slice(0, 3);
    }
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
          reject(error);
        });
    });
    // determine if the user is a student or a mentor
  }

  determineStudentOrMentor(id) {
    return new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("mentors")
        .doc(id)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {
            resolve("Mentor");
          } else {
            resolve("Student");
          }
        })
        .catch((error) => {
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
          // grab all of the mentor data

          // parse through this data

          let email = snapshot.data().email;
          let job = snapshot.data().job;
          let location = snapshot.data().location;
          let name = snapshot.data().name;
          let researchAreas = snapshot.data().researchAreas;

          let students = snapshot.data().students;

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
          let mentorId = snapshot.data().mentorId;

          // retrieve mentor name by their id

          let mentorName = this.getMentorName(mentorId);
          mentorName
            .then((val) => {
              let name = snapshot.data().name;

              let researchAreas = snapshot.data().researchAreas;

              let skillLevel = snapshot.data().skillLevel;

              let englishSpeaker = snapshot.data().englishSpeaker;

              let student = {
                id: uid,
                name: name,
                researchAreas: researchAreas,
                skillLevel: skillLevel,
                mentorId: mentorId,
                englishSpeaker: englishSpeaker,
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

  getUserData(id) {
    return new Promise((resolve, reject) => {
      this.determineStudentOrMentor(id)
        .then((val) => {
          if (val === "Student") {
            this.getStudentWithID(id)
              .then((student) => {
                let responseObj = {
                  id: student.id,
                  name: student.name,
                  researchAreas: student.researchAreas,
                  skillLevel: student.skillLevel,
                  englishSpeaker: student.englishSpeaker,
                  mentorId: student.mentorId,
                  mentorName: student.mentorName,
                  type: val,
                };
                resolve(responseObj);
              })
              .catch((error) => {
                reject(error);
              });
          } else if (val === "Mentor") {
            this.getMentorWithID(id)
              .then((mentor) => {
                let responseObj = {
                  id: id,
                  name: mentor.name,
                  email: mentor.email,
                  location: mentor.location,
                  job: mentor.job,
                  researchAreas: mentor.researchAreas,
                  students: mentor.students,
                  type: val,
                };
                resolve(responseObj);
              })
              .catch((error) => {
                reject(error);
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  parseArrayFields(data, field) {
    let parsedField = [];
    let vals = data[field]["arrayValue"]["values"];

    for (let i = 0; i < vals.length; i++) {
      parsedField.push(vals[i]["stringValue"]);
    }
    return parsedField;
  }

  fetchAllMentors() {
    return new Promise((resolve, reject) => {
      let jsonData = { mentors: [] };
      let getData = firebase
        .firestore()
        .collection("mentors")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let id = doc.id;

            let pushData = {
              id: id,
              name: doc.data().name,
              job: doc.data().job,
              email: doc.data().email,
              researchAreas: doc.data().researchAreas,
              researchLevel: doc.data().researchLevel,
              languages: doc.data().languages,
            };

            jsonData["mentors"].push(pushData);
            resolve(jsonData["mentors"]);
          });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateProfileInformation(user, type, changedInfo) {
    return new Promise((resolve, reject) => {
      let collection = user.type === "Mentor" ? "mentors" : "students";
      switch (type) {
        case "Name":
          firebase
            .firestore()
            .collection(collection)
            .doc(user.uid)
            .update({
              name: changedInfo,
            })
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject("Unable to change the user's name", error);
            });
          break;
        case "Interests":
          firebase
            .firestore()
            .collection(collection)
            .doc(user.uid)
            .update({
              researchAreas: changedInfo,
            })
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
      }
    });
  }

  updatePassword(user, currentPassword, newPassword, confirmPassword) {
    return new Promise((resolve, reject) => {
      let authUser = this.auth.currentUser;
      let credential = firebase.auth.EmailAuthProvider.credential(
        authUser.email,
        currentPassword
      );

      authUser
        .reauthenticateWithCredential(credential)
        .then(() => {
          authUser
            .updatePassword(newPassword)
            .then(() => {
              resolve();
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

  signInUserWithEmail(email, password) {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((cred) => {
          this.getUserData(cred.user.uid)
            .then((val) => {
              let responseVal = {
                cred: cred,
                data: val,
              };
              resolve(responseVal);
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
    englishSpeaker,
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
              englishSpeaker: englishSpeaker,
              mentorId: mentorId,
              chatRooms: firebase.firestore.FieldValue.arrayUnion(chatID),
            });

          this.createChatRoom(cred.user.uid, mentorId);
          firebase
            .firestore()
            .collection("mentors")
            .doc(mentorId)
            .update({
              chatRooms: firebase.firestore.FieldValue.arrayUnion(chatID),
              students: firebase.firestore.FieldValue.arrayUnion(cred.user.uid),
            });

          this.getRecipientName(cred.user.uid)
            .then((val) => {
              let responseVal = {
                cred: cred,
                name: val,
              };
              resolve(responseVal);
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

  // MESSAGE SENDING

  getChatRoom(senderID, recipientID) {
    const comparison = senderID.localeCompare(recipientID);
    if (comparison === -1) {
      return senderID + "-" + recipientID;
    } else if (comparison === 0) {
      return recipientID + "-" + senderID;
    } else {
      return recipientID + "-" + senderID;
    }
  }

  getUsersChatRooms(userID, type) {
    return new Promise((resolve, reject) => {
      // handle situation to determine whether the student or the mentor is asking for chat rooms
      let collection = type === "Mentor" ? "mentors" : "students";
      firebase
        .firestore()
        .collection(collection)
        .doc(userID)
        .get()
        .then((snapshot) => {
          let chatRooms = snapshot.data().chatRooms;
          resolve(chatRooms);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  createChatRoom(senderID, recipientID) {
    return new Promise((resolve, reject) => {
      let chatID = this.getChatRoom(senderID, recipientID);
      let chat = firebase.firestore().collection("chats").doc(chatID);
      chat
        .set({
          lastMessage: "",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          // chat.collection("messages").add();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  chatExists(senderID, recipientID) {
    return new Promise((resolve, reject) => {
      let chatID = this.getChatRoom(senderID, recipientID);
      firebase
        .firestore()
        .collection("chats")
        .doc(chatID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  appendChatToUser(senderID, recipientID) {
    let chatID = this.getChatRoom(senderID, recipientID);
    this.determineStudentOrMentor(senderID).then((val) => {
      let user = val;
      let recipient = user === "Mentor" ? "Student" : "Mentor";
      if (user === "Student") {
        firebase
          .firestore()
          .collection("students")
          .doc(senderID)
          .update({
            chatRooms: firebase.firestore.FieldValue.arrayUnion(chatID),
          });
        firebase
          .firestore()
          .collection("mentors")
          .doc(recipientID)
          .update({
            chatRooms: firebase.firestore.FieldValue.arrayUnion(chatID),
          });
      } else {
        firebase
          .firestore()
          .collection("mentors")
          .doc(senderID)
          .update({
            chatRooms: firebase.firestore.FieldValue.arrayUnion(chatID),
          });
        firebase
          .firestore()
          .collection("students")
          .doc(recipientID)
          .update({
            chatRooms: firebase.firestore.FieldValue.arrayUnion(chatID),
          });
      }
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
              timeStamp = timeStamp.toDate();
              let data = {
                lastMessage,
                status,
                timeStamp,
                recipientID,
              };
              resolve(data);
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
        .update({
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
              reject(error);
            });
        })
        .catch((error) => {
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
        });

        return parse;
      });
  }
}

export default DatabaseService;
