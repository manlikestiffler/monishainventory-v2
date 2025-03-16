import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { enableIndexedDbPersistence } from 'firebase/firestore';

export async function checkAndInitializeFirestore() {
  try {
    // Enable offline persistence
    await enableIndexedDbPersistence(db);
    
    // Check connection by attempting to read a known document
    const initDoc = doc(db, '_init', 'status');
    const initSnapshot = await getDoc(initDoc);

    if (!initSnapshot.exists()) {
      // Create initialization document if it doesn't exist
      await setDoc(initDoc, {
        initialized: true,
        timestamp: new Date().toISOString()
      });
    }

    return true;
  } catch (error) {
    if (error.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (error.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    } else {
      console.error('Firestore initialization error:', error);
    }
    return false;
  }
} 