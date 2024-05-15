import './App.scss';
import {Routes, Route} from 'react-router-dom';
import AuthNavigation from './routes/AuthNavigation/authNavigation.component';
import Login from './routes/Login/login.component';
import Signup from './routes/signup/signup.component';
import Navigation from './routes/Navigation/navigation.component';
import Profile from './routes/profile/profile.component';
import TaxApp from './routes/taxApp/taxApp.component';
import TaxForm from './routes/taxForm/taxForm.component';
import SuccessPage from './routes/successPage/successPage.component';

function App() {

  return (
    <Routes>
      <Route path='/auth'  element={<AuthNavigation />}>
        <Route index element={<Login />} />
        <Route path='/auth/signup' element={<Signup />} />
      </Route>
      <Route path='/app' element={<Navigation />}>
        <Route index element={<Profile />} />
        <Route path='/app/tax' element={<TaxApp />}>
          <Route index element={<TaxForm />} />
          <Route path='/app/tax/business' element={<TaxForm />} />
          <Route path='/app/tax/receipt' element={<TaxForm />} />
        </Route>
        <Route path='/app/success' element={<SuccessPage />} />
      </Route>
    </Routes>
  )
}

export default App
