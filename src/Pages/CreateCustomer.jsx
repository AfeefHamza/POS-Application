import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import SidebarPOS from '../Components/SidebarPOS';
import { addCustomerAPI } from '../Services/allAPIs';
import { toast } from 'react-toastify';







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

    <Row>
      <Col lg={2}>
      <SidebarPOS/>
      </Col>

     

      <Col lg={10}>

            <div className='d-flex justify-content-center' style={{marginTop:"200px",  }} >
            <div className="card p-4 border rounded mb-3 w-50 ">
            <h5 className="mb-3">CREATE NEW CUSTOMER</h5>
            <div className="mb-3">
              <input onChange={(e)=>setcustomerDetails({...customerDetails,name:e.target.value})} value={customerDetails.name}    type="text" className="form-control" placeholder="Customer Name" />
            </div>

            <div className="mb-3">
              <input onChange={(e)=>setcustomerDetails({...customerDetails,location:e.target.value})} value={customerDetails.location}    type="text" className="form-control" placeholder="Location" />
            </div>
            <button onClick={addCustomer}   className="btn btn-success">CREATE CUSTOMER</button>
          </div>

            </div>

      </Col>

      </Row>


    
    </>
  )
}

export default CreateCustomer