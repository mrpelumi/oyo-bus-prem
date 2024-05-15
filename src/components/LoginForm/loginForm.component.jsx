import './loginForm.styles.scss';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import AuthButton from '../AuthButton/authButton.component';
import AuthInput from '../AuthInput/authInput.component';

const LoginForm = () =>{
  const {register, handleSubmit, formState: {errors}} = useForm();
  const navigate = useNavigate();

  const onSubmitHandler = (data) => {
    console.log(data);
    navigate('/app')
  }

  const emailInput = {...register("email", {
    required:"Email is required",
    maxLength:255
  })
}
  const passwordInput = {...register("password", {
    required: "Password must be 8 characters or more",
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
        <label htmlFor="">Password</label>
        <AuthInput options={passwordInput} type={"password"} />
      </div>
      <div className='error-container'>
        {errors.password && <div>
          {errors.password.message}  
        </div>}
      </div>
      <AuthButton name="LOGIN" />
    </form>
  )
}

export default LoginForm;