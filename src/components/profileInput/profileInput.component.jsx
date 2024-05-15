/* eslint-disable react/prop-types */
import './profileInput.styles.scss';
import AuthInput from '../AuthInput/authInput.component';
import TextAreaInput from '../textAreaInput/textAreaInput.component';

const ProfileInput = ({register, errors}) => {

  const firstNameInput = {...register("firstName", {
    required:"Name is required",
    maxLength:255
    }), minLength: 1
  }

  const lastNameInput = {...register("lastName", {
    required:"Name is required",
    maxLength:255
    }), minLength: 1
  }

  const emailInput = {...register("email", {
    required:"Email is required",
    maxLength:255
    })
  }

  const phoneInput = {...register("phoneNo", {
    required: "Phone Number is required",
    maxLength: 30,
  }),minLength: 11, pattern: "[0-9]{11}", placeholder:"Enter your 11 nigeria digits"}

  const busNameInput = {...register("busName", {
    required: "Enter business name",
    maxLength: 255
  }), minLength: 3}

  const busAddInput = {...register("busAdd", {
    required: "Enter business address",
    maxLength: 300
  }), minLength: 5}

  return (
    <div className='input-section'>
        <div className='section-one'>
          <div className='input-container'>
            <label htmlFor="">First Name</label>
            <AuthInput options={firstNameInput} type={"text"} />
          </div>
          <div className='error-container'>
            {errors.firstName && <div>
              {errors.firstName.message}  
            </div>}
          </div>
          <div className='input-container'>
            <label htmlFor="">Last Name</label>
            <AuthInput options={lastNameInput} type={"text"} />
          </div>
          <div className='error-container'>
            {errors.lastName && <div>
              {errors.lastName.message}  
            </div>}
          </div>
          <div className='input-container'>
            <label htmlFor="">Email</label>
            <AuthInput options={emailInput} type={"email"} />
          </div>
          <div className='error-container'>
            {errors.email && <div>
              {errors.email.message}  
            </div>}
          </div>
          <div className='input-container'>
            <label htmlFor="">Phone No</label>
            <AuthInput options={phoneInput} type={"tel"}/>
          </div>
          <div className='error-container'>
            {errors.phoneNo && <div>
              {errors.phoneNo.message}  
            </div>}
          </div>
        </div>
        <div className='section-two'>
          <div className='input-container'>
            <label htmlFor="">Name of Business</label>
            <AuthInput options={busNameInput} type={"text"}/>
          </div>
          <div className='error-container'>
            {errors.busName && <div>
              {errors.busName.message}  
            </div>}
          </div>
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

export default ProfileInput;