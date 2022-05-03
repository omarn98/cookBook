import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB91QDV0UVWoCmK93uTOnd4SQQN_iEDp5M",
  authDomain: "cookbookimageupload.firebaseapp.com",
  projectId: "cookbookimageupload",
  storageBucket: "cookbookimageupload.appspot.com",
  messagingSenderId: "1087356842984",
  appId: "1:1087356842984:web:8ed52541760c3268deaa5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)