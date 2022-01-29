import { getStorage, ref, uploadString } from "firebase/storage";
import { uid } from "./firebaseLoader";

export function shareResults(text) {
    const storage = getStorage();
    const storageRef = ref(storage, 'essay' + Date.now() + '-' + uid + '.txt');

    // Upload Essay to Storage
    uploadString(storageRef, text).then((snapshot) => {
        console.log('Uploaded Essay to Firebase Storage');
    });

}