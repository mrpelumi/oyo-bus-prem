import './profile.styles.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import ProfileForm from '../../components/profileForm/profileForm.component';

const Profile = () => {
  return (
    <div className='app-main-container'>
      <div className='app-header-container'>
        <FontAwesomeIcon icon={faUser} className='header-icon'/>
        <span>Profile</span>
      </div>
      <ProfileForm />
    </div>
  )
}

export default Profile;