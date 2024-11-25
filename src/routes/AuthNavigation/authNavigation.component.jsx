import { Outlet } from 'react-router-dom';
import './authNavigation.styles.scss';
import mainLogo from '../../assets/ondo-logo.png';
import oyoLogo from '../../assets/oyo-logo.png';


const AuthNavigation = () => {
  return (
    <div className='main-container'>
      <div className='nav-container'>
        <div className='nav-item-container'>
            <div className='nav-logo-container'>
              <img src={oyoLogo} alt="Oyo Logo" />
            </div>
            <span className='nav-span'></span>
            <div className='nav-brand-name'>
              <span className='header'>OYO STATE BUSINESS PREMISES</span>
              <span className='bottom'>REGISTRATION SYSTEM</span>
            </div>
          </div>
      </div>
      <Outlet />
    </div>
  )
}

export default AuthNavigation;