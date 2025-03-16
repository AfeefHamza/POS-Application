import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SidebarPOS from '../Components/SidebarPOS'
import { getUserTotalAmountAPI, getUserTotalQuantityAPI } from '../Services/allAPIs'
getUserTotalAmountAPI





function Dashboard() {
  const [userQuantity,setuserQuantity]=useState('')
        // console.log(userQuantity);


        const [userAmount,setuserAmount]=useState('')
        // console.log(userAmount);

        useEffect(() => {
          getUserTotalQuantity()
          getUserTotalAmount()
        }, [])
        



        const getUserTotalQuantity=async()=>{
        
          const token=sessionStorage.getItem("token")
           try
           {
              const reqHeader={
                  "content-type":"application/json",
                  "authorization":`Bearer ${token}`
                }
                const result=await getUserTotalQuantityAPI(reqHeader)
              //   console.log(result);
              if(result.status==200)
                  {
                    setuserQuantity(result.data.totalQuantity)
                  }
           }
           catch(err)
           {
              console.log(err);
        
           }
        
        } 

        const getUserTotalAmount=async()=>{
        
          const token=sessionStorage.getItem("token")
           try
           {
              const reqHeader={
                  "content-type":"application/json",
                  "authorization":`Bearer ${token}`
                }
                const result=await getUserTotalAmountAPI(reqHeader)
              //   console.log(result);
              if(result.status==200)
                  {
                    setuserAmount(result.data.totalAmount)
                  }
           }
           catch(err)
           {
              console.log(err);
        
           }
        
        } 
  
  return (
    <>
    <Row style={{marginTop:"240px"}}>
      <Col lg={2}>
      <SidebarPOS/>
      </Col>

      <Col lg={10} > 
      
      <div className="p-4 rounded">
      <div className="row justify-content-center  ">

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm bg-white ">
            <div className="card-body text-center">
              <h5 className="card-title text-black fw-bold">Total Item Sell</h5>
              {userQuantity ? (
              <p className="card-text display-4 text-black fw-bold">{userQuantity}</p>
              ) 
              :
              (
              <h6>-</h6>
              )
              }
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-sm bg-white">
            <div className="card-body text-center">
              <h5 className="card-title text-black fw-bold">Total Revenue</h5>
              {userAmount ? (
              <p className="card-text display-4 text-black fw-bold">{userAmount}</p>
              ) 
              :
              (
              <h6>-</h6>
              )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  
     
     
      </Col>
    </Row>
    </>
    
  )
}

export default Dashboard