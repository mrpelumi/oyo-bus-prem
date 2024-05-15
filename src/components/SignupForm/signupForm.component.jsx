import './signupForm.styles.scss';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import AuthButton from '../AuthButton/authButton.component';
import AuthInput from '../AuthInput/authInput.component';

// Password and Confirm Password Validation

const SignupForm = () =>{
  const {register, handleSubmit, formState: {errors}} = useForm();
  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    console.log(data);
    navigate('/')
  }

  const emailInput = {...register("email", {
    required:"Email is required",
    maxLength:255
  })
}
 
  const phoneInput = {...register("phoneNo", {
    required: "Phone Number is required",
    maxLength: 30,
  }),minLength: 11, pattern: "[0-9]{11}", placeholder:"Enter your 11 nigeria digits"}

  const passwordInput = {...register("password", {
    required: "Password is required",
    minLength: 8,
  }), minLength: 8}

  const ConfirmPasswordInput = {...register("confirmPassword",{
    required: "Confirm Password is required",
    minLength: 8
  }), minLength: 8}

  return (
    <form className='login-form-container' onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <label htmlFor="">Email</label>
        <AuthInput options={emailInput} type={"email"} />
      </div>
      <div className='error-container'>
        {errors.email && <div>
          {errors.email.message}  
        </div>}
      </div>
      <div>
        <label htmlFor="">Phone Number</label>
        <AuthInput options={phoneInput} type={"tel"} />
      </div>
      <div className='error-container'>
        {errors.phoneNo && <div>
          {errors.phoneNo.message}  
        </div>}
      </div>
      <div>
        <label htmlFor="">Password</label>
        <AuthInput options={passwordInput} type={"password"} />
      </div>
      <div className='error-container'>
        {errors.password && <div>
          {errors.password.message}  
        </div>}
      </div>
      <div>
      <label htmlFor="">Confirm Password</label>
        <AuthInput options={ConfirmPasswordInput} type={"password"} />
      </div>
      <div className='error-container'>
        {errors.confirmPassword && <div>
          {errors.confirmPassword.message}  
        </div>}
      </div>
      <AuthButton name="SIGN UP" />
    </form>
  )
}

export default SignupForm;