import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SidebarPOS from '../Components/SidebarPOS'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import SERVER_URL from '../Services/server_url'
import profileimg from '../assets/profileimage.png'
import '../Styles/admin-pages.css'






function Profile() {

  const [userDetails,setUserDetails]=useState([])
  const [existingImg,setExistingImg]=useState("")
      const [preview,setPreview]=useState("")
  
  
  
  


  useEffect(() => {
          if(sessionStorage.getItem("user"))
          {
              const existinguser=JSON.parse(sessionStorage.getItem("user"))
              setUserDetails({...userDetails,username:existinguser?.username,email:existinguser?.email,password:existinguser?.password,title:existinguser?.title,description:existinguser?.description,address:existinguser?.address,phone:existinguser?.phone,city:existinguser?.city,country:existinguser?.country,linkedin:existinguser?.linkedin,github:existinguser?.github})
              setExistingImg(existinguser?.profilePic)


          }
        
      }, [])

  
  return (
    <>
    <Row style={{ margin: 0 }}>
      <Col md={2} className="p-0">
      <SidebarPOS/>
      </Col>

      <Col md={10} className="p-0">

      <div className="page-container p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f3e8ff 100%)', minHeight: '100vh' }}>
      <div className="page-header mb-4">
        <h1>My Profile</h1>
        <p>View and manage your account information</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="modern-card p-5">
            <div className="text-center mb-4">
            {
                existingImg==""?
                <img className='rounded-circle' src={preview?preview:profileimg} alt="profile" style={{ width: '120px', height: '120px', objectFit: 'cover', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                :
                <img className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="profile" style={{ width: '120px', height: '120px', objectFit: 'cover', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                }
            </div>

            <div className="d-flex justify-content-center mb-4">
              <Link to={'/edit-profile'}><button className="modern-btn modern-btn-primary">
                <i className="fas fa-edit me-2"></i>Edit Profile
              </button></Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', marginBottom: '5px' }}>Full Name</p>
                <p style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{userDetails?.username}</p>
              </div>
              <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', marginBottom: '5px' }}>Email</p>
                <p style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{userDetails?.email}</p>
              </div>
              <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', marginBottom: '5px' }}>Job Title</p>
                <p style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{userDetails?.title || 'N/A'}</p>
              </div>
              <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', marginBottom: '5px' }}>Status</p>
                <span style={{ display: 'inline-block', padding: '4px 12px', background: '#10b981', color: 'white', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>ACTIVE</span>
              </div>
              <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', marginBottom: '5px' }}>Phone</p>
                <p style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{userDetails?.phone || 'N/A'}</p>
              </div>
              <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', marginBottom: '5px' }}>City</p>
                <p style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{userDetails?.city || 'N/A'}</p>
              </div>
              <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', marginBottom: '5px' }}>Address</p>
                <p style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{userDetails?.address || 'N/A'}</p>
              </div>
              <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '600', marginBottom: '5px' }}>Country</p>
                <p style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>{userDetails?.country || 'N/A'}</p>
              </div>
            </div>

            <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #e5e7eb' }}>
              <h5 style={{ color: '#1f2937', fontWeight: '600', marginBottom: '15px' }}>About</h5>
              <p style={{ color: '#6b7280', lineHeight: '1.6', fontSize: '15px' }}>{userDetails?.description || 'No description added yet.'}</p>
            </div>

            <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {userDetails?.linkedin && (
                <a href={userDetails?.linkedin} target="_blank" rel="noopener noreferrer" className="modern-btn modern-btn-info" style={{ textAlign: 'center' }}>
                  <i className="fab fa-linkedin me-2"></i>LinkedIn
                </a>
              )}
              {userDetails?.github && (
                <a href={userDetails?.github} target="_blank" rel="noopener noreferrer" className="modern-btn modern-btn-primary" style={{ textAlign: 'center' }}>
                  <i className="fab fa-github me-2"></i>GitHub
                </a>
              )}
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

export default Profile