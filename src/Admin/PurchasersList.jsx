import React, { useContext, useEffect, useState } from 'react'
import SideBarAdmin from './SideBarAdmin'
import { Col, Row } from 'react-bootstrap'
import Delete from './AdminComponents/Delete'
import { getAllCompanyAPI } from '../Services/allAPIs'
import { deleteCompanyResponseContext } from '../Contexts/ContextAPI'
import Pgz from './AdminComponents/Pgz'

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
   <Row>
      <Col lg={2}>
        <SideBarAdmin/>
      </Col>

      <Col lg={10}>
        <div className="container-fluid p-4" style={{ background: 'linear-gradient(135deg,rgb(103, 115, 139), #e0f2fe)' }}>
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow-lg border-0 rounded-4"style={{ backgroundColor: '#e6f7ff' }}>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-12 d-flex justify-content-end">
                      <div className="input-group" style={{ maxWidth: '300px' }}>
                        <span className="input-group-text bg-primary text-white">
                          <i className="fas fa-search"></i>
                        </span>
                        <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className="form-control" placeholder="Search Company..." />
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead className="table-primary text-white">
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
                              <td>{startingIndex+index+1}</td>
                              <td>{item.companyname}</td>
                              <td>
                                <Delete information={item} insideCompanyList={true}/>
                              </td>
                            </tr>
                          )) :
                          <tr>
                            <td colSpan="3" className='text-center text-danger'>Nothing To Display...</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                    {currentItems?.length>0 &&
                      <Pgz totalitems={allCompany.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
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

export default PurchasersList