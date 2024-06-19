import './signupForm.styles.scss';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { Confirm } from 'react-st-modal';

import { setCurrentUser } from '../../store/user/user.reducer';
import { useDispatch } from 'react-redux';

import { setAuthPersistence, createAuthUserWithEmailAndPassword, QEmailUserAuth, docUserAuth, QphoneUserAuth } from '../../utils/firebase';

import AuthButton from '../AuthButton/authButton.component';
import AuthInput from '../AuthInput/authInput.component';
import { setCurrentUserId } from '../../store/userId/userId.reducer';

// Password and Confirm Password Validation
const schema = z.object({
  email: z.string().email({message: 'Incorrect Email address'}),
  phoneNo: z.string().min(11, {message:"Must be 11 characters or more"}),
  password: z.string().min(8, {message: 'Must be 8 characters or more'}),
  confirmPassword: z.string(), 
  terms: z.boolean().refine(value => value === true, "You must agree to the terms and conditions"),
}).required().refine((data) => data.password === data.confirmPassword, {
  message: 'Password do not match',
  path: ['confirmPassword']
})


const SignupForm = () =>{
  const {register, setError, handleSubmit, formState: {errors, isSubmitting}, setValue} = useForm({
    resolver: zodResolver(schema)
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // SignUp function with authorization
  // Email Verification still needed
  const onSubmitHandler = async (data) => {
    const {email, phoneNo, password, terms} = data;
    
    // returns boolean empty value
    const phoneFromDb = await QphoneUserAuth(phoneNo);
    const emailFromDb = await QEmailUserAuth(email);

    if (!emailFromDb){
      setError('root.serverError', {type: 'auth/email-already-in-use', message: "Email Already in Use"})
      return
    }

    if (!phoneFromDb){
      setError('root.serverError', {type: 'auth/phone-already-in-use', message: "Phone Already in Use"})
      return
    }

    setAuthPersistence()
    .then(async () => {
      await createAuthUserWithEmailAndPassword(email, password)
      .then((response) => {
        dispatch(setCurrentUser(response.user.email));
        dispatch(setCurrentUserId(response.user.uid));
        docUserAuth(response.user.uid,{email, phoneNo, terms});
        localStorage.setItem('Auth_Token', response._tokenResponse.refreshToken)
        navigate('/app')
      })
    })
    .catch(error => {
      setError('root.serverError', {type: error.code, message:'Email Already in Use'})
    })
  }

  const emailInput = {...register("email")}
 
  const phoneInput = {...register("phoneNo",),minLength: 11, pattern: "[0-9]{11}", placeholder:"Enter your 11 nigeria digits"}

  const passwordInput = {...register("password"), minLength: 8}

  const ConfirmPasswordInput = {...register("confirmPassword",), minLength: 8}

  const MoreLinkHandler = async () => {
    const result = await Confirm("I/We hereby certify that the foregoing particulars are to the best of my/ our knowledge, information and belief correct, and I/We undertake to notify the Registrar of Business Premises whenever change occurs in or affects any of them.", "Declaration", "Agree");
    if (result){
      setValue("terms", true);
    }
    
  }

  return (
    <form className='login-form-container' onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        {errors.root && errors.root.serverError.type === "auth/email-already-in-use" && <div className='root-error'>Email Already in Use</div> }

        {errors.root && errors.root.serverError.type === "auth/phone-already-in-use" && <div className='root-error'>Phone Number in Use</div> }
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
      <div className='terms-container'>
        <input className='terms-checkbox' type='checkbox' {...register("terms")} />
        <label className='terms-label' htmlFor="">I/We hereby certify that the foregoing particulars are to the best of my/our knowledge <span className='terms-more' onClick={MoreLinkHandler}>more ...</span></label>
      </div>
      <div className='error-container'>
        {errors.terms && <div>
          {errors.terms.message}  
        </div>}
      </div>
      
      <AuthButton name="SIGN UP" isSubmitting={isSubmitting} />
    </form>
  )
}

export default SignupForm;