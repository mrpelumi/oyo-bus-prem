/* eslint-disable react/prop-types */
import './appButton.styles.scss';

const AppButton = ({onClick, name, cssname}) => {
  return(
    <button onClick={onClick} type='submit' className={`app-button ${cssname}-button`}>{name}</button>
  )
}

export default AppButton;