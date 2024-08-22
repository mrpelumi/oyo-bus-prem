/* eslint-disable no-unused-vars */
import './navigation.styles.scss';
import { Link, Outlet } from 'react-router-dom';
import mainLogo from '../../assets/ondo-logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCircleUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useEffect, useRef , useState} from 'react';

import { signAuthUserOut } from '../../utils/firebase';

import { setAppStatus } from '../../store/appStatus/appStatus.reducer';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authToken = useRef("");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const currentUserEmail = useRef("");
  const [currentFirstName, setCurrentFirstName] = useState("");

  useEffect(() => {
    authToken.current = localStorage.getItem('Auth_Token');
    currentUserEmail.current = sessionStorage.getItem("userEmail");
    setCurrentFirstName(sessionStorage.getItem("firstName"));
    if (authToken.current){
      navigate('/app')
    } else {
      navigate('/')
    }
  }, [])

  // for hamburger-icon
  const toggleButton = (event) => {
    setIsOpen(!isOpen);
  }

  // Fix log out soon
  const SignOutHandler = async () => {
    await signAuthUserOut()
    .then((response) => {
      localStorage.clear();
    })
    navigate('/');
  }

  const startAppHandler = () => {
    dispatch(setAppStatus(""))
  }

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
              <span><Link to={'/app/tax'} onClick={startAppHandler} className={'nav-action-link'}>Start Application</Link></span>
              { (currentUserEmail.current === "buvencommunicationsltd@gmail.com" || currentUserEmail.current === "timzfelt95@gmail.com") && <span><Link to={'/app/admin/approval'} className={'nav-action-link'}>Admin Approval</Link></span>}
              <span><Link className={'nav-action-link'} onClick={SignOutHandler}>Log Out</Link></span>
            </div>) : (
              <div className='nav-action-item single-nav-link'>
              <span><Link to={'/'} className={'nav-action-link'} onClick={SignOutHandler}>Log Out</Link></span>
            </div>
            )
          }
          
          <div className='nav-profile'>
            <Link><FontAwesomeIcon icon={faCircleUser} className='nav-profile-icon' /></Link>
            <span>{currentFirstName}</span>
          </div>
        </div>

        {
          isOpen ? <div className='hamburger-icon-container' onClick={toggleButton}>
            <FontAwesomeIcon icon={faXmark} className='menu-nav-icon' />
          </div> : <div className='hamburger-icon-container' onClick={toggleButton}>
            <FontAwesomeIcon icon={faBars} className='menu-nav-icon' />
          </div>
        }
        {
          isOpen ? (
            <div className='menu-action-container'>
              {
            ((currentPath === '/app') || (currentPath === '/app/')) ? (
              <div className='menu-action-item'>
              <span><Link to={'/app/tax'} onClick={startAppHandler} className={'menu-action-link'}>Start Application</Link></span>
              { currentUserEmail.current === "buvencommunicationsltd@gmail.com" && <span><Link to={'/app/admin/approval'} className={'nav-action-link'}>Admin Approval</Link></span>}
              <span><Link className={'menu-action-link'} onClick={SignOutHandler}>Log Out</Link></span>
            </div>) : (
              <div className='menu-action-item single-nav-link'>
              <span><Link to={'/'} className={'menu-action-link'} onClick={SignOutHandler}>Log Out</Link></span>
            </div>
            )
          }
          
          <div className='menu-profile'>
            <Link><FontAwesomeIcon icon={faCircleUser} className='menu-profile-icon' /></Link>
            <span>{currentFirstName}</span>
          </div>
            </div>
          ) : null
        }
      </div>
      <Outlet />
    </div>
  )
}

export default Navigation;