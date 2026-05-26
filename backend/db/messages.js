import db from '../firebase.js';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export const getMessages = async () => {
    try {
        const snapshot = await getDocs(collection(db, 'Messages'));
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.log("Error getting messages", error);
    }
    
}

export const addMessage = async(name, message) => {
    try {
        await addDoc(collection(db, 'Messages'), { name, message });
    } catch (error) {
        console.log("Error adding message");
    }
}

export const deleteMessage = async(messageId) => {
    try {
        await deleteDoc(doc(db, 'Messages', messageId));
    } catch (error) {
        console.log("Error deleting message");
    }
}

export const editMessage = async(messageId, updatedFields) => {
    try {
        await updateDoc(doc(db, 'Messages', messageId), updatedFields);
    } catch (error) {
        console.log("Error editing message");
    }
}