import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SidebarPOS from '../Components/SidebarPOS'
import Sell from '../Components/Sell'
import { getAllBrandAPI, getAllCategoryAPI, getAllProductsAPI } from '../Services/allAPIs'
import { sellQuantityResponeContext } from '../Contexts/ContextAPI'
import Pgz from '../Admin/AdminComponents/Pgz'
import '../Styles/admin-pages.css'

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
    <Row style={{ margin: 0 }}>
      <Col md={2} className="p-0">
        <SidebarPOS/>
      </Col>

      <Col md={10} className="p-0">
        <div className="page-container p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
          <div className="page-header mb-4">
            <h1>Product Catalog</h1>
            <p>Browse and manage all available products</p>
          </div>
          
          <div className="modern-card p-4 mb-4">
            <div className="filter-section">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className="modern-input" placeholder="Search products..." />
                  </div>
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Category</label>
                  <select onChange={(e)=>filterCategory(e.target.value)} className="modern-select">
                    <option defaultValue>All Categories</option>
                    {allCategorys?.length > 0 ?
                      allCategorys.map((item) => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                      )) :
                      <option>No Categories</option>
                    }
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label" style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px', display: 'block' }}>Brand</label>
                  <select onChange={(e)=>filterBrand(e.target.value)} className="modern-select">
                    <option defaultValue>All Brands</option>
                    {allBrands?.length > 0 ?
                      allBrands.map((item) => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                      )) :
                      <option>No Brands</option>
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modern-card overflow-hidden">
            <div className="table-responsive">
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Supplier</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.length > 0 ?
                    currentItems.map((item,index) => (
                      <tr key={item.id || index}>
                        <td><strong>{startingIndex+index+1}</strong></td>
                        <td><strong>{item.name}</strong></td>
                        <td><span className="badge-modern badge-info">{item.category}</span></td>
                        <td><span className="badge-modern badge-success">{item.brand}</span></td>
                        <td style={{ color: '#10b981', fontWeight: 'bold' }}>₹{item.price}</td>
                        <td>
                          <span className={`badge-modern ${item.stock > 10 ? 'badge-success' : item.stock > 0 ? 'badge-warning' : 'badge-danger'}`}>
                            {item.stock} units
                          </span>
                        </td>
                        <td>{item.companyname}</td>
                        <td><Sell details={item}/></td>
                      </tr>
                    )) :
                    <tr>
                      <td colSpan="8" className='text-center'>
                        <div className="empty-state">
                          <div className="empty-state-icon">📦</div>
                          <p className="empty-state-title">No Products Found</p>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
              {currentItems?.length>0 &&
                <div className="p-4" style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                  <Pgz totalitems={allProducts.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
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

export default Products
