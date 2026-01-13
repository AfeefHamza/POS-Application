import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import SidebarPOS from '../Components/SidebarPOS';
import { addCustomerAPI } from '../Services/allAPIs';
import { toast } from 'react-toastify';
import '../Styles/admin-pages.css';







function CreateCustomer() {

    const [customerDetails,setcustomerDetails]=useState({name:"",location:""})
    // console.log(customerDetails);

    const addCustomer=async()=>{
          const {name,location}= customerDetails
          if(name && location)
          {
            const reqBody=new FormData()
            reqBody.append("name",name)
            reqBody.append("location",location)

            const token=sessionStorage.getItem("token")
            if (token)
            {
              const reqHeader={
                "content-type":"application/json",
                "authorization":`Bearer ${token}`
              }
              try
              {
                  const result = await addCustomerAPI(reqBody,reqHeader)
                //   console.log(result);
                  if(result.status==200)
                  {
                      toast.success('Customer Added Successfully')
                      setcustomerDetails({name:"",location:""})

                  }
                  else
                          {
                            if(result.status==406)
                            {
                              toast.error('Customer Already Exists')
                              setcustomerDetails({name:"",location:""})
                            }
                          }
                  
              }
              catch(err)
              {
                console.log(err);
              }
            }
              
          }
          else
          {
                  toast.warning('Fields Cannot Be Empty...')
            
          }
    
        }
  return (
    <>

    <Row style={{ margin: 0 }}>
      <Col md={2} className="p-0">
      <SidebarPOS/>
      </Col>

     

      <Col md={10} className="p-0">

            <div className="page-container p-4" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #fef3c7 100%)'}}>
            <div className="page-header mb-5">
              <h1>Add New Customer</h1>
              <p>Create a new customer entry for your sales</p>
            </div>
            <div className='d-flex justify-content-center'>
            <div className="form-card" style={{ maxWidth: '500px', width: '100%' }}>
            <h3 className="mb-4"><i className="fas fa-user-plus me-2"></i>Customer Information</h3>
            <div className="mb-3">
              <label className="form-label">Customer Name</label>
              <input onChange={(e)=>setcustomerDetails({...customerDetails,name:e.target.value})} value={customerDetails.name} type="text" className="modern-input" placeholder="Enter customer name" />
            </div>

            <div className="mb-4">
              <label className="form-label">Location</label>
              <input onChange={(e)=>setcustomerDetails({...customerDetails,location:e.target.value})} value={customerDetails.location} type="text" className="modern-input" placeholder="Enter location/address" />
            </div>
            <button onClick={addCustomer} className="modern-btn modern-btn-success w-100">
              <i className="fas fa-plus me-2"></i>CREATE CUSTOMER
            </button>
          </div>

            </div>

      </div>

      </Col>

      </Row>


    
    </>
  )
}

export default CreateCustomer