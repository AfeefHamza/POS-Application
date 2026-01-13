import './App.css'
import './Styles/responsive.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Authorization from './Pages/Authorization'
import Home from './Pages/Home'
import Sales from './Pages/Sales'
import Profile from './Pages/Profile'
import Dashboard from './Admin/Dashboard'
import CreateProdcut from './Admin/CreateProduct'
import AdminProducts from './Admin/AdminProducts'
import DashboardUser from './Pages/DashboardUser'
import PurchasersList from './Admin/PurchasersList'
import CustomerList from './Admin/CustomerList'
import Products from './Pages/Products'
import CategoryList from './Admin/CategoryList'
import BrandList from './Admin/BrandList'
import EditProfile from './Components/EditProfile'
import CreateCustomer from './Pages/CreateCustomer'
import UsersList from './Admin/UsersList'
import { useContext } from 'react'
import { authorizationContext } from './Contexts/AuthorizationContext'

























function App() {




  return (
    <>

<ToastContainer position="top-right" autoClose={5000} theme="colored" />

      
      <Routes>
        <Route path='/login' element={<Authorization/>}  />
        <Route path='/register' element={<Authorization insideRegister={true}/>}/>
        <Route path='/' element={<Home/>}  />


        <Route path='/dashboardAdmin' element={<Dashboard/>}/>
        <Route path='/create-product' element={<CreateProdcut/>}/>
        <Route path='/products' element={<AdminProducts/>}  />
        <Route path='/customers-list' element={<CustomerList/>}  />
        <Route path='/purchasers-list' element={<PurchasersList/>}  />
        <Route path='/category-list' element={<CategoryList/>}  />
        <Route path='/brand-list' element={<BrandList/>}  />
        <Route path='/users-list' element={<UsersList/>} />





        <Route path='/dashboardUser' element={<DashboardUser/>}/>
        <Route path='/allproducts' element={<Products/>}/>
        <Route path='/sales-report' element={<Sales/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/edit-profile' element={<EditProfile/>}/>
        <Route path='/create-customer' element={<CreateCustomer/>}/>

        




      </Routes>
      
    
    
    


     
    </>
  )
}

export default App
