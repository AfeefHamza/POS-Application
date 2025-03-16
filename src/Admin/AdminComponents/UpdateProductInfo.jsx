import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllBrandAPI, getAllCategoryAPI, getAllCompanyAPI, updateProductAPI } from '../../Services/allAPIs';
import { toast } from 'react-toastify';
import { updateProductResponseContext } from '../../Contexts/ContextAPI';








function UpdateProductInfo({details}) {

      const [allBrands,setallBrands]=useState([])
      // console.log(allBrands);

      const [allCategorys,setallCategorys]=useState([])
       // console.log(allCategorys);

      const [allCompany,setallCompany]=useState([])
      // console.log(allCompany);

      const {productResponse,setproductResponse}=useContext(updateProductResponseContext)
      
      
       
      
  

  useEffect(() => {
    getAllBrand()
    getAllCategory()
    getAllCompany()
  }, [])
  

    const [productDetails,setproductDetails]=useState({id:details?._id,name:details?.name,price:details?.price,stock:details?.stock,companyname:details?.companyname,category:details?.category,brand:details?.brand,size:details?.size,description:details?.description})
    // console.log(productDetails);

   
    


         const [show, setShow] = useState(false);
            const handleClose = () =>
               {
                setShow(false);
                setproductDetails({id:details?._id,name:details?.name,price:details?.price,stock:details?.stock,companyname:details?.companyname,category:details?.category,brand:details?.brand,size:details?.size,description:details?.description})
               }
            const handleShow = () => 
            {
              setShow(true);
              setproductDetails({id:details?._id,name:details?.name,price:details?.price,stock:details?.stock,companyname:details?.companyname,category:details?.category,brand:details?.brand,size:details?.size,description:details?.description})
            }

            const handleUpdate=async()=>{
              const {id,name,price,companyname,category,brand,size,description}=productDetails

              const reqBody=new FormData()
                reqBody.append("name",name)
                reqBody.append("price",price)
                reqBody.append("companyname",companyname)
                reqBody.append("category",category)
                reqBody.append("brand",brand)
                reqBody.append("size",size)
                reqBody.append("description",description)

                const token = sessionStorage.getItem("token")
                if (token)
                {
                  const reqHeader={
                    "content-type":"application/json",
                    "authorization":`Bearer ${token}`
                  }
                  try
          {
            const result = await updateProductAPI(id,reqBody,reqHeader)
            console.log(result);
            if(result.status==200)
            {
              handleClose()
              toast.success('Product Updated Successfully')
              setproductResponse(result.data)
              
            }
            

          }
          catch (err)
          {
            console.log(err);
            
          }

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
    <button onClick={handleShow} className="btn btn-success btn-sm me-1">
                          <i className="fas fa-pencil-alt"></i>
                        </button>


     <Modal show={show} centered onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
      <div className="row">
        <div className="col-md-12">
        
          <div className="mb-3 row align-items-center">
            <label htmlFor="buyerName" className="col-sm-3 col-form-label">Name</label>
            <div className="col-sm-9">
              <input value={productDetails?.name} onChange={(e)=>setproductDetails({...productDetails,name:e.target.value})}  type="text" className="form-control" id="buyerName" placeholder="Name" />
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label htmlFor="quantity" className="col-sm-3 col-form-label">Price</label>
            <div className="col-sm-9">
              <input value={productDetails?.price} onChange={(e)=>setproductDetails({...productDetails,price:e.target.value})}  type="text" className="form-control" id="quantity" placeholder="Price" />
            </div>
          </div>

          <div className="row mb-3">
            <label htmlFor="seller" className="col-sm-3 col-form-label">Purchasing Company</label>
            <div className="col-sm-9">
              <select defaultValue={productDetails?.companyname} onChange={(e)=>setproductDetails({...productDetails,companyname:e.target.value})}  className="form-select" id="seller">
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
            <label htmlFor="category" className="col-sm-3 col-form-label">Category</label>
            <div className="col-sm-9">
              <select defaultValue={productDetails?.category} onChange={(e)=>setproductDetails({...productDetails,category:e.target.value})}  className="form-select" id="category">
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
            <label htmlFor="brand" className="col-sm-3 col-form-label">Brand</label>
            <div className="col-sm-9">
              <select defaultValue={productDetails?.brand}   onChange={(e)=>setproductDetails({...productDetails,brand:e.target.value})}  className="form-select" id="brand">
              {allBrands?.length > 0 ?
               allBrands.map((item) => (
                <option  value={item.name}>{item.name}</option>
               ))
               :
              <option className='text-danger'>Nothing To Display...</option>
               }
              </select>
            </div>
          </div>

          <div className="mb-3 row align-items-center">
            <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
            <div className="col-sm-9">
              <input value={productDetails?.description} onChange={(e)=>setproductDetails({...productDetails,description:e.target.value})}  type="text" className="form-control" id="description" placeholder="Description" />
            </div>
          </div>

          

          <div className="row mb-3">
            <label htmlFor="size" className="col-sm-3 col-form-label">Size</label>
            <div className="col-sm-9">
              <select defaultValue={productDetails?.size} onChange={(e)=>setproductDetails({...productDetails,size:e.target.value})} className="form-select" id="size">
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
          </div>



         
        </div>
      </div>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

    
    </>
  )
}

export default UpdateProductInfo