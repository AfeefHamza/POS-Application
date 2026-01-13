import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SideBarAdmin from './SideBarAdmin'
import { addbrandAPI, addCategoryAPI, addcompanyAPI, addproductsAPI, getAllBrandAPI, getAllCategoryAPI, getAllCompanyAPI } from '../Services/allAPIs'
import { toast } from 'react-toastify';
import { brandResponseContext, categoryResponseContext, companyResponseContext } from '../Contexts/ContextAPI';
import '../Styles/admin-pages.css'











function CreateProdcut() {

    const [companyDetails,setcompanyDetails]=useState({companyname:""})
    // console.log(companyDetails);

    const [allCompany,setallCompany]=useState([])
    // console.log(allCompany);
    

    const [allproducts,setallproducts]=useState({name:"",price:"",stock:"",companyname:"",category:"",brand:"",size:"",description:""})
    // console.log(allproducts);
    

    const [categoryDetails,setcategoryDetails]=useState({name:""})
    // console.log(categoryDetails);

    const [brandDetails,setbrandDetails]=useState({name:""})
    // console.log(brandDetails);

    const [allCategorys,setallCategorys]=useState([])
    // console.log(allCategorys);


    const [allBrands,setallBrands]=useState([])
    // console.log(allBrands);

    const {categoryResponse,setcategoryResponse}=useContext(categoryResponseContext)
    const {brandResponse,setbrandResponse}=useContext(brandResponseContext)
    const {companyResponse,setcompanyResponse}=useContext(companyResponseContext)


    

    
    

    
    const addCompany=async()=>{
      const {companyname}= companyDetails
      if(companyname)
      {
        const reqBody=new FormData()
        reqBody.append("companyname",companyname)

        const token=sessionStorage.getItem("token")
        if (token)
        {
          const reqHeader={
            "content-type":"application/json",
            "authorization":`Bearer ${token}`
          }
          try
          {
              const result = await addcompanyAPI(reqBody,reqHeader)
              console.log(result);
              if(result.status==200)
              {
                  setcompanyDetails({name:""})
                  toast.success('Company Added Successfully')
                  setcompanyResponse(result.data)
                  
              }
              else
                      {
                        if(result.status==406)
                        {
                          toast.error('Company Already Exists')
                          setcompanyDetails({name:""})
                        }
                      }
              
          }
          catch(err)
          {
            console.log(err);
          }
        }
          
      }
      else
      {
              toast.warning('Please Enter Any Company...')
        
      }

    }

    const addCategory=async()=>{
      const {name}= categoryDetails
      if(name)
      {
        const reqBody=new FormData()
        reqBody.append("name",name)

        const token=sessionStorage.getItem("token")
        if (token)
        {
          const reqHeader={
            "content-type":"application/json",
            "authorization":`Bearer ${token}`
          }
          try
          {
              const result = await addCategoryAPI(reqBody,reqHeader)
              // console.log(result);
              if(result.status==200)
              {
                  setcategoryDetails({name:""})
                  toast.success('Category Added Successfully')
                  setcategoryResponse(result.data)
              }
              else
                      {
                        if(result.status==406)
                        {
                          toast.error('Category Already Exists')
                          setcategoryDetails({name:""})
                        }
                      }
              
          }
          catch(err)
          {
            console.log(err);
          }
        }
          
      }
      else
      {
              toast.warning('Please Enter Any Category...')
        
      }

    }

    
    const addBrand=async()=>{
      const {name}=brandDetails
      if(name)
      {
        const reqBody=new FormData()
        reqBody.append("name",name)

        const token=sessionStorage.getItem("token")
        if (token)
        {
          const reqHeader={
            "content-type":"application/json",
            "authorization":`Bearer ${token}`
          }
          try
          {
              const result = await addbrandAPI(reqBody,reqHeader)
              console.log(result);
              if(result.status==200)
              {
                setbrandDetails({name:""})
                  toast.success('Brand Added Successfully')
                  setbrandResponse(result.data)
              }
              else
                      {
                        if(result.status==406)
                        {
                          toast.error('Brand Already Exists')
                          setbrandDetails({name:""})
                                      
                        }
                      }
              
          }
          catch(err)
          {
            console.log(err);
            
          }
        }
          
      }
      else
      {
              toast.warning('Please Enter Any Brand...')
        
      }

    }

    const addProduct=async()=>{
      const {name,price,stock,companyname,category,brand,size,description}=allproducts
      if(name && price && stock && companyname && category && brand && size && description)
      {
        const reqBody=new FormData()
        reqBody.append("name",name)
        reqBody.append("price",price)
        reqBody.append("stock",stock)
        reqBody.append("companyname",companyname)
        reqBody.append("category",category)
        reqBody.append("brand",brand)
        reqBody.append("size",size)
        reqBody.append("description",description)


        const token=sessionStorage.getItem("token")
        if (token)
        {
          const reqHeader={
            "content-type":"application/json",
            "authorization":`Bearer ${token}`
          }
          try
          {
              const result = await addproductsAPI(reqBody,reqHeader)
              // console.log(result);
              if(result.status==200)
              {
                 setallproducts({name:"",price:"",stock:"",companyname:"",category:"",brand:"",size:"",description:""})
                  toast.success('Product Added Successfully')
                  
              }
              else
                      {
                        if(result.status==406)
                        {
                          toast.error('Product Already Exists')
                          setallproducts({name:"",price:"",stock:"",companyname:"",category:"",brand:"",size:"",description:""})

                          
                                      
                        }
                      }
              
          }
          catch(err)
          {
            console.log(err);
            
          }
        }
          
      }
      else
      {
              toast.warning('Please Enter All Fields...')
        
      }

    }

    useEffect(() => {
      getAllCategory()
      getAllBrand()
      getAllCompany()
      
    }, [categoryResponse,brandResponse,companyResponse])
    
    const getAllCategory=async()=>{

      const token=sessionStorage.getItem("token")
       
          try
          {
            const reqHeader={
              "content-type":"application/json",
              "authorization":`Bearer ${token}`
            }

            const result=await getAllCategoryAPI("",reqHeader)
            // console.log(result);
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

    const getAllBrand=async()=>{

      const token=sessionStorage.getItem("token")
       
          try
          {
            const reqHeader={
              "content-type":"application/json",
              "authorization":`Bearer ${token}`
            }

            const result=await getAllBrandAPI("",reqHeader)
            // console.log(result);
            if(result.status==200)
            {
              setallBrands(result.data)
            }
            
          }
          catch(err)
          {
            console.log(err);
            
          }
    }

    const getAllCompany=async()=>{

      const token=sessionStorage.getItem("token")
       
          try
          {
            const reqHeader={
              "content-type":"application/json",
              "authorization":`Bearer ${token}`
            }

            const result=await getAllCompanyAPI("",reqHeader)
            console.log(result);
            if(result.status==200)
            {
              setallCompany(result.data)
            }
            
          }
          catch(err)
          {
            console.log(err);
            
          }
    }
  return (
    <>
    <Row style={{ margin: 0 }}>
      <Col md={2} className="p-0">
      <SideBarAdmin/>
      </Col>

      <Col md={10} className="p-0"> 
      <div className="page-container p-4" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)'}}>
      <div className="page-header mb-4">
        <h1>Product Management</h1>
        <p>Create and manage your inventory products</p>
      </div>
      <div className="row">

      <div className="col-lg-6">
      <div className="form-card">
        <h3 className="mb-4"><i className="fas fa-box me-2"></i>Add New Product</h3>

        
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input onChange={(e)=>setallproducts({...allproducts,name:e.target.value})} value={allproducts.name} type="text" className="modern-input" id="name" placeholder="Enter product name" />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input onChange={(e)=>setallproducts({...allproducts,price:e.target.value})} value={allproducts.price} type="number" className="modern-input" id="price" placeholder="Enter price" />
          </div>

          <div className="mb-3">
            <label htmlFor="stock" className="form-label">Stock Quantity</label>
            <input onChange={(e)=>setallproducts({...allproducts,stock:e.target.value})} value={allproducts.stock} type="number" className="modern-input" id="stock" placeholder="Enter stock quantity" />
          </div>

          <div className="mb-3">
            <label htmlFor="seller" className="form-label">Purchasing Company</label>
            <select onChange={(e)=>setallproducts({...allproducts,companyname:e.target.value})} value={allproducts.companyname} className="modern-select" id="seller">
              <option defaultValue>Select Supplier</option>
              {allCompany?.length > 0 ?
             allCompany.map((item) => (
              <option key={item.id} value={item.companyname}>{item.companyname}</option>
             ))
             :
            <option>No Suppliers Available</option>
             }

            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select onChange={(e)=>setallproducts({...allproducts,category:e.target.value})} value={allproducts.category} className="modern-select" id="category">
              <option defaultValue>Select Category</option>
             {allCategorys?.length > 0 ?
             allCategorys.map((item) => (
              <option key={item.id} value={item.name}>{item.name}</option>
             ))
             :
            <option>No Categories Available</option>
             }

            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="brand" className="form-label">Brand</label>
            <select onChange={(e)=>setallproducts({...allproducts,brand:e.target.value})} value={allproducts.brand} className="modern-select" id="brand">
              <option defaultValue>Select Brand</option>
              {allBrands?.length > 0 ?
             allBrands.map((item) => (
              <option key={item.id} value={item.name}>{item.name}</option>
             ))
             :
            <option>No Brands Available</option>
             }

            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="size" className="form-label">Product Size</label>
            <select onChange={(e)=>setallproducts({...allproducts,size:e.target.value})} value={allproducts.size} className="modern-select" id="size">
              <option defaultValue>Select Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Product Description</label>
            <textarea onChange={(e)=>setallproducts({...allproducts,description:e.target.value})} value={allproducts.description} className="modern-textarea" id="description" rows="3" placeholder="Enter product details..."></textarea>
          </div>

          <button onClick={addProduct} className="modern-btn modern-btn-primary w-100">
            <i className="fas fa-plus me-2"></i>ADD PRODUCT
          </button>
        
      </div>
    </div>
        
        
        <div className="col-lg-6">

        <div className="form-card mb-4">
            <h4 className="mb-3"><i className="fas fa-building me-2"></i>Create New Supplier</h4>
            <div className="mb-3">
              <input onChange={e=>setcompanyDetails({companyname:e.target.value})} value={companyDetails.companyname} type="text" className="modern-input" placeholder="Enter company name" />
            </div>
            <button onClick={addCompany} className="modern-btn modern-btn-success w-100">
              <i className="fas fa-plus me-2"></i>CREATE SUPPLIER
            </button>
          </div>
          
          <div className="form-card mb-4">
            <h4 className="mb-3"><i className="fas fa-folder me-2"></i>Create New Category</h4>
            <div className="mb-3">
              <input onChange={e=>setcategoryDetails({name:e.target.value})} value={categoryDetails.name} type="text" className="modern-input" placeholder="Enter category name" />
            </div>
            <button onClick={addCategory} className="modern-btn modern-btn-info w-100">
              <i className="fas fa-plus me-2"></i>CREATE CATEGORY
            </button>
          </div>

          <div className="form-card">
            <h4 className="mb-3"><i className="fas fa-tag me-2"></i>Create New Brand</h4>
            <div className="mb-3">
              <input onChange={e=>setbrandDetails({name:e.target.value})} value={brandDetails.name} type="text" className="modern-input" placeholder="Enter brand name" />
            </div>
            <button onClick={addBrand} className="modern-btn modern-btn-warning w-100">
              <i className="fas fa-plus me-2"></i>CREATE BRAND
            </button>
          </div>
        </div>

      </div>
    </div>
      
      
     
     
      </Col>
    </Row>
    </>
    
  )
}

export default CreateProdcut