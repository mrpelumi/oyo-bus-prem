import './authButton.styles.scss';

const AuthButton = ({name}) => {
  return (
    <button className='auth-button' type="submit">{name}</button>
  )
}

export default AuthButton;