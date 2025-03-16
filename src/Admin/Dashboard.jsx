import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SideBarAdmin from '../Admin/SideBarAdmin'
import { getTotalAmountAPI, getTotalQuantityAPI, getTotalStockAPI } from '../Services/allAPIs'
getTotalAmountAPI





function Dashboard() {
  const [totalStock,settotalStock]=useState('')
      // console.log(totalStock);

      const [totalQuantity,settotalQuantity]=useState('')
      // console.log(totalQuantity);

      const [totalAmount,settotalAmount]=useState('')
      // console.log(totalAmount);

      useEffect(() => {
        getTotalStock()
        getTotalQuantity()
        getTotalAmount()
      }, [])

      

  const getTotalStock=async()=>{

    const token=sessionStorage.getItem("token")
     try
     {
        const reqHeader={
            "content-type":"application/json",
            "authorization":`Bearer ${token}`
          }
          const result=await getTotalStockAPI(reqHeader)
        //   console.log(result);
        if(result.status==200)
            {
              settotalStock(result.data.totalStock)
            }
     }
     catch(err)
     {
        console.log(err);

     }

 }  

 const getTotalQuantity=async()=>{

  const token=sessionStorage.getItem("token")
   try
   {
      const reqHeader={
          "content-type":"application/json",
          "authorization":`Bearer ${token}`
        }
        const result=await getTotalQuantityAPI(reqHeader)
      //   console.log(result);
      if(result.status==200)
          {
            settotalQuantity(result.data.totalQuantity)
          }
   }
   catch(err)
   {
      console.log(err);

   }

}  

const getTotalAmount=async()=>{

  const token=sessionStorage.getItem("token")
   try
   {
      const reqHeader={
          "content-type":"application/json",
          "authorization":`Bearer ${token}`
        }
        const result=await getTotalAmountAPI(reqHeader)
      //   console.log(result);
      if(result.status==200)
          {
            settotalAmount(result.data.totalAmount)
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
      <SideBarAdmin/>
      </Col>

      <Col lg={10} > 
      
      <div className="p-4 rounded">
      <div className="row justify-content-center  ">
        <div className="col-md-3 mb-3 ">
          <div className="card shadow-sm bg-white">
            <div className="card-body text-center">
              <h5 className="card-title text-black fw-bold">Total Stock</h5>
              {totalStock ? (
              <p className="card-text display-4 text-black fw-bold">{totalStock}</p>

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
          <div className="card shadow-sm bg-white ">
            <div className="card-body text-center">
              <h5 className="card-title text-black fw-bold">Total Item Sell</h5>
              {totalQuantity ? (
              <p className="card-text display-4 text-black fw-bold">{totalQuantity}</p>

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
              {totalAmount ? (
              <p className="card-text display-4 text-black fw-bold">{totalAmount}</p>
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