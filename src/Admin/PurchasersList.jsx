import React, { useContext, useEffect, useState } from 'react'
import SideBarAdmin from './SideBarAdmin'
import { Col, Row } from 'react-bootstrap'
import Delete from './AdminComponents/Delete'
import { getAllCompanyAPI } from '../Services/allAPIs'
import { deleteCompanyResponseContext } from '../Contexts/ContextAPI'
import Pgz from './AdminComponents/Pgz'
import '../Styles/admin-pages.css'

function PurchasersList() {

  const [allCompany,setallCompany]=useState([])
  const [searchKey,setSearchKey]=useState("")
  const {deleteCompanyResponse}=useContext(deleteCompanyResponseContext)
  
  useEffect(() => {
    getAllCompany()
  }, [searchKey,deleteCompanyResponse])
  
  const getAllCompany=async()=>{
        const token=sessionStorage.getItem("token")
        try {
          const reqHeader={
            "content-type":"application/json",
            "authorization":`Bearer ${token}`
          }
          const result=await getAllCompanyAPI(searchKey,reqHeader)
          if(result.status===200) {
            setallCompany(result.data)
          }
        } catch(err) {
          console.log(err);
        }
  }

  const [currentPage,setcurrentPage]=useState(1)
  const [itemPerPage]=useState(8)
  
  let endingIndex=currentPage*itemPerPage
  let startingIndex=endingIndex-itemPerPage
  let currentItems=allCompany.slice(startingIndex,endingIndex)

  return (
   <>
   <Row style={{ margin: 0 }}>
      <Col md={2} className="p-0">
        <SideBarAdmin/>
      </Col>

      <Col md={10} className="p-0">
        <div className="page-container p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #fce7f3 100%)' }}>
          <div className="page-header mb-4">
            <h1>Supplier Management</h1>
            <p>Manage all supplier companies</p>
          </div>
          <div className="modern-card p-4 mb-4">
            <div className="filter-section">
              <div className="search-box" style={{ maxWidth: '400px' }}>
                <i className="fas fa-search"></i>
                <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className="modern-input" placeholder="Search suppliers..." />
              </div>
            </div>
          </div>
          <div className="modern-card overflow-hidden">
            <div className="table-responsive">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Company Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.length > 0 ?
                    currentItems.map((item,index) => (
                      <tr key={item.id}>
                        <td><strong>{startingIndex+index+1}</strong></td>
                        <td>{item.companyname}</td>
                        <td>
                          <Delete information={item} insideCompanyList={true}/>
                        </td>
                      </tr>
                    )) :
                    <tr>
                      <td colSpan="3" className='text-center'>
                        <div className="empty-state">
                          <div className="empty-state-icon">🏢</div>
                          <p className="empty-state-title">No Suppliers Found</p>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
              {currentItems?.length>0 &&
                <div className="p-4" style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                  <Pgz totalitems={allCompany.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
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

export default PurchasersList