import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const Auth = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () =>{
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch (err){
            console.log(err);
        }
    };

    const signInWithGoogle = async () =>{
        try{
            await signInWithPopup(auth, googleProvider);
        }catch (err){
            console.log(err);
        }
    };

    console.log(auth.currentUser?.email);
    

    const logOut = async () =>{
        try{
            await signOut(auth);
        }catch (err){
            console.log(err);
        }
    };

    return (
        <div>
            <input placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)}
            />
            <input placeholder="Password" type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign in with Google</button>

            <button onClick={logOut}>Log Out</button>
        </div>
    )

}