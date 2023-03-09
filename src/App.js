import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Feed from "./components/Feed"
import Login from './components/Login';
import Signup from './components/Signup';

import RequireAuth from './RequireAuth';
import Profile from "./components/Profile"
import AddPost from "./components/AddPost"

import { useDispatch } from 'react-redux'
import { setUser } from './redux/slice/authSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useMemo } from 'react'

function App() {
  
  const dispatch = useDispatch()

  useMemo(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser({ email: currentUser.email, uid: currentUser.uid, name :  currentUser.displayName}))
      }
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        {/* <Route path='/Feed' element={<Home />} /> */}

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Feed />
            </RequireAuth>
          }
        />

        <Route
          path="/user/:id"
          element={
            <RequireAuth>
              <Profile/>
            </RequireAuth>
          }
        />

        <Route
          path="/addpost"
          element={
            <RequireAuth>
              <AddPost/>
            </RequireAuth>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
