import './login.styles.scss';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/loginForm.component';

const Login = () => {
  return (
    <div className='login-body-container'>
      <div className='greeting-container'>
        <span>Welcome Back!!!</span>
        <span>Kindly enter your login details</span>
      </div>
      <div className='main-form-container'>
        <LoginForm />
        <div className='form-extra-container'>
          <div className='forgot-p-container'>
            <span><Link to={'/forgot-password'} className={'forgot-p-link'}>Forgot Password?</Link></span>
          </div>
          <div className='sign-up-option'>
            <span>Don't have an account?</span>
            <span><Link to={"/signup"} className={'sign-up-link'}>Sign Up</Link></span>
          </div>
          </div>
      </div>
        <div className='consultant-container'>
          <span>Consultant: Buven Communications NIG.</span>
          <span>Elegax Technologies</span>
        </div>
    </div>
  )
}

export default Login;