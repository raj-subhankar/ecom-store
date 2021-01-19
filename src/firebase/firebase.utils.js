import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyACGs-ooCkPOiVrYARdJ_84Kr1AxOXlgP0",
    authDomain: "ecom-81e5b.firebaseapp.com",
    projectId: "ecom-81e5b",
    storageBucket: "ecom-81e5b.appspot.com",
    messagingSenderId: "405137393142",
    appId: "1:405137393142:web:251b14f239f6ed46d573d7"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) return

      const userRef = firestore.doc(`users/${userAuth.uid}`)
      const snapShot = await userRef.get()

      if(!snapShot.exists) {
          const { displayName, email } = userAuth
          const createdAt = new Date()

          try {
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })
          } catch (error) {
              console.log('error creating user', error.message)
          }
      }

      return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase
