import './App.scss';
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';

import { onAuthStateChangedListener } from './utils/firebase';

import AuthNavigation from './routes/AuthNavigation/authNavigation.component';
import Login from './routes/Login/login.component';
import Signup from './routes/signup/signup.component';
import Navigation from './routes/Navigation/navigation.component';
import Profile from './routes/profile/profile.component';
import TaxApp from './routes/taxApp/taxApp.component';
import TaxForm from './routes/taxForm/taxForm.component';
import SuccessPage from './routes/successPage/successPage.component';
import ForgotPassword from './routes/forgotPassword/forgotPassword.component';
import AccountPage  from './routes/accountPage/accountPage';
import PayUploadPage from './routes/payUpload/payUpload.component';

function App() {

  useEffect(() => {
    const subscribe = onAuthStateChangedListener((user) => {
      if (user){
        const uid = user.uid;
      }
    })

    return subscribe;
  }, [])

  return (
    <Routes>
      <Route path='/'  element={<AuthNavigation />}>
        <Route index element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Route>
      <Route path='/app' element={<Navigation />}>
        <Route index element={<Profile />} />
        <Route path='/app/tax' element={<TaxApp />}>
          <Route index element={<TaxForm />} />
          <Route path='/app/tax/business' element={<TaxForm />} />
          <Route path='/app/tax/receipt' element={<TaxForm />} />
        </Route>
        <Route path='/app/accountPage' element={<AccountPage />} />
        <Route path='/app/payUploadPage' element={<PayUploadPage />} />
        <Route path='/app/success' element={<SuccessPage />} />
      </Route>
    </Routes>
  )
}

export default App
