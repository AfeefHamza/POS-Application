import React, { useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteBrandAPI, deleteCategoryAPI, deleteCompanyAPI, deleteCustomerAPI, deleteProductAPI, deleteUserAPI } from '../../Services/allAPIs';
import { toast } from 'react-toastify';
import { deleteBrandResponseContext, deleteCategoryResponseContext, deleteCompanyResponseContext, deleteCustomerResponeContext, deleteProductResponseContext, deleteUserResponeContext } from '../../Contexts/ContextAPI';








function Delete({insideCustomerList,customerData,insideUserList,userdata,details,data,info,information,insideAdminPr,insideCompanyList,insideCategoryList,insideBrandList}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {deleteProductResponse,setdeleteProductResponse}=useContext(deleteProductResponseContext)
  const {deleteCategoryResponse,setdeleteCategoryResponse}=useContext(deleteCategoryResponseContext)
  const {deleteBrandResponse,setdeleteBrandResponse}=useContext(deleteBrandResponseContext)
  const {deleteCompanyResponse,setdeleteCompanyResponse}=useContext(deleteCompanyResponseContext)
  const {deleteUserResponse,setdeleteUserResponse}=useContext(deleteUserResponeContext)
  const {deleteCustomerResponse,setdeleteCustomerResponse}=useContext(deleteCustomerResponeContext)





  

  const handleDeleteProduct=async (pid)=>{
    const token = sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
      try
    {
      const result = await deleteProductAPI(pid,reqHeader)
      // console.log(result);
      if (result.status==200)
      {
        setdeleteProductResponse(result.data)
        handleClose()
        toast.success('Deletion Successful')
      }
      
    }
    catch(err)
    {
      console.log(err);
      
    }


    }

   }

   const handleDeleteCategory=async (pid)=>{
    const token = sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
      try
    {
      const result = await deleteCategoryAPI(pid,reqHeader)
      console.log(result);
      if (result.status==200)
      {
        setdeleteCategoryResponse(result.data)
        handleClose()
        toast.success('Deletion Successful')
      }
      
    }
    catch(err)
    {
      console.log(err);
      
    }


    }

   }

   const handleDeleteBrand=async (pid)=>{
    const token = sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
      try
    {
      const result = await deleteBrandAPI(pid,reqHeader)
      console.log(result);
      if (result.status==200)
      {
        setdeleteBrandResponse(result.data)
        handleClose()
        toast.success('Deletion Successful')
      }
      
    }
    catch(err)
    {
      console.log(err);
      
    }


    }

   }

   const handleDeleteCompany=async (pid)=>{
    const token = sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
      try
    {
      const result = await deleteCompanyAPI(pid,reqHeader)
      console.log(result);
      if (result.status==200)
      {
        setdeleteCompanyResponse(result.data)
        handleClose()
        toast.success('Deletion Successful')
      }
      
    }
    catch(err)
    {
      console.log(err);
      
    }


    }

   }

   const handleDeleteUser=async (id)=>{
    const token = sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
      try
    {
      const result = await deleteUserAPI(id,reqHeader)
      console.log(result);
      if (result.status==200)
      {
        setdeleteUserResponse(result.data)
        handleClose()
        toast.success('Deletion Successful')
      }
      
    }
    catch(err)
    {
      console.log(err);
      
    }


    }

   }

   const handleDeleteCustomer=async (pid)=>{
    const token = sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }
      try
    {
      const result = await deleteCustomerAPI(pid,reqHeader)
      // console.log(result);
      if (result.status==200)
      {
        setdeleteCustomerResponse(result.data)
        handleClose()
        toast.success('Deletion Successful')
      }
      
    }
    catch(err)
    {
      console.log(err);
      
    }


    }

   }
  return (
    <>

<button onClick={handleShow} className="btn btn-danger btn-sm">
<i className="fas fa-trash"></i>
</button>


    <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className='fs-4'>Are you sure to perform this Deletion? 
        </Modal.Body>

        <span className='text-danger ms-3 mb-3'>You won't be able to revert this action.</span>
        { insideUserList &&
        <span className='text-danger ms-3 mb-3'>Access To The User Will be Denied</span>
        }

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          { insideAdminPr &&
            <Button variant="danger" onClick={()=>handleDeleteProduct(details?._id)}>
            Yes ! Delete 
          </Button>
          }
          { insideCompanyList &&
            <Button variant="danger" onClick={()=>handleDeleteCompany(information?._id)}>
            Yes ! Delete 
          </Button>

          }
          { insideCategoryList &&
            <Button variant="danger" onClick={()=>handleDeleteCategory(data?._id)}>
            Yes ! Delete 
          </Button>
          }
          { insideBrandList &&
            <Button variant="danger" onClick={()=>handleDeleteBrand(info?._id)} >
            Yes ! Delete 
          </Button>
          }
          { insideUserList &&  
            <Button variant="danger" onClick={()=>handleDeleteUser(userdata?._id)} >
            Yes ! Delete 
          </Button>
          }

          { insideCustomerList &&  
            <Button variant="danger" onClick={()=>handleDeleteCustomer(customerData?._id)} >
            Yes ! Delete 
          </Button>
          }
           

          
        
          
          
        </Modal.Footer>
      </Modal>

    
    </>
  )
}

export default Delete