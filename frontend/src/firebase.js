import { guid } from './components/Game/functions/guid'
import { randomGender } from './components/Game/functions/randomGender'
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    where,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDp-mjeR9fXLYrpurAWxTEptQuglRU-QRY',
    authDomain: 'dedo-ludo.firebaseapp.com',
    projectId: 'dedo-ludo',
    storageBucket: 'dedo-ludo.appspot.com',
    messagingSenderId: '750732656031',
    appId: '1:750732656031:web:731b3cc238f2f9321d91aa',
    measurementId: 'G-C0WW4QZSFH',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user
        const userRef = collection(db, 'users')
        const query = await getDoc(userRef, where('uid', '==', user.uid))

        if (query.docs.length === 0) {
            await addDoc(doc(db, 'users'), {
                uid: user.uid,
                name: user.displayName,
                authProvider: 'google',
                email: user.email,
                avatar: user.photoURL ? user.photoURL : `${randomGender()}/${guid()}`,
                phone: user.phoneNumber
            })
        }
    } catch (err) {
        console.error(err)
        alert(err.message)
    }
}

const logout = async () => {
    await signOut(auth)
}

export { auth, db, signInWithGoogle, logout }
