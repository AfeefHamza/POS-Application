import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SideBarAdmin from './SideBarAdmin'
import { addbrandAPI, addCategoryAPI, addcompanyAPI, addproductsAPI, getAllBrandAPI, getAllCategoryAPI, getAllCompanyAPI } from '../Services/allAPIs'
import { toast } from 'react-toastify';
import { brandResponseContext, categoryResponseContext, companyResponseContext } from '../Contexts/ContextAPI';











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
    <Row>
      <Col lg={2}>
      <SideBarAdmin/>
      </Col>

      <Col lg={10} > 
      <div className="container" style={{background: 'linear-gradient(135deg,rgb(203, 227, 208),rgb(68, 192, 76))'}}>
      <div className="row">

      <div className="col-md-6">
      <div className="card p-4 border rounded" style={{ backgroundColor: '#e6f7ff' }}>
        <h2 className="mb-4 ">ADD NEW PRODUCT</h2>

        
          <div className="row mb-3">
            <label htmlFor="name" className="col-sm-4 col-form-label">Name</label>
            <div className="col-sm-8">
              <input onChange={(e)=>setallproducts({...allproducts,name:e.target.value})} value={allproducts.name} type="text" className="form-control" id="name" placeholder="Name" />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="price" className="col-sm-4 col-form-label">Price</label>
            <div className="col-sm-8">
              <input onChange={(e)=>setallproducts({...allproducts,price:e.target.value})} value={allproducts.price} type="text" className="form-control" id="price" placeholder="Price" />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="stock" className="col-sm-4 col-form-label">Stock</label>
            <div className="col-sm-8">
              <input onChange={(e)=>setallproducts({...allproducts,stock:e.target.value})} value={allproducts.stock} type="text" className="form-control" id="stock" placeholder="Stock" />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="seller" className="col-sm-4 col-form-label">Purchasing Company</label>
            <div className="col-sm-8">
              <select onChange={(e)=>setallproducts({...allproducts,companyname:e.target.value})} value={allproducts.companyname} className="form-select" id="seller">
                <option defaultValue>Select Company</option>
                {allCompany?.length > 0 ?
               allCompany.map((item) => (
                <option value={item.companyname}>{item.companyname}</option>
               ))
               :
              <option className='text-danger'>Nothing To Display...</option>
               }

              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="category" className="col-sm-4 col-form-label">Category</label>
            <div className="col-sm-8">
              <select onChange={(e)=>setallproducts({...allproducts,category:e.target.value})} value={allproducts.category} className="form-select" id="category">
                <option defaultValue>Select Category</option>
               {allCategorys?.length > 0 ?
               allCategorys.map((item) => (
                <option value={item.name}>{item.name}</option>
               ))
               :
              <option className='text-danger'>Nothing To Display...</option>
               }

              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="brand" className="col-sm-4 col-form-label">Brand</label>
            <div className="col-sm-8">
              <select onChange={(e)=>setallproducts({...allproducts,brand:e.target.value})} value={allproducts.brand} className="form-select" id="brand">
                <option defaultValue>Select brand</option>
                {allBrands?.length > 0 ?
               allBrands.map((item) => (
                <option value={item.name}>{item.name}</option>
               ))
               :
              <option className='text-danger'>Nothing To Display...</option>
               }

              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="size" className="col-sm-4 col-form-label">Size</label>
            <div className="col-sm-8">
              <select onChange={(e)=>setallproducts({...allproducts,size:e.target.value})} value={allproducts.size} className="form-select" id="size">
                <option defaultValue>Select Product Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea onChange={(e)=>setallproducts({...allproducts,description:e.target.value})} value={allproducts.description} className="form-control" id="description" rows="3" placeholder="Description"></textarea>
          </div>

          <button onClick={addProduct}  className="btn btn-primary">ADD PRODUCT</button>
        
      </div>
    </div>
        
        

        
        <div className="col-md-6 mt-5">

        <div className="card p-4 border rounded mb-3">
            <h5 className="mb-3">CREATE NEW COMPANY</h5>
            <div className="mb-3">
              <input onChange={e=>setcompanyDetails({companyname:e.target.value})} value={companyDetails.name}   type="text" className="form-control" placeholder="Company Name" />
            </div>
            <button onClick={addCompany}  className="btn btn-success">CREATE COMPANY</button>
          </div>
          

          <div className="card p-4 border rounded mb-3">
            <h5 className="mb-3">CREATE NEW CATEGORY</h5>
            <div className="mb-3">
              <input onChange={e=>setcategoryDetails({name:e.target.value})} value={categoryDetails.name} type="text" className="form-control" placeholder="Category Name" />
            </div>
            <button onClick={addCategory} className="btn btn-info">CREATE CATEGORY</button>
          </div>

          <div className="card p-4 border rounded">
            <h5 className="mb-3">CREATE NEW BRAND</h5>
            <div className="mb-3">
              <input onChange={e=>setbrandDetails({name:e.target.value})} value={brandDetails.name} type="text" className="form-control" placeholder="Brand Name" />
            </div>
            <button onClick={addBrand} className="btn btn-warning">CREATE BRAND</button>
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