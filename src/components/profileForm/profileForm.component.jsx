import './profileForm.styles.scss';
import { useForm } from 'react-hook-form';
import AppButton from '../AppButton/appButton.component';
import ProfileInput from '../profileInput/profileInput.component';

const ProfileForm = () => {
  const {register, formState: {errors}, handleSubmit, reset} = useForm();

  const onSubmitHandler = (data) => {
    console.log(data);
  }

  const onResetHandler = () => {
    reset({
      firstName:"",
      lastName:"",
      email:"",
      phoneNo:"",
      busName:"",
      busAdd:""
    });
  }

  return (
    <form className='profile-form'>
      <ProfileInput register={register}  errors={errors} />
      <div className='button-section'>
        <AppButton onClick={handleSubmit(onSubmitHandler)} name={"Save"} cssname={"save"} />
        <AppButton onClick={handleSubmit(onResetHandler)} name={"Cancel"} cssname={"other"} />
      </div>
    </form>
  )
}

export default ProfileForm;