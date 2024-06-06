import './authButton.styles.scss';

const AuthButton = ({name, isSubmitting=false}) => {
  return (
    <button className={isSubmitting ? 'auth-btn-disabled' : 'auth-button'} type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." : name}</button>
  )
}

export default AuthButton;