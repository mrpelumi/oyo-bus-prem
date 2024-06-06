import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged,
signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut } from "firebase/auth";
import {getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc, getDoc} from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_SECURE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);

// Phone No userAuth document object state
const userAuthRef = collection(db, "userAuth");

// Profile document object state
const userProfileRef = collection(db, "userProfile");

// Tax App document object state
const taxAppRef = collection(db, "taxApp");

export const QphoneUserAuth = async (phoneNo) => {

  const q = query(userAuthRef, where("phoneNo", "==", phoneNo))

  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}

// Email userAuth document object state
export const QEmailUserAuth = async (email) => {
  const q = query(userAuthRef, where("email", "==", email))

  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}

// Get Document from userAuth
export const getDocAuth = async (email) => {
  const q = query(userAuthRef, where("email", "==", email))

  const querySnapshot = await getDocs(q);
  return querySnapshot;  
}

// Get Document from businessType
export const getDocBusinessSector = async () => {
  const docRef = doc(db, "businessSector", "mainBusSector");
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

export const getDocBusinessType = async (busType) => {
  const docRef = doc(db, "businessType", busType);

  const docSnap = await getDoc(docRef);

  return docSnap.data();
}


// Get Document from userProfile Empty Value
export const getDocProfileEmpty = async (email) => {
  const q = query(userProfileRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}

// Get Document from userProfile
export const getDocProfile = async (email) => {
  const q = query(userProfileRef, where("email", "==", email));

  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

// Get Document from taxApp
export const getDocTaxApp = async (email) => {
  const q = query(taxAppRef, where ("profile.email", "==", email));

  const querySnapshot = await getDocs(q);
  return querySnapshot;
}

// Get Document from taxApp Empty Value
export const getDocTaxAppEmpty = async (email) => {
  const q = query(taxAppRef, where ("profile.email", "==", email));

  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}

// Add document to userAuth
export const docUserAuth = async (userObj) => {
  try {
    await addDoc(collection(db, "userAuth"), userObj);
    // console.log("Document created with ID: ", docRef.id)
  } catch(e) {
    console.log(e);
  }
}

// Add Document to userProfile
export const docUserProfile = async (profileObj) => {
  try {
    await addDoc(collection(db, "userProfile"), profileObj)
  } catch(e){
    console.log(e);
  }
}

// Add Document to taxApp
export const docTaxApp = async (taxAppObj) => {
  try {
    await addDoc(collection(db, "taxApp"), taxAppObj);
  } catch(e) {
    console.log(e);
  }
}

// Add Document to receipt
export const docTaxReceipt = async (receiptObj) => {
  try {
    await addDoc(collection(db, "receipt"), receiptObj)
  } catch (e) {
    console.log(e);
  }
}


// Update UserProfile Document
export const updateUserProfile = async (docId, profileObj) => {
  try{
    const profileRef = doc(db, "userProfile", docId)
    await updateDoc(profileRef, profileObj)
  } catch(e) {
    console.log(e);
  }
}

// Update TaxApp Document
export const updateTaxApp = async (docId, taxObj) => {
  try{
    const taxAppRef = doc(db, "taxApp", docId);
    await updateDoc(taxAppRef, taxObj);
  } catch(e){
    console.log(e);
  }
}

export const signAuthUserOut = async () => {
  return await signOut(auth)
}

// user login and signup
export const setAuthPersistence = async () => {
  return await setPersistence(auth, browserSessionPersistence)
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
 
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}