import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SidebarPOS from '../Components/SidebarPOS'
import Sell from '../Components/Sell'
import { getAllBrandAPI, getAllCategoryAPI, getAllProductsAPI } from '../Services/allAPIs'
import { sellQuantityResponeContext } from '../Contexts/ContextAPI'
import Pgz from '../Admin/AdminComponents/Pgz'

function Products() {

  const [allProducts,setallProducts]=useState([])
  const [allCategorys,setallCategorys]=useState([])
  const [allBrands,setallBrands]=useState([])
  const {sellQuantityResponse,setsellQuantityResponse}=useContext(sellQuantityResponeContext)
  const [dummyallProducts,setdummyallProducts]=useState([])
  const [searchKey,setSearchKey]=useState("")

   useEffect(() => {
     getAllProducts()
     getAllCategory()
     getAllBrand()
   }, [searchKey,sellQuantityResponse])

const getAllProducts=async()=>{
  const token=sessionStorage.getItem("token")
  try {
    const reqHeader={
      "content-type":"application/json",
      "authorization":`Bearer ${token}`
    }
    const result=await getAllProductsAPI(searchKey,reqHeader)
    if(result.status==200) {
      setallProducts(result.data)
      setdummyallProducts(result.data)
    }
  } catch(err) {
    console.log(err);
  }
}

const getAllCategory=async()=>{
  const token=sessionStorage.getItem("token")
  try {
    const reqHeader={
      "content-type":"application/json",
      "authorization":`Bearer ${token}`
    }
    const result=await getAllCategoryAPI("",reqHeader)
    if(result.status==200) {
      setallCategorys(result.data)
    }
  } catch(err) {
    console.log(err);
  }
}

const getAllBrand=async()=>{
  const token=sessionStorage.getItem("token")
  try {
    const reqHeader={
      "content-type":"application/json",
      "authorization":`Bearer ${token}`
    }
    const result=await getAllBrandAPI("",reqHeader)
    if(result.status==200) {
      setallBrands(result.data)
    }
  } catch(err) {
    console.log(err);
  }
}

const filterCategory=(category)=>{
  if(category === "Filter by Category") {
    setallProducts(dummyallProducts)
  } else {
    const filteredProducts = dummyallProducts.filter(item => item.category === category)
    setallProducts(filteredProducts)
  }
}

const filterBrand=(brand)=>{
  if(brand === "Filter by Brand") {
    setallProducts(dummyallProducts)
  } else {
    const filteredProducts = dummyallProducts.filter(item => item.brand === brand)
    setallProducts(filteredProducts)
  }
}

const [currentPage,setcurrentPage]=useState(1)
const [itemPerPage,setitemPerPage]=useState(8)
let endingIndex=currentPage*itemPerPage
let startingIndex=endingIndex-itemPerPage
let currentItems=allProducts.slice(startingIndex,endingIndex)

return (
  <>
    <Row>
      <Col lg={2}>
        <SidebarPOS/>
      </Col>

      <Col lg={10}>
        <div className="container-fluid bg-light p-4" style={{ backgroundColor: '#f0f8ff' }}>
          <div className="row">
            <div className="col-md-12">
              <div className="card shadow-lg border-0 rounded-3" style={{ backgroundColor: '#e6f7ff' }}>
                <div className="card-body">
                  <div className="row mb-4 p-2 border border-info border-2 rounded-4">
                    <div className="col-md-3">
                      <label className="form-label fw-bold">Search by Product Name</label>
                      <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className="form-control" placeholder="Search by Product Name" />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold">Filter by Category</label>
                      <select onChange={(e)=>filterCategory(e.target.value)} className="form-select">
                        <option defaultValue>Filter by Category</option>
                        {allCategorys?.length > 0 ?
                          allCategorys.map((item) => (
                            <option key={item.name} value={item.name}>{item.name}</option>
                          )) :
                          <option className='text-danger'>Nothing To Display...</option>
                        }
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold">Filter by Brand</label>
                      <select onChange={(e)=>filterBrand(e.target.value)} className="form-select">
                        <option defaultValue>Filter by Brand</option>
                        {allBrands?.length > 0 ?
                          allBrands.map((item) => (
                            <option key={item.name} value={item.name}>{item.name}</option>
                          )) :
                          <option className='text-danger'>Nothing To Display...</option>
                        }
                      </select>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered text-center">
                      <thead className="table-info">
                        <tr>
                          <th>#</th>
                          <th>Product Name</th>
                          <th>Category</th>
                          <th>Brand</th>
                          <th>Price</th>
                          <th>Stock</th>
                          <th>Purchase From</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems?.length > 0 ?
                          currentItems.map((item,index) => (
                            <tr key={item.name}>
                              <td>{startingIndex+index+1}</td>
                              <td>{item.name}</td>
                              <td>{item.category}</td>
                              <td>{item.brand}</td>
                              <td>{item.price}</td>
                              <td>{item.stock}</td>
                              <td>{item.companyname}</td>
                              <td><Sell details={item}/></td>
                            </tr>
                          )) :
                          <tr><td colSpan="8" className='text-danger'>No Products To Display</td></tr>
                        }
                      </tbody>
                    </table>
                    {currentItems?.length>0 &&
                      <Pgz totalitems={allProducts.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
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

export default Products
