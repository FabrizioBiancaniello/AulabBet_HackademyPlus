import { useState, useEffect } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function Navbar({ auth, db, utente, calcAverageVote, getUtente }) {

    const [registerComponent, setRegisterComponent] = useState(false)
    const [loginMessage, setLoginMessage] = useState("")
    const [registerMessage, setRegisterMessage] = useState("")

    async function createUserFirestore(userUid, nome) {
        await setDoc(doc(db, "users", userUid), {
            id: userUid,
            name: nome,
            bets: [],
            voted: [],
            img: "/default.png"
        });

        inputUsername.value = "";
        inputEmail.value = "";
        inputPassword.value = "";
    }

    function createAccount(event) {
        event.preventDefault()
        if (inputPassword.value.length >= 8) {
            if (inputPassword.value !== inputConfirmPassword.value) {
                setRegisterMessage("Le Password non corrispondono")
                setTimeout(() => {
                    setRegisterMessage("")
                }, 5000);
                return
            }
            createUserWithEmailAndPassword(auth, inputEmail.value, inputPassword.value)
                .then((userCredential) => createUserFirestore(userCredential.user.uid, inputUsername.value))
                .catch(() => {
                    setRegisterMessage("Email già in uso")
                    setTimeout(() => {
                        setRegisterMessage("")
                    }, 5000);

                })
        } else {
            setRegisterMessage("La password deve contenere almeno 8 caratteri")
            setTimeout(() => {
                setRegisterMessage("")
            }, 5000);
        }
    }

    function loginEnter(e) {
        if (e.key == "Enter") {
            signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value).then((userCredential) => { const user = userCredential.user }).catch((err) => setLoginMessage("Email o Password errate, Riprova"))
        }
    }

    function showPassword(e, field) {
        e.preventDefault();
        if (field.type == "password") {
            field.setAttribute("type", "text")
            e.target.classList.add("bi-eye-slash-fill")
            e.target.classList.remove("bi-eye-fill")
        } else {
            field.setAttribute("type", "password")
            e.target.classList.remove("bi-eye-slash-fill")
            e.target.classList.add("bi-eye-fill")
        }
    }

    return (
        <nav className="navbar fixed-top">
            <div className="container-fluid d-flex justify-content-end">
                <button className="btn-nav mt-3 me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <i className={`bi bi-person-fill fs-3 ${utente ? "text-success" : "text-danger"}`}></i>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="d-flex justify-content-between p-3">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">AulaBet</h5>
                    </div>
                    <div className="offcanvas-body canvas-body-menu">
                        {!utente ?
                            <div>

                                {registerComponent ?
                                    // REGISTER
                                    <div className="mt-5">
                                        <h2 className="display-5">REGISTRATI</h2>
                                        <p className="mb-5">Sei già registrato? Effettua il <span className="log-reg-link" onClick={() => setRegisterComponent(false)}>Login</span>.</p>
                                        <form className="login-register-box position-relative">
                                            {registerMessage &&
                                                <div className="reg-login-box-alert alert alert-danger fw-bold">
                                                    <p>{registerMessage}</p>
                                                </div>
                                            }
                                            <div className="mb-3">
                                                <label htmlFor="inputUsername" className="form-label">Username</label>
                                                <input required type="text" className="form-control" id="inputUsername" aria-describedby="emailHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="inputEmail" className="form-label">Indirizzo Email</label>
                                                <input required type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="inputPassword" className="form-label">Password</label>
                                                <div className="position-relative">
                                                    <input required type="password" className="form-control pe-5" id="inputPassword" />
                                                    <i onClick={(e) => showPassword(e, inputPassword)} className="iconPass bi bi-eye-fill"></i>
                                                    {/* <button onClick={(e) => showPassword(e, inputPassword)}>mostra</button> */}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="inputConfirmPassword" className="form-label">Conferma Password</label>
                                                <div className="position-relative">
                                                    <input required type="password" className="form-control pe-5" id="inputConfirmPassword" />
                                                    <i onClick={(e) => showPassword(e, inputConfirmPassword)} className="iconPass bi bi-eye-fill"></i>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button onClick={(event) => createAccount(event)} type="submit" className="btn-reg-login mt-4">Registrati</button>
                                            </div>
                                        </form>
                                    </div>
                                    :
                                    // LOGIN
                                    <div className="mt-5">
                                        <h2 className="display-5">LOGIN</h2>
                                        <p className="mb-5">Non sei registrato? Iscriviti tramite il link <span className="log-reg-link" onClick={() => setRegisterComponent(true)}>Registrati</span>.</p>
                                        <div className="login-register-box position-relative">
                                            {loginMessage &&
                                                <div className="reg-login-box-alert alert alert-danger fw-bold">
                                                    <p>{loginMessage}</p>
                                                </div>
                                            }

                                            <div className="mt-5 mb-3">
                                                <label htmlFor="loginEmail" className="form-label">Indirizzo Email</label>
                                                <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" />
                                            </div>
                                            <div className=" mb-3">
                                                <label htmlFor="loginPassword" className="form-label">Password</label>
                                                <div className="position-relative">
                                                    <input onKeyDown={(e) => loginEnter(e)} type="password" className="form-control" id="loginPassword" />  
                                                    <i onClick={(e) => showPassword(e, loginPassword)} className="iconPass bi bi-eye-fill"></i>
                                                </div>
                                            </div>
                                            <div className="my-5 d-flex justify-content-center">
                                                <button onClick={() => { signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value).catch((err) => setLoginMessage("Email o Password errate, Riprova")) }} type="submit" className="btn-reg-login">LogIn</button>
                                            </div>


                                        </div>
                                    </div>
                                }
                            </div>
                            :
                            /* PROFILO  */
                            <div>
                                <h2 className="display-5 text-center border-bottom mt-5">PROFILO</h2>
                                <div className="login-register-box text-center mt-5">
                                    <div className="my-3">
                                        <h5>Nome Utente</h5>
                                        <p className="border-bottom">{utente.name}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h5>Bet Inserite</h5>
                                        <p className="border-bottom">{utente.bets && utente.bets.length}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h5>Bet Votate</h5>
                                        <p className="border-bottom">{utente.voted && utente.voted.length}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h5>Media Voti</h5>
                                        <p className="border-bottom">{utente.voted && calcAverageVote(utente.voted)}</p>
                                    </div>
                                    <div className="d-flex justify-content-center mt-5">
                                        <button onClick={() => { signOut(auth) }} className="btn-logout">LogOut</button>
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}