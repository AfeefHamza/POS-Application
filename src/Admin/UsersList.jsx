import React, { useContext, useEffect, useState } from 'react'
import { getAllUsersAPI } from '../Services/allAPIs'
import { Col, Row } from 'react-bootstrap'
import SideBarAdmin from './SideBarAdmin'
import Delete from './AdminComponents/Delete'
import { deleteUserResponeContext } from '../Contexts/ContextAPI'
import Pgz from './AdminComponents/Pgz'
import '../Styles/admin-pages.css'

function UsersList() {
  const [allUsers,setallUsers]=useState([])
  const {deleteUserResponse,setdeleteUserResponse}=useContext(deleteUserResponeContext)

  useEffect(() => {
    getAllUsers()
  }, [deleteUserResponse])

  const getAllUsers=async()=>{
    const token=sessionStorage.getItem("token")
    try {
      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
      const result=await getAllUsersAPI(reqHeader)
      if(result.status==200) {
        setallUsers(result.data)
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  const [currentPage,setcurrentPage]=useState(1)
  const [itemPerPage,setitemPerPage]=useState(8)

  let endingIndex=currentPage*itemPerPage
  let startingIndex=endingIndex-itemPerPage
  let currentItems=allUsers.slice(startingIndex,endingIndex)

  return (
    <>
    <Row style={{ margin: 0 }}>
      <Col md={2} className="p-0">
        <SideBarAdmin/>
      </Col>

      <Col md={10} className="p-0">
        <div className="page-container p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f3e8ff 100%)' }}>
          <div className="page-header mb-4">
            <h1>User Management</h1>
            <p>Manage all registered users and administrators</p>
          </div>
          <div className="modern-card overflow-hidden">
            <div className="table-responsive">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {currentItems?.length > 0 ?
                  currentItems.map((item,index) => (
                    <tr key={index}>
                      <td><strong>{startingIndex+index+1}</strong></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ 
                            width: '32px', 
                            height: '32px', 
                            borderRadius: '50%', 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '14px'
                          }}>
                            {item.username?.charAt(0)?.toUpperCase()}
                          </div>
                          <span>{item.username}</span>
                        </div>
                      </td>
                      <td>{item.email}</td>
                      <td>
                        <Delete userdata={item} insideUserList={true} />
                      </td>
                    </tr>
                  ))
                  :
                  <tr>
                    <td colSpan="4" className='text-center'>
                      <div className="empty-state">
                        <div className="empty-state-icon">👤</div>
                        <p className="empty-state-title">No Users Found</p>
                      </div>
                    </td>
                  </tr>
                }
                </tbody>
              </table>
              {
                currentItems?.length>0 &&
                <div className="p-4" style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                  <Pgz totalitems={allUsers.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
                </div>
              }
            </div>
          </div>
        </div>
      </Col>
    </Row>
    </>
  )
}

export default UsersList
