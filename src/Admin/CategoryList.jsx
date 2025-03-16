import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SideBarAdmin from './SideBarAdmin'
import Delete from './AdminComponents/Delete'
import { getAllCategoryAPI } from '../Services/allAPIs'
import { deleteCategoryResponseContext } from '../Contexts/ContextAPI'
import Pgz from './AdminComponents/Pgz'




function CategoryList() {

    const [allCategorys,setallCategorys]=useState([])
    const {deleteCategoryResponse,setdeleteCategoryResponse}=useContext(deleteCategoryResponseContext)

    const [searchKey,setSearchKey]=useState("")

    useEffect(() => {
      getAllCategory()
    }, [searchKey,deleteCategoryResponse])

  const getAllCategory=async()=>{
        const token=sessionStorage.getItem("token")
            try
            {
              const reqHeader={
                "content-type":"application/json",
                "authorization":`Bearer ${token}`
              }

              const result=await getAllCategoryAPI(searchKey,reqHeader)
              if(result.status==200)
              {
                setallCategorys(result.data)
              }
            }
            catch(err)
            {
              console.log(err);
            }
      }

       const [currentPage,setcurrentPage]=useState(1)
       const [itemPerPage,setitemPerPage]=useState(8)

       let endingIndex=currentPage*itemPerPage
       let startingIndex=endingIndex-itemPerPage
       let currentItems=allCategorys.slice(startingIndex,endingIndex)

  return (
    <>
     <Row>
      <Col lg={2}>
      <SideBarAdmin/>
      </Col>

      <Col lg={10}>
      <div className="container-fluid bg-light p-4" style={{background: 'linear-gradient(135deg,rgb(110, 130, 172), #e0f2fe)' }}>
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: '#e6f7ff' }}>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-12 d-flex justify-content-end">
                  <div className="input-group" style={{ maxWidth: '300px' }}>
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                    <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className="form-control" placeholder="Search Category..." />
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="table-primary">
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {currentItems?.length > 0 ?
               currentItems.map((item,index) => (
                <tr>
                <td>{startingIndex+index+1}</td>
                <td>{item.name}</td>
                <td>
                 <Delete data={item} insideCategoryList={true}/>
                </td>
                </tr>
               ))
               :
              <td className='text-danger'>Nothing To Display...</td>
               }
                  </tbody>
                </table>
                {
                currentItems?.length>0 &&
                <Pgz totalitems={allCategorys.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
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

export default CategoryList
