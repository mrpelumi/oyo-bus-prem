import './authInput.styles.scss';

const AuthInput = ({options, type}) => {
  return (
    <input {...options} type={type} />
  )
}

export default AuthInput;