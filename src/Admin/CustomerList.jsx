import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SideBarAdmin from './SideBarAdmin'
import Delete from './AdminComponents/Delete'
import { getAllCustomersAPI } from '../Services/allAPIs'
import { deleteCustomerResponeContext } from '../Contexts/ContextAPI'
import Pgz from './AdminComponents/Pgz'

function CustomerList() {
  const [allCustomers,setallCustomers]=useState([])
  const {deleteCustomerResponse,setdeleteCustomerResponse}=useContext(deleteCustomerResponeContext)
  const [searchKey,setSearchKey]=useState("")

  useEffect(() => {
    getAllCustomer()
  }, [searchKey,deleteCustomerResponse])

  const getAllCustomer=async()=>{
    const token=sessionStorage.getItem("token")
    try {
      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
      const result=await getAllCustomersAPI(searchKey,reqHeader)
      console.log(result)
      if(result.status==200) {
        setallCustomers(result.data)
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
  let currentItems=allCustomers.slice(startingIndex,endingIndex)

  return (
    <>
    <Row>
      <Col lg={2}>
        <SideBarAdmin/>
      </Col>

      <Col lg={10}>
        <div className="container-fluid bg-light p-4" style={{ background: 'linear-gradient(135deg,rgb(233, 236, 242),rgb(72, 103, 124))'}}>
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body" style={{ backgroundColor: '#e6f7ff' }}>
                  <div className="row mb-4">
                    <div className="col-md-12 d-flex justify-content-end">
                      <div className="input-group" style={{ maxWidth: '300px' }}>
                        <span className="input-group-text bg-primary text-white">
                          <i className="fas fa-search"></i>
                        </span>
                        <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className="form-control" placeholder="Search Customer..." />
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="table-primary">
                        <tr>
                          <th>#</th>
                          <th>Customer Name</th>
                          <th>Location</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentItems?.length > 0 ?
                        currentItems.map((item,index) => (
                          <tr key={index}>
                            <td>{startingIndex+index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.location}</td>
                            <td>
                              <Delete customerData={item} insideCustomerList={true}/>
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
                      <Pgz totalitems={allCustomers.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
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

export default CustomerList
