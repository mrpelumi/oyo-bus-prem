import './loginForm.styles.scss';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { signInAuthWithEmailAndPassword, setAuthPersistence } from 
'../../utils/firebase';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../store/user/user.reducer';
import { setCurrentUserId } from '../../store/userId/userId.reducer';
import AuthButton from '../AuthButton/authButton.component';
import AuthInput from '../AuthInput/authInput.component';


const LoginForm = () =>{
  const {register, setError, handleSubmit, formState: {errors, isSubmitting}} = useForm({criteriaMode: 'all'});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login function with authorization
  const onSubmitHandler = async (data) => {
    const {email, password} = data;
    setAuthPersistence()
    .then(async () => {
      await signInAuthWithEmailAndPassword(email, password)
      .then((response) => {
        dispatch(setCurrentUser(response.user.email));
        dispatch(setCurrentUserId(response.user.uid));
        localStorage.setItem('Auth_Token', response._tokenResponse.refreshToken);
        navigate('/app')
      })
    })
    .catch(error => {
      setError('root.serverError', {type: error.code, message:'Incorrect Email or Password'})
    })
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
        {errors.root && errors.root.serverError.type === "auth/invalid-credential" && <div className='root-error'>Incorrect Email or Password</div> }
      </div>
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
      <AuthButton name="LOGIN" isSubmitting={isSubmitting} />
    </form>
  )
}

export default LoginForm;