import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  limit,
  query,
  orderBy,
  where,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCRBZiSMWn6kJP7WjlZWzQS6I46IAVppNM",
  authDomain: "ecw-quiz.firebaseapp.com",
  databaseURL:
    "https://ecw-quiz-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ecw-quiz",
  storageBucket: "ecw-quiz.appspot.com",
  messagingSenderId: "305260699537",
  appId: "1:305260699537:web:7c2320d10aa1ddea23c430",
  measurementId: "G-S2KNYBETT3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// export async function getWords() {
//   const wordsCol = collection(db, "words");
//   const q = query(wordsCol, where("index", "==", "1"));
//   // console.log(q);
//   const wordsSnapshot = await getDocs(wordsCol);
//   const wordsList = wordsSnapshot.docs.map((doc) => doc.data());
//   return wordsList;
// }

// export async function getAnswer(index) {
//   // const answersData = [];

//   console.log(index);
// }

export async function getQuestion(index) {
  const wordsCol = collection(db, "Words");
  const q = query(wordsCol, where("index", "==", index));
  const wordsSnapshot = await getDocs(q);
  const wordsList = wordsSnapshot.docs.map((doc) => doc.data());
  return wordsList;
}

export async function getAnswer(answersIndexes) {
  const answers = [];
  for (let i = 0; i < answersIndexes.length; i++) {
    const answerIndex = answersIndexes[i];
    const word = await getWordByIndex(answerIndex);
    answers.push(word);    
  } 
  return answers;
}

export async function getWordByIndex(e) {
  const wordsCol = collection(db, "Words");
  const q = query(wordsCol, where("index", "==", e));
  // console.log(e);
  const wordsSnapshot = await getDocs(q);
  const wordsList = wordsSnapshot.docs.map((doc) => doc.data());
  console.log(wordsList);
  return wordsList;
}

export async function getLeaderboard() {
  const leaderboardCol = collection(db, "Leaderboard");
  const q = query(leaderboardCol, orderBy("score", "desc"));
  const leaderboardSnapshot = await getDocs(q);
  const leaderboardList = leaderboardSnapshot.docs.map((doc) => doc.data());
  return leaderboardList;
}

export async function addUser(userData) {
  const docRef = await addDoc(collection(db, "Users"), userData);

  return docRef;
}
