import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { format } from "date-fns";

const uploadImage = (folder, file) => {
  return new Promise((resolve, reject) => {
    const fileName = `photo_${Date.now()}.jpg`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file, {
      name: fileName,
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Error uploading file:", error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          saveToFirestore(downloadURL, folder);
          resolve(downloadURL);
        });
      }
    );
  });
};
const saveToFirestore = async (url, name) => {
  try {
    const docRef = await addDoc(collection(db, name), {
      url,
      name,
      timestamp: format(Date.now(), "dd/MM/yyyy HH:mm:ss"),
    });
    return docRef;
  } catch (error) {
    throw error;
  }
};
export { uploadImage };
