/* eslint-disable react/prop-types */
import './busInput.styles.scss';
import Select from 'react-select';
import { Controller } from 'react-hook-form';
import AuthInput from '../AuthInput/authInput.component';
import TextAreaInput from '../textAreaInput/textAreaInput.component';


const businessTypes = [
  {label: 'Restaurant', value: 'Restaurant'},
  {label: 'Cinema House', value: 'Cinema House'},
  {label: 'Supermarket', value: 'Supermarket'},
  {label: 'Mini market', value: 'Mini market'}
]

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: 'transparent',
    display: 'flex',
    flexWrap: 'nowrap',
    height: '3rem',
    borderColor: '#4F2B1A',
    width: '100%',
    outline: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    background: '#fff',
    width: '100%',
    color: '#79442B'
  }),
};

const BusInput = ({register, errors, control}) => {

  const busNameInput = {...register("busName", {
    required:"Name is required",
    maxLength:255
    }), minLength: 3
  }

  const taxIdInput = {...register("taxId", {
    required: "Tax ID is required",
    maxLength: 100
  }), minLength: 5, pattern: "[0-9]", placeholder: "Enter your TIN"}

  const busAddInput = {...register("busAdd", {
    required: "Address is required",
    maxLength: 300
  }), minLength: 5}

  return(
    <div className='input-section'>
      <div className='section-one'>
        <div className='input-container'>
          <label htmlFor="">Name of Business</label>
          <AuthInput options={busNameInput} type={"text"} />
        </div>
        <div className='error-container'>
            {errors.busName && <div>
              {errors.busName.message}  
            </div>}
        </div>
        <div className='input-container'>
          <label htmlFor="">Nature of Business</label>
          <Controller name='businessType' control={control} render={({
            field: {onChange, onBlur, value}
          }) => (
            <Select className='select-business' isSearchable={false} styles={customStyles} onChange={onChange} onBlur={onBlur} value={value} options={businessTypes} />
          )} rules={{ required: 'Select an option '}} />
        </div>
        <div className='error-container'>
            {errors.businessType&& <div>
              {errors.businessType.message}  
            </div>}
        </div>
        <div className='input-container'>
          <label htmlFor="">Tax Identification Number</label>
          <AuthInput options={taxIdInput} type={"text"} />
        </div>
        <div className='error-container'>
            {errors.taxId&& <div>
              {errors.taxId.message}  
            </div>}
        </div>
      </div>
      <div className='section-two'>
        <div className='input-container'>
          <label htmlFor="">Business Address</label>
          <TextAreaInput options={busAddInput} />
        </div>
        <div className='error-container'>
            {errors.busAdd && <div>
              {errors.busAdd.message}  
            </div>}
          </div>
      </div>
    </div>
  )
}

export default BusInput;