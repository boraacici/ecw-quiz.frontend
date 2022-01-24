import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCRBZiSMWn6kJP7WjlZWzQS6I46IAVppNM',
  authDomain: 'ecw-quiz.firebaseapp.com',
  databaseURL:
    'https://ecw-quiz-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'ecw-quiz',
  storageBucket: 'ecw-quiz.appspot.com',
  messagingSenderId: '305260699537',
  appId: '1:305260699537:web:7c2320d10aa1ddea23c430',
  measurementId: 'G-S2KNYBETT3',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export async function getWords() {
  const wordsCol = collection(db, 'Words');
  const wordsSnapshot = await getDocs(wordsCol);
  const wordsList = wordsSnapshot.docs.map(doc => doc.data());
  return wordsList;
}
export async function getLeaderboard() {
  const leaderboardCol = collection(db, 'Leaderboard');
  const leaderboardSnapshot = await getDocs(leaderboardCol);
  const leaderboardList = leaderboardSnapshot.docs.map(doc => doc.data());
  return leaderboardList;
}



export async function addUser(userData){
  const docRef = await addDoc(collection(db, "Users"), userData);

  return docRef;
}