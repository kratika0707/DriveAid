
import './App.css';
import DHome from './Components/DealerHome/DHome';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Navbar from './Components/Withoutlogin/Navbar/Navbar';
import Home from './Components/Withoutlogin/Home/Home';
import Register from './Components/Withoutlogin/Register/Register';
import DealerLogin from './Components/Withoutlogin/Register/DealerLogin';
import MechanicLogin from './Components/Withoutlogin/Register/MechanicLogin';
import MHome from './Components/MechanicHome/MHome';
import Notification from './Components/Dealer/Notifications/Notification';
import Mechadd from './Components/Dealer/Mechanicadd/Mechadd';
import Mechanics from './Components/Dealer/Mechanicadd/Mechanics';
import Servicehistory from './Components/Dealer/Servicehistory/Servicehistory';
import Servicesdealer from './Components/Dealer/Servicehistory/Servicesdealer';
import MechNotification from './Components/Mechanic/MechNotifications';
import Servicedetails from './Components/Mechanic/Services/Servicedetails';

import './Components/fontawesome';
import Bikes from './Components/Buying/Bikes';
import Footer from './Components/Withoutlogin/Footer/Footer';
import MechServiceHistory from './Components/Mechanic/Services/MechServiceHistory';
import Profile from './Components/Mechanic/Profile/Profile';
import DProfile from './Components/Dealer/Profile/DProfile';
import BuyHome from './Components/Buying/BuyHome/BuyHome';
import OrderHistory from './Components/Buying/Order/Orderhistory';
import AddProductForm from './Components/Buying/AddProductForm';
import Cart from './Components/Buying/Cart/Cart';
import Checkout from './Components/Buying/Order/Checkout';
import CompleteService from './Components/Mechanic/Services/CompleteService';
import Productdetails from './Components/Buying/Product/Productdetails';
function App() {
  return (

    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/dealer/register" element={<Register/>}/>
          <Route path="/dealer/login" element={<DealerLogin/>}/>
          <Route path='/dealer/:dealerId' element={<DHome/>}/>
          <Route path='/mechanic/login' element={<MechanicLogin/>}/>
          <Route path='/mechanic/:mechanicId' element={<MHome/>}/>
          <Route path="/dealer/notifications/:dealerId" element={<Notification/>}/>
          <Route path='/dealer/mechanicadd/:dealerId' element={<Mechadd/>}/>
          <Route path='/dealer/mechanics/:dealerId' element={<Mechanics/>}/>
          <Route path='/dealer/services/:dealerId' element={<Servicesdealer/>}/>
          <Route path='/dealer/notifications/:dealerId/dealer/service/:serviceId' element={<Servicehistory/>}/>
          <Route path='/dealer/notifications/:dealerId/dealer/service/:serviceId/:serviceId' element={<Servicehistory/>}/>
          <Route path='/mechanic/notifications/:mechanicId' element={<MechNotification/>}/>
          <Route path='/mechanic/service/:serviceId' element={<Servicedetails/>}/>
          
          <Route path='/buyparts/:mechanicId' element={<BuyHome/>}/>
          <Route path='/mechanic/servicehistory/:mechanicId' element={<MechServiceHistory/>}/>
          <Route path='/mechanic/profile/:mechanicId' element={<Profile/>}/>
          <Route path='/dealer/profile/:dealerId' element={<DProfile/>}/>
          <Route path='/:mechanicId/orderhistory' element ={<OrderHistory/>}/>
          <Route path='/productform' element={<AddProductForm/>}/>
          <Route path='/cart/:mechanicId' element={<Cart/>}/>
          <Route path='/checkout/:mechanicId' element={<Checkout/>}/>
          <Route path='/completeservice/:serviceId' element={<CompleteService/>}/>
          <Route path='/productdetail/:mechanicId/:productId' element={<Productdetails/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
