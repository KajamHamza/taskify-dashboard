import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param file - The file to upload.
 * @param folder - The folder in Firebase Storage where the file will be stored (e.g., 'categories_images').
 * @returns The download URL of the uploaded file.
 */
export const uploadImage = async (file: File, folder: string) => {
  try {
    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `${folder}/${file.name}`);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};