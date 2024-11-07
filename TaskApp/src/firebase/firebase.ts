// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD1DLYkZnaviUwg_eQ78zLHpGPfsGNv3ew',
  authDomain: 'devcourse-task-app.firebaseapp.com',
  projectId: 'devcourse-task-app',
  storageBucket: 'devcourse-task-app.firebasestorage.app',
  messagingSenderId: '582294334581',
  appId: '1:582294334581:web:0b9035e48eac07bf811c3c',
  measurementId: 'G-XGSNLFQ3MX',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
