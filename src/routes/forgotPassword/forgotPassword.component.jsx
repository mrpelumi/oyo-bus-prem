import './forgotPassword.styles.scss';
import AuthInput from '../../components/AuthInput/authInput.component';
import { useForm } from 'react-hook-form';
import AppButton from '../../components/AppButton/appButton.component';
import {Alert} from 'react-st-modal';
import { useNavigate } from 'react-router-dom';

import { sendAuthPasswordResetEmail } from '../../utils/firebase';


const ForgotPassword = () =>{
  const navigate = useNavigate();


  const {register, handleSubmit, formState: {errors}} = useForm();
  const ForgotPasswordHandler = async (data) => {
    const emailValue = data.email;
    try{
      await sendAuthPasswordResetEmail(emailValue)
      .then((response) => {
        Alert("Password reset link sent to email", "Password Reset");
        setTimeout(() => {
          navigate("/");
        }, 2000)
        
      })
    } catch(e) {
      console.log(e)
    }
    
  }

  const ForgotPasswordInput = {...register("email", {required: "Enter Email Address"})}

  return (
    <div className='forgot-password-container'>
      <h1>Forgot Password</h1>
      <div className='form-container'>
      <div className='error-container'>
            {errors.email && <div>
              {errors.email.message}  
            </div>}
        </div>
        <span>
          Enter your email address
        </span>
        <form className='forgot-password-form' onSubmit={handleSubmit(ForgotPasswordHandler)}>
          <AuthInput type='email' options={ForgotPasswordInput} />
          <AppButton name={"Reset"} cssname={"other"} />
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;