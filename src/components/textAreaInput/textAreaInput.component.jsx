import './textAreaInput.styles.scss';


const TextAreaInput = ({options, rows}) => {
  return (
    <textarea {...options} rows={rows}></textarea>
  )
}

export default TextAreaInput;