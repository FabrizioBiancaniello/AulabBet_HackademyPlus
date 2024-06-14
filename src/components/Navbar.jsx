import { useState, useEffect } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Navbar({auth, db, setUtente, utente,}){

    const [registerComponent, setRegisterComponent] = useState(false)

    async function getUtente(user){
        const docRef = doc(db, "users", user);
        const docSnap = await getDoc(docRef);
        setUtente(docSnap.data())
        // console.log(docSnap.data());  
    }

    async function createUserFirestore(userUid, nome){
        await setDoc(doc(db, "users", userUid), {
            id: userUid,
            name: nome,
            bets: [],
            voted: [],
        });
        inputUsername.value = "";
        inputEmail.value = "";
        inputPassword.value = "";
    }


    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
                setUtente(user)
                if(user){
                    getUtente(user.uid)
                    // console.log(utente);
                }
        })

    }, [auth])

    return(
        <nav className="navbar fixed-top">
            <div className="container-fluid d-flex justify-content-end">
                <button className="btn-nav mt-3 me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <i class={`bi bi-person-fill fs-3 ${utente ? "text-success" : "text-danger"}`}></i>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="d-flex justify-content-between p-3">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">{utente ? utente.name : "Utente"}</h5>
                </div>
                <div className="offcanvas-body">
                    {!utente ? 
                    <div>
                    <p><span onClick={()=>setRegisterComponent(false)}>Login</span>  / <span onClick={()=>setRegisterComponent(true)}>Register</span></p>

                    {registerComponent ? 
                    // REGISTER
                    <form className="p-5">
                        <div className="mb-3">
                        <label htmlFor="inputUsername" className="form-label">Username</label>
                        <input required type="text" className="form-control" id="inputUsername" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email address</label>
                        <input required type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input required type="password" className="form-control" id="inputPassword"/>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button onClick={(event)=> {event.preventDefault(); createUserWithEmailAndPassword(auth, inputEmail.value, inputPassword.value).then((userCredential)=>{const user = userCredential.user; createUserFirestore(userCredential.user.uid, inputUsername.value)})}} type="submit" className="btn-nav px-5 mt-3">Registrati</button>
                        </div>
                    </form>
                    :
                    // LOGIN
                    <div>
                        <div className="mx-4 mt-2 mb-5">
                            <input type="email" placeholder="Email" className="form-control" id="loginEmail" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mx-4 my-5">
                            <input type="password" placeholder="Password" className="form-control" id="loginPassword"/>
                        </div>
                        <div className="mx-4 my-5 d-flex justify-content-center">
                        <button onClick={()=> {signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value).then((userCredential)=>{const user = userCredential.user})}} type="submit" className="">LogIn</button>
                        </div>
                    </div>
                    }
                    </div>
                    :
                    /* LOGOUT  */
                    <div className="d-flex justify-content-center">
                        <button onClick={()=>{signOut(auth)}} className="">LogOut</button>
                    </div>
                    }
                </div>
                </div>
            </div>
        </nav>
    )
}