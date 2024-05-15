import './textAreaInput.styles.scss';


const TextAreaInput = ({options}) => {
  return (
    <textarea {...options} cols="20" rows="6"></textarea>
  )
}

export default TextAreaInput;