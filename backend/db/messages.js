import db from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

export async function getMessages() {
    const snapshot = await getDocs(collection(db, 'Messages'));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}
