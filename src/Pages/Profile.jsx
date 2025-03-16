import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SidebarPOS from '../Components/SidebarPOS'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import SERVER_URL from '../Services/server_url'
import profileimg from '../assets/profileimage.png'






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
    <Row>
      <Col lg={2}>
      <SidebarPOS/>
      </Col>

      <Col lg={10}>

      <div className="container-fluid bg-light" style={{ minHeight: '100vh' }}>
      <div className="container p-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="text-center">
            {
                existingImg==""?
                <img className='w-25 rounded-circle ms-3 ' src={preview?preview:profileimg} alt=""  />
                :
                <img className='w-25 rounded-circle ms-3 w' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt=""  />
                }
            </div>

            <div className="d-flex justify-content-center mb-3">
              <Link to={'/edit-profile'}><button  className="btn btn-primary me-2">
                <i  className="bi bi-pencil-square"></i> Edit Profile
              </button></Link>
              
            </div>

            <div className="card shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4 fw-bold">Name</div>
                  <div  className="col-md-8">{userDetails?.username}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4 fw-bold">Email</div>
                  <div className="col-md-8">{userDetails?.email}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4 fw-bold">Title</div>
                  <div className="col-md-8">{userDetails?.title}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4 fw-bold">Description</div>
                  <div className="col-md-8">{userDetails?.description}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4 fw-bold">Status</div>
                  <div className="col-md-8">ACTIVE</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4 fw-bold">Address</div>
                  <div className="col-md-8">{userDetails?.address}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4 fw-bold">Phone</div>
                  <div className="col-md-8">{userDetails?.phone}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4 fw-bold">City</div>
                  <div  className="col-md-8">{userDetails?.city}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4 fw-bold">Country</div>
                  <div className="col-md-8">{userDetails?.country}</div>
                </div>                
                <hr />
                <div className="row">
                  <div className="col-md-4 fw-bold">Linkedin</div>
                  <div className="col-md-8">{userDetails?.linkedin}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4 fw-bold">Github</div>
                  <div className="col-md-8">{userDetails?.github}</div>
                </div>
              </div>
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