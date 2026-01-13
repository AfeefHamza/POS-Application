import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SidebarPOS from '../Components/SidebarPOS'
import { getUserTotalAmountAPI, getUserTotalQuantityAPI } from '../Services/allAPIs'
import '../Styles/admin-pages.css'
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
    <Row style={{ margin: 0 }}>
      <Col md={2} className="p-0">
      <SidebarPOS/>
      </Col>

      <Col md={10} className="p-0"> 
      
      <div className="page-container p-4" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)'}}>
      <div style={{ marginBottom: '40px' }}>
        <div className="page-header mb-2">
          <h1 style={{ fontSize: '42px', marginBottom: '5px' }}>Welcome to Your Dashboard 👋</h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>Track your sales performance and inventory metrics</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>

        {/* Total Items Sold Card */}
        <div className="modern-card" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          border: 'none'
        }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', fontSize: '150px', opacity: '0.1' }}>🛒</div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', opacity: '0.9', margin: 0, marginBottom: '8px', fontWeight: '500' }}>TOTAL ITEMS SOLD</p>
                {userQuantity ? (
                <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0, marginBottom: '10px' }}>{userQuantity}</h1>
                ) 
                :
                (
                <h1 style={{ fontSize: '36px', margin: 0, marginBottom: '10px' }}>—</h1>
                )
                }
                <div style={{ fontSize: '12px', opacity: '0.85' }}>
                  <i className="fas fa-arrow-up me-1"></i>This period
                </div>
              </div>
              <div style={{ fontSize: '48px', opacity: '0.3' }}>📦</div>
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="modern-card" style={{ 
          background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          border: 'none'
        }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', fontSize: '150px', opacity: '0.1' }}>💰</div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', opacity: '0.9', margin: 0, marginBottom: '8px', fontWeight: '500' }}>TOTAL REVENUE</p>
                {userAmount ? (
                <h1 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0, marginBottom: '10px' }}>₹{userAmount}</h1>
                ) 
                :
                (
                <h1 style={{ fontSize: '36px', margin: 0, marginBottom: '10px' }}>—</h1>
                )
                }
                <div style={{ fontSize: '12px', opacity: '0.85' }}>
                  <i className="fas fa-chart-line me-1"></i>Revenue earned
                </div>
              </div>
              <div style={{ fontSize: '48px', opacity: '0.3' }}>📊</div>
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="modern-card" style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          border: 'none'
        }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', fontSize: '150px', opacity: '0.1' }}>⚡</div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <p style={{ fontSize: '13px', opacity: '0.9', margin: 0, marginBottom: '8px', fontWeight: '500' }}>STATUS</p>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: 0, marginBottom: '10px' }}>ACTIVE</h1>
                <div style={{ fontSize: '12px', opacity: '0.85' }}>
                  <i className="fas fa-check-circle me-1"></i>System operational
                </div>
              </div>
              <div style={{ fontSize: '48px', opacity: '0.3' }}>✓</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="modern-card p-5" style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
          <i className="fas fa-rocket me-2" style={{ color: '#667eea' }}></i>Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <Link to={'/allproducts'} style={{ textDecoration: 'none' }}>
            <button className="modern-btn modern-btn-primary w-100" style={{ justifyContent: 'center' }}>
              <i className="fas fa-plus me-2"></i>New Sale
            </button>
          </Link>
          <Link to={'/allproducts'} style={{ textDecoration: 'none' }}>
            <button className="modern-btn modern-btn-info w-100" style={{ justifyContent: 'center' }}>
              <i className="fas fa-eye me-2"></i>View Products
            </button>
          </Link>
          <Link to={'/create-customer'} style={{ textDecoration: 'none' }}>
            <button className="modern-btn modern-btn-success w-100" style={{ justifyContent: 'center' }}>
              <i className="fas fa-user-plus me-2"></i>Add Customer
            </button>
          </Link>
          <Link to={'/sales-report'} style={{ textDecoration: 'none' }}>
            <button className="modern-btn modern-btn-warning w-100" style={{ justifyContent: 'center' }}>
              <i className="fas fa-download me-2"></i>Reports
            </button>
          </Link>
        </div>
      </div>

      {/* Info Cards Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div className="modern-card p-4" style={{ borderLeft: '4px solid #667eea' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#667eea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px' }}>
              📈
            </div>
            <h4 style={{ margin: 0, marginLeft: '12px', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>Performance</h4>
          </div>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>Track your sales performance and growth metrics in real-time</p>
        </div>

        <div className="modern-card p-4" style={{ borderLeft: '4px solid #ec4899' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px' }}>
              💳
            </div>
            <h4 style={{ margin: 0, marginLeft: '12px', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>Transactions</h4>
          </div>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>Manage all your transactions and payment records securely</p>
        </div>

        <div className="modern-card p-4" style={{ borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px' }}>
              ⚙️
            </div>
            <h4 style={{ margin: 0, marginLeft: '12px', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>Settings</h4>
          </div>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>Customize your account settings and preferences</p>
        </div>
      </div>
      </div>
      
     
     
      </Col>
    </Row>
    </>
    
  )
}

export default Dashboard