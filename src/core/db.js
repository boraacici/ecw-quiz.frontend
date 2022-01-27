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

export async function getAnswer(answersIndexes) {
  const answers = [];
  for (let i = 0; i < answersIndexes.length; i++) {
    const answerIndex = answersIndexes[i];
    const word = await getWordByIndex(answerIndex);
    answers.push(word);    
  } 
  return answers;
}

export async function getQuestionData(indexes) {
  const wordsCol = collection(db, "Words");
  const q = query(wordsCol, where("index", "in", indexes));
  const wordsSnapshot = await getDocs(q);
  const wordsList = wordsSnapshot.docs.map((doc) => doc.data());
  return wordsList;
}

export async function getWordByIndex(e) {
  const wordsCol = collection(db, "Words");
  const q = query(wordsCol, where("index", "==", e));
  const wordsSnapshot = await getDocs(q);
  const wordsList = wordsSnapshot.docs.map((doc) => doc.data());
  return wordsList;
}

export async function getTop5Score() {
  const leaderboardCol = collection(db, "Leaderboard");
  const q = query(leaderboardCol, orderBy("score", "desc"), limit(5));
  const leaderboardSnapshot = await getDocs(q);
  const leaderboardList = leaderboardSnapshot.docs.map(function(doc) { return { ...doc.data(), id: doc.id}});
  return leaderboardList;
}

export async function addUser(userData) {
  const docRef = await addDoc(collection(db, "Users"), userData);
  return docRef;
}

export async function addLeaderboard(userData) {
  const docRef = await addDoc(collection(db, "Leaderboard"), userData);
  return docRef;
}