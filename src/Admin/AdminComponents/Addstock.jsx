import React, { useContext } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateStockAPI } from '../../Services/allAPIs';
import { updateStockResponseContext } from '../../Contexts/ContextAPI';
import { toast } from 'react-toastify';




function Addstock({details}) {

  const [stockDetails,setstockDetails]=useState({id:details?._id,stock:details?.stock})
        // console.log(stock);
     const [show, setShow] = useState(false);
    
        const handleClose = () =>
        {
          setShow(false);
        }
        const handleShow = () => 
        {
          setShow(true);
        }

        const {stockResponse,setstockResponse}=useContext(updateStockResponseContext)
        
      
        const handleStock=async()=>{
              const {id,stock}=stockDetails
              if(stock)
              {
                const reqBody=new FormData()
                reqBody.append("stock",stock)
                const token=sessionStorage.getItem("token")
                if (token)
                {
                  const reqHeader={
                    "content-type":"application/json",
                    "authorization":`Bearer ${token}`
                  }
                  try
                  {
                      const result = await updateStockAPI(id,reqBody,reqHeader)
                      // console.log(result);
                      if(result.status==200)
                      {
                          setstockResponse(result.data)
                          handleClose()
                          toast.success('Stock Updated Successfully')
                      }
                      
                  }
                  catch(err)
                  {
                    console.log(err);
                    
                  }
                }
                  
              }
            }

        
  return (
    <>
    <button onClick={handleShow} className="btn btn-primary btn-sm me-1">Add Stock</button>


    <Modal show={show} centered onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">
      <div className="row">
        <div className="col-md-12">
        
          <div className="mb-3 row align-items-center">
            <label htmlFor="Addstock" className="col-sm-3 col-form-label">Add Stock</label>
            <div className="col-sm-9">
              <input onChange={(e)=>setstockDetails({...stockDetails,stock:e.target.value})}   type="text" className="form-control" id="Addstock" placeholder="Add Stock" />
            </div>
          </div>
        </div>
      </div>
    </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleStock}>
           Add Stock
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}

export default Addstock