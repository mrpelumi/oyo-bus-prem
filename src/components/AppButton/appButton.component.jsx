/* eslint-disable react/prop-types */
import './appButton.styles.scss';

const AppButton = ({onClick, name, cssname, isSubmitting=false}) => {
  return(
    <button onClick={onClick} type='submit' className={isSubmitting ? `app-btn-disabled` : `app-button ${cssname}-button`} disabled={isSubmitting}>{isSubmitting ? "Loading..." : name}</button>
  )
}

export default AppButton;