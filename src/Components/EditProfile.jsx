import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SidebarPOS from './SidebarPOS'
import { useEffect } from 'react'
import {editProfileAPI} from '../Services/allAPIs'
import profileimg from '../assets/profileimage.png'
import SERVER_URL from '../Services/server_url'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';







function EditProfile() {

    const [userDetails,setUserDetails]=useState({username:"",email:"",password:"",profilePic:"",title:"",description:"",address:"",phone:"",city:"",country:"",linkedin:"",github:""})
    const [preview,setPreview]=useState("")
    const [existingImg,setExistingImg]=useState("")



    const navigate=useNavigate()

    useEffect(() => {
        if(sessionStorage.getItem("user"))
        {
            const existinguser=JSON.parse(sessionStorage.getItem("user"))
            setUserDetails({...userDetails,username:existinguser?.username,email:existinguser?.email,password:existinguser?.password,title:existinguser?.title,description:existinguser?.description,address:existinguser?.address,phone:existinguser?.phone,city:existinguser?.city,country:existinguser?.country,linkedin:existinguser?.linkedin,github:existinguser?.github})
            setExistingImg(existinguser?.profilePic)
        }
      
    }, [])

    useEffect(() => {
        if(userDetails.profilePic)
        {
            setPreview(URL.createObjectURL(userDetails.profilePic))
        }
        else
        {
            setPreview("")
        }
      
    }, [userDetails.profilePic])


    const handleUpdate=async()=>{
        const {username,email,password,profilePic,title,description,address,phone,city,country,linkedin,github}= userDetails
        if (github && linkedin && country && city && phone && address && description && title )
        {
          const reqBody= new FormData()
          reqBody.append("username",username)
          reqBody.append("email",email)
          reqBody.append("password",password)
          reqBody.append("github",github)
          reqBody.append("title",title)
          reqBody.append("description",description)
          reqBody.append("address",address)
          reqBody.append("phone",phone)
          reqBody.append("city",city)
          reqBody.append("country",country)
          reqBody.append("linkedin",linkedin)
          preview? reqBody.append("profilePic",profilePic) : reqBody.append("profilePic",existingImg) 
  
          const token = sessionStorage.getItem("token")
            if (token){
              const reqHeader={
  
                "content-type":preview ? "multipart/form-data":"application/json",
                "authorization":`Bearer ${token}`
              }
              try
              {
                const result = await editProfileAPI(reqBody,reqHeader)
                console.log(result);
                if (result.status==200)
                {
                  navigate('/profile')
                  sessionStorage.setItem("user",JSON.stringify(result.data))
                  toast.success('Profile Updation Successful ...')
                  
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
          toast.warning("Please Enter The Fields Completely...")
  
        }
       }
    
    

  return (
    <>
    <Row>
    <Col lg={2}>
      <SidebarPOS/>
      </Col>

      <Col lg={10}>
      <div className="container-fluid bg-light" style={{ minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="d-flex align-items-start">
              <div className="col-md-4">
                <div className="text-center">
                <label>

                <input onChange={(e)=>setUserDetails({...userDetails,profilePic:e.target.files[0]})} style={{display:'none'}} type="file"/>
                {
                existingImg==""?
                <img className='w-75 rounded-circle ms-3 ' src={preview?preview:profileimg} alt=""  />
                :
                <img className='w-75 rounded-circle ms-3 ' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt=""  />
                }
                </label>
                </div>
              </div>

              <div className="col-md-8 ms-5">

                <div className="d-flex justify-content-end mb-2">
                    <Link to={'/profile'}><button  className="btn  text-decoration-none btn-secondary">
                    <i className="bi bi-arrow-left"></i>  Go Back
                  </button></Link>
                  
                </div>

                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label fw-bold">Name</label>
                  <div className="col-sm-9">
                    <input onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} value={userDetails?.username} type="text" className="form-control"  />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label fw-bold">Email</label>
                  <div className="col-sm-9">
                    <input onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} value={userDetails?.email} 
                      type="email"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label fw-bold">Title</label>
                  <div className="col-sm-9">
                    <input onChange={(e)=>setUserDetails({...userDetails,title:e.target.value})} value={userDetails?.title}   type="text" className="form-control" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label fw-bold">Description</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e)=>setUserDetails({...userDetails,description:e.target.value})} value={userDetails?.description}  />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label fw-bold">Address</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" onChange={(e)=>setUserDetails({...userDetails,address:e.target.value})} value={userDetails?.address}  />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label fw-bold">Phone</label>
                  <div className="col-sm-9">
                    <input type="tel" className="form-control"  onChange={(e)=>setUserDetails({...userDetails,phone:e.target.value})} value={userDetails?.phone}  />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label fw-bold">City</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control"  onChange={(e)=>setUserDetails({...userDetails,city:e.target.value})} value={userDetails?.city} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label fw-bold">Country</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control"  onChange={(e)=>setUserDetails({...userDetails,country:e.target.value})} value={userDetails?.country} />
                  </div>
                </div>
                
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label fw-bold">Linkedin</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control"  onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})} value={userDetails?.linkedin} />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label fw-bold">Github</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control"  onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})} value={userDetails?.github} />
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button onClick={handleUpdate} className="btn btn-primary">UPDATE PROFILE</button>
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

export default EditProfile