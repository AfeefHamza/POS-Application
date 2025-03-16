import React, { useContext, useEffect, useState } from 'react'
import SideBarAdmin from './SideBarAdmin'
import { Col, Row } from 'react-bootstrap'
import Delete from './AdminComponents/Delete'
import { getAllBrandAPI } from '../Services/allAPIs'
import { deleteBrandResponseContext } from '../Contexts/ContextAPI'
import Pgz from './AdminComponents/Pgz'

function BrandList() {
    const [allBrands,setallBrands]=useState([])
    const [searchKey,setSearchKey]=useState("")

    const {deleteBrandResponse,setdeleteBrandResponse}=useContext(deleteBrandResponseContext)

    const [currentPage,setcurrentPage]=useState(1)
    const [itemPerPage,setitemPerPage]=useState(8)

    useEffect(() => {
     getAllBrand()
    }, [searchKey,deleteBrandResponse])

  const getAllBrand=async()=>{
        const token=sessionStorage.getItem("token")
        try {
          const reqHeader={
            "content-type":"application/json",
            "authorization":`Bearer ${token}`
          }
          const result=await getAllBrandAPI(searchKey,reqHeader)
          if(result.status==200) {
            setallBrands(result.data)
          }
        }
        catch(err) {
          console.log(err);
        }
  }

  let endingIndex=currentPage*itemPerPage
  let startingIndex=endingIndex-itemPerPage
  let currentItems=allBrands.slice(startingIndex,endingIndex)

  return (
    <>
     <Row>
      <Col lg={2}>
      <SideBarAdmin/>
      </Col>

      <Col lg={10}>
      <div className="container-fluid bg-light p-4" style={{ background: 'linear-gradient(135deg,rgb(204, 214, 233), #e0f2fe)'}}>
        <div className="row">
          <div className="col-md-12">
            <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: '#e6f7ff' }}>
              <div className="card-body" >
                <div className="row mb-4">
                  <div className="col-md-12 d-flex justify-content-end">
                    <div className="input-group" style={{ maxWidth: '300px' }}>
                      <span className="input-group-text bg-primary text-white">
                        <i className="fas fa-search"></i>
                      </span>
                      <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className="form-control" placeholder="Search Brand..." />
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead className="table-primary">
                      <tr>
                        <th>#</th>
                        <th>Brand</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {currentItems?.length > 0 ?
                      currentItems.map((item,index) => (
                        <tr key={index}>
                          <td>{startingIndex+index+1}</td>
                          <td>{item.name}</td>
                          <td>
                            <Delete info={item} insideBrandList={true}/>
                          </td>
                        </tr>
                      ))
                      :
                      <tr>
                        <td colSpan="3" className='text-danger text-center'>Nothing To Display...</td>
                      </tr>
                    }
                    </tbody>
                  </table>
                  {
                    currentItems?.length>0 &&
                    <Pgz totalitems={allBrands.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
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

export default BrandList
