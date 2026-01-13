import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SideBarAdmin from '../Admin/SideBarAdmin'
import { getTotalAmountAPI, getTotalQuantityAPI, getTotalStockAPI } from '../Services/allAPIs'
import '../Styles/admin-pages.css'
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
      <Row style={{ margin: 0 }}>
        <Col md={2} className="p-0">
          <SideBarAdmin />
        </Col>

        <Col md={10} className="p-0">
          <div className="page-container p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
            <div className="page-header mb-4">
              <h1>Dashboard Overview</h1>
              <p>Welcome to your business analytics center</p>
            </div>

            <div className="stats-grid">
              <div className="modern-card stat-card">
                <div className="stat-card-title">Total Stock</div>
                <div className="stat-card-value">
                  {totalStock ? totalStock : '-'}
                </div>
                <div className="stat-card-icon">📦</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '1rem' }}>
                  Items in inventory
                </div>
              </div>

              <div className="modern-card stat-card">
                <div className="stat-card-title">Total Items Sold</div>
                <div className="stat-card-value">
                  {totalQuantity ? totalQuantity : '-'}
                </div>
                <div className="stat-card-icon">🛒</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '1rem' }}>
                  Total units sold
                </div>
              </div>

              <div className="modern-card stat-card">
                <div className="stat-card-title">Total Revenue</div>
                <div className="stat-card-value">
                  ${totalAmount ? (totalAmount / 1000).toFixed(1) + 'K' : '-'}
                </div>
                <div className="stat-card-icon">💰</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '1rem' }}>
                  Total earnings
                </div>
              </div>
            </div>

            <div className="modern-card p-4">
              <h5 style={{ color: '#0f3460', fontWeight: '700', marginBottom: '1.5rem' }}>
                Quick Insights
              </h5>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>
                      Inventory Status
                    </p>
                    <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#10b981' }}>
                      {totalStock ? '✓ Good' : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div style={{ padding: '1rem', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '8px', borderLeft: '4px solid #00d4ff' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>
                      Sales Performance
                    </p>
                    <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#00d4ff' }}>
                      {totalQuantity ? '↗ Active' : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.9rem' }}>
                      Revenue Trend
                    </p>
                    <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#f59e0b' }}>
                      {totalAmount ? '📈 Growing' : 'N/A'}
                    </p>
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