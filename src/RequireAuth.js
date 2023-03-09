import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase'
import Loader from './components/Loader';


const RequireAuth = ({ children }) => {

    const [check, setAuth] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setAuth({ user: currentUser.email, uid: currentUser.uid });
            }
            else {
                setAuth({ user: '', uid: '' });
            }
        });
    }, [])


    if (check === null) {
        return (
            <>
                <Loader/>
            </>
        )
    }

    if (check.user === '') return <Navigate to='/login' />

    return children

}

export default RequireAuth