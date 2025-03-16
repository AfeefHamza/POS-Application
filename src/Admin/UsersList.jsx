import React, { useContext, useEffect, useState } from 'react'
import { getAllUsersAPI } from '../Services/allAPIs'
import { Col, Row } from 'react-bootstrap'
import SideBarAdmin from './SideBarAdmin'
import Delete from './AdminComponents/Delete'
import { deleteUserResponeContext } from '../Contexts/ContextAPI'
import Pgz from './AdminComponents/Pgz'

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
    <Row>
      <Col lg={2}>
        <SideBarAdmin/>
      </Col>

      <Col lg={10}>
        <div className="container-fluid bg-light p-4" style={{ background: 'linear-gradient(135deg,rgb(168, 229, 175), #e0f2fe)' }}>
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body" style={{ background: 'linear-gradient(135deg,rgb(204, 214, 233),rgb(179, 212, 193))' }}>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="table-primary">
                        <tr>
                          <th>#</th>
                          <th>Users</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentItems?.length > 0 ?
                        currentItems.map((item,index) => (
                          <tr key={index}>
                            <td>{startingIndex+index+1}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>
                              <Delete userdata={item} insideUserList={true} />
                            </td>
                          </tr>
                        ))
                        :
                        <tr>
                          <td colSpan="4" className='text-danger text-center'>Nothing To Display...</td>
                        </tr>
                      }
                      </tbody>
                    </table>
                    {
                      currentItems?.length>0 &&
                      <Pgz totalitems={allUsers.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
                    }
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

export default UsersList
