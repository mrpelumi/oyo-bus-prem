import './profileForm.styles.scss';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {selectCurrentUser} from '../../store/user/user.selector';
import { selectCurrentUserId } from '../../store/userId/userId.selector';
import { getDocAuth, onAuthStateChangedListener, getDocProfile, docUserProfile, getDocProfileEmpty, updateUserProfile } from '../../utils/firebase';

import AppButton from '../AppButton/appButton.component';
import ProfileInput from '../profileInput/profileInput.component';
import { setCurrentUser } from '../../store/user/user.reducer';

const ProfileForm = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);
  const {register, formState: {errors}, handleSubmit, setValue, reset} = useForm();
  const navigate = useNavigate();
  const userResponse = useRef({});
  const readOnlyVal = useRef(false);
  const profileDocId = useRef("");
  
  useEffect(() => {
    let authToken = localStorage.getItem('Auth_Token');

    if (authToken){
      navigate('/app')
    } else {
      navigate('/')
    }

    // Monitor state and set Default Values
    const subscribe = onAuthStateChangedListener(async (user) => {
      if (user){
        const email = user.email;
        const qUserAuth = getDocAuth(email);
        const qUserProfileEmpty = await getDocProfileEmpty(email);
      
        if (!qUserProfileEmpty){
          
          const qUserProfile = await getDocProfile(email);
          qUserProfile.docs.forEach((item) => {
            const qUserData = item.data();
            setValue("busName", qUserData.busName);
            setValue("firstName", qUserData.firstName);
            setValue("lastName", qUserData.lastName);
            setValue("busAdd", qUserData.busAdd);
            setValue("busBranch", qUserData.busBranch);
            setValue("busBranch", qUserData.busBranch);
            setValue("nationality", qUserData.nationality);
            setValue("busCommence", qUserData.busCommence);
            setValue("homeAdd", qUserData.homeAdd);
            setValue("busAdd2", qUserData.busAdd2);
            setValue("busAdd3", qUserData.busAdd3);
            setValue("busAdd4", qUserData.busAdd4);
            readOnlyVal.current = true;
            profileDocId.current = item.id
          })
        }

        qUserAuth.then((response) => {
          response.forEach((doc) => {
            userResponse.current = doc.data();
            setValue("email",userResponse.current.email);
            setValue("phoneNo", userResponse.current.phoneNo);
          })
        })
        if (!currentUser){
          dispatch(setCurrentUser(email));
        }
      }
    })
    return subscribe;
  }, [])


  // Check if the business name is unique
  const onSubmitHandler = async (data) => {
    try{
      const updateData = {
        firstName: data.firstName,
        lastName: data.lastName,
        busAdd: data.busAdd,
        busBranch: data.busBranch,
        busAdd2: data.busAdd2,
        busAdd3: data.busAdd3,
        busAdd4: data.busAdd4,
        nationality: data.nationality,
        homeAdd: data.homeAdd,
        busCommence: data.busCommence
      }
      const currentProfile = await getDocProfileEmpty(currentUser);
      if (currentProfile){
        docUserProfile(currentUserId, data);
        setSuccessMsg("Profile has been created!!!");
      }else {
        updateUserProfile(profileDocId.current, updateData);
        setSuccessMsg("Profile has been updated")
      } 
      setTimeout(() => {
        setSuccessMsg("");
        setIsSubmitting(false);
      }, 4000)
      setIsSubmitting(true);
    } catch(e) {
      console.log(e);
    }
  }

  // reset input fields
  const onResetHandler = () => {
    reset({
      firstName:"",
      lastName:"",
      busAdd:""
    });
  }

  return (
    <form className='profile-form'>
      <div>
        {successMsg !== "" && <div className='success-container'>
          {successMsg}
        </div>}
      </div>
      <ProfileInput register={register} errors={errors} readOnlyVal={readOnlyVal.current} />
      <div className='button-section'>
        <AppButton onClick={handleSubmit(onSubmitHandler)} name={"Save"} cssname={"save"} isSubmitting={isSubmitting} />
        <AppButton onClick={handleSubmit(onResetHandler)} name={"Cancel"} cssname={"other"} />
      </div>
    </form>
  )
}

export default ProfileForm;

