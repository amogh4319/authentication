import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import React,{useContext, useRef} from 'react';
const ProfileForm = () => {

const newPasswordRef=useRef('');
const ctx=useContext(AuthContext)
const submitHandler=(event)=>{
  event.preventDefault();
  const enteredNewPassword=newPasswordRef.current.value;
  fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCz7mM_9j5Fifjiz1AFZxtuRYUx3_9MqrI',{
    method:'POST',
    body:JSON.stringify({
      idToken:ctx.token,
      password:enteredNewPassword,
      returnSecureToken:false
    }),
    headers:{
      'Content-Type':'application/json'
    }
  }).then(res=>{
    alert('password is changed successfully!!!');
  })
}
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength={7} ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
