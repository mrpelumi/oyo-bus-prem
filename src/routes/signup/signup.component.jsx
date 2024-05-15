import './signup.styles.scss';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/SignupForm/signupForm.component';

const Signup = () => {
  return(
    <div className='login-body-container'>
      <div className='greeting-container'>
        <span>Welcome!!!</span>
        <span>Create your free account</span>
      </div>
      <div className='main-form-container'>
        <SignupForm />
        <div className='form-extra-container'>
          <div className='login-option'>
            <span>Already have an account?</span>
            <span><Link to={"/"} className={'login-link'}>Login</Link></span>
          </div>
          </div>
      </div>
        <div className='consultant-container'>
          <span>Consultant: Buven Communications NIG.</span>
        </div>
    </div>
  )
}

export default Signup;