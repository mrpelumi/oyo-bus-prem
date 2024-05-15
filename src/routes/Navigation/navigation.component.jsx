import './navigation.styles.scss';
import { Link, Outlet } from 'react-router-dom';
import mainLogo from '../../assets/ondo-logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className='main-container'>
      <div className='nav-container nav-app'>
        <div className='main-logo-container'>
          <div className='nav-logo-container'>
            <img src={mainLogo} alt="Ondo Logo" />
          </div>
          <span className='nav-span'></span>
          <div className='nav-brand-name'>
            <span className='header'>ONDO STATE BUSINESS PREMISES</span>
            <span className='bottom'>REGISTRATION SYSTEM</span>
          </div>
        </div>
        <div className='nav-action-container'>
          {
            ((currentPath === '/app') || (currentPath === '/app/')) ? (
              <div className='nav-action-item'>
              <span><Link to={'/app/tax'} className={'nav-action-link'}>Start Application</Link></span>
              <FontAwesomeIcon icon={faChevronDown} className='nav-arrow-icon' />
            </div>) : (
              <div className='nav-action-item'>
              <span><Link to={'/'} className={'nav-action-link'}>Log Out</Link></span>
              <FontAwesomeIcon icon={faChevronDown} className='nav-arrow-icon' />
            </div>
            )
          }
          
          <div className='nav-profile'>
            <Link><FontAwesomeIcon icon={faCircleUser} className='nav-profile-icon' /></Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Navigation;