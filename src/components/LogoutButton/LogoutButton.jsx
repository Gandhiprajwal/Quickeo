import React from 'react'
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUser} from '../../redux/authSlice';

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logMeOut = async()=>{
        await signOut(firebaseAuth);
        dispatch(setUser(null));
        navigate('/login');
    }
  return (
    <button className='btn' onClick={logMeOut}>
        Logout
    </button>
  )
}

export default LogoutButton