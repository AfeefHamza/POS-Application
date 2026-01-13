import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SideBarAdmin from './SideBarAdmin'
import Delete from './AdminComponents/Delete'
import { getAllCustomersAPI } from '../Services/allAPIs'
import { deleteCustomerResponeContext } from '../Contexts/ContextAPI'
import Pgz from './AdminComponents/Pgz'
import '../Styles/admin-pages.css'

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
    <Row style={{ margin: 0 }}>
      <Col md={2} className="p-0">
        <SideBarAdmin/>
      </Col>

      <Col md={10} className="p-0">
        <div className="page-container p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #fef3c7 100%)' }}>
          <div className="page-header mb-4">
            <h1>Customer Management</h1>
            <p>Manage all your customers</p>
          </div>
          <div className="modern-card p-4 mb-4">
            <div className="filter-section">
              <div className="search-box" style={{ maxWidth: '400px' }}>
                <i className="fas fa-search"></i>
                <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className="modern-input" placeholder="Search customers..." />
              </div>
            </div>
          </div>
          <div className="modern-card overflow-hidden">
            <div className="table-responsive">
              <table className="modern-table">
                <thead>
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
                      <td><strong>{startingIndex+index+1}</strong></td>
                      <td>{item.name}</td>
                      <td>{item.location}</td>
                      <td>
                        <Delete customerData={item} insideCustomerList={true}/>
                      </td>
                    </tr>
                  ))
                  :
                  <tr>
                    <td colSpan="4" className='text-center'>
                      <div className="empty-state">
                        <div className="empty-state-icon">👥</div>
                        <p className="empty-state-title">No Customers Found</p>
                      </div>
                    </td>
                  </tr>
                }
                </tbody>
              </table>
              {
                currentItems?.length>0 &&
                <div className="p-4" style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                  <Pgz totalitems={allCustomers.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
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

export default CustomerList
