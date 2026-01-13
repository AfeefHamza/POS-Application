import React, { useState, useRef, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addInvoiceAPI, getAllCustomersAPI, getInvoiceNumberAPI } from '../Services/allAPIs';
import { toast } from 'react-toastify';
import { sellQuantityResponeContext, updateInvoiceResponeContext } from '../Contexts/ContextAPI';
import SERVER_URL from '../Services/server_url';




function Sell({ details }) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        resetState(); 
    };
    const handleShow = async () => 
        {
            await getInvoiceNumber();
            setsaleDetails(prev => ({
                ...prev,
                productname: details?.name,
                sprice: details?.price
            }));
            setShow(true);
        };

    const [productDetails, setproductDetails] = useState({ id: details?._id, stock: details?.stock, price: details?.price });
    const [saleDetails, setsaleDetails] = useState({ customer: "", quantity: "", invoiceNo: "", date: "", amount: 0, productname:details?.name ,sprice:details?.price });

    const {sellQuantityResponse,setsellQuantityResponse}=useContext(sellQuantityResponeContext)
    const {updateInvoiceResponse,setupdateInvoiceResponse}=useContext(updateInvoiceResponeContext)


    const [invoiceNumber,setinvoiceNumber]=useState('')
    // console.log(invoiceNumber);
    


    const [totalAmount, setTotalAmount] = useState(0);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const [allCustomers,setallCustomers]=useState([])
          // console.log(allCustomers);


    

    useEffect(() => {
        getAllCustomer()
        getInvoiceNumber()
    }, [updateInvoiceResponse])
    

    const handleQuantityChange = (e) => {
        const quantity = e.target.value;
        const calculatedTotal = quantity && productDetails.price ? quantity * productDetails.price : 0;

        setsaleDetails({ ...saleDetails, quantity: quantity, amount: calculatedTotal });
        setTotalAmount(calculatedTotal);
        setPaymentConfirmed(false);
    };

    

    const handleShowPayment = () => {
        setShowPaymentModal(true);
    };

    const payNow = async () => {
  try {
    const res = await fetch(`${SERVER_URL}/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: totalAmount,
        billId: invoiceNumber, // ✅ FIX
      }),
    });

    const order = await res.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "My POS",
      description: `Invoice ${invoiceNumber}`,
      order_id: order.id,

      handler: async (response) => {
        const token = sessionStorage.getItem("token");
        const verifyRes = await fetch(`${SERVER_URL}/payment/verify-payment`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            ...response,
            invoiceNo: invoiceNumber,
            amount: totalAmount,
          }),
        });

        const data = await verifyRes.json();

        if (data.success) {
          setPaymentConfirmed(true); // ✅ REQUIRED
          toast.success("Payment Successful");
        } else {
          toast.error("Payment verification failed");
        }
      },

      modal: {
        ondismiss: () => {
          toast.info("Payment cancelled");
        },
      },

      theme: { color: "#0d6efd" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error(err);
    toast.error("Payment failed");
  }
};



    const resetState = () => {
        setTotalAmount(0);
        setsaleDetails({ customer: "", quantity: "", invoiceNo: "", date: "", amount: 0 });
        setPaymentConfirmed(false);
    };

    const handleSell = async () => {
        if (!paymentConfirmed) {
            toast.error('Please confirm payment before selling.');
            return;
        }

        const { id } = productDetails;
        const { productname,sprice,customer, quantity, invoiceNo, date, amount } = saleDetails;

        if (customer && quantity && date && productname && sprice) {
            const reqBody = new FormData();
            reqBody.append("customer", customer);
            reqBody.append("productname", productname);
            reqBody.append("sprice", sprice);
            reqBody.append("quantity", quantity);
            reqBody.append("invoiceNo", invoiceNo);
            reqBody.append("date", date);
            reqBody.append("amount", amount);

            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                };
                try {
                    const result = await addInvoiceAPI(id, reqBody, reqHeader);
                    // console.log(result);
                    if (result.status === 200) {
                      setsellQuantityResponse(result.data)
                        handleClose(); 
                        toast.success('Sale Created Successfully');
                    } else {
                        if (result.status === 406) {
                            toast.error('Sale Invoice Already Exists');
                        } else if (result.status === 400) {
                            toast.error('Sale Quantity Exceeds Available Stock');
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        } else {
            toast.warning('Please Enter All Fields...')
        }
    };

    const getAllCustomer=async()=>{
        
              const token=sessionStorage.getItem("token")
               
                  try
                  {
                    const reqHeader={
                      "content-type":"application/json",
                      "authorization":`Bearer ${token}`
                    }
        
                    const result=await getAllCustomersAPI("",reqHeader)
                    // console.log(result);
                    if(result.status==200)
                    {
                      setallCustomers(result.data)
                    }
                    
                  }
                  catch(err)
                  {
                    console.log(err);
                    
                  }
            }

     const getInvoiceNumber=async()=>{

        const token=sessionStorage.getItem("token")
         try
         {
            const reqHeader={
                "content-type":"application/json",
                "authorization":`Bearer ${token}`
              }
              const result=await getInvoiceNumberAPI(reqHeader)
            //   console.log(result);
            if(result.status==200)
                {
                  setinvoiceNumber(result.data)
                  setupdateInvoiceResponse(result.data)
                  setsaleDetails(prev => ({ ...prev, invoiceNo: result.data }));
                }

              


         }
         catch(err)
         {
            console.log(err);

         }

     }       
    return (
        <>
            <button onClick={handleShow} className="btn btn-primary btn-sm me-1">Sell</button>

            <Modal show={show} centered onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Sell Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="buyerName" className="col-sm-3 col-form-label">Invoice Number</label>
                                    <div className="col-sm-9">
                                        {invoiceNumber ? (
                                                <input  value={invoiceNumber} type="text" className="form-control" id="invoiceNo" readOnly />

                                        ) 
                                        : (
                                            <h6>Nothing</h6>
                                        )
                                        }
                                        

                                    </div>
                                </div>

                                <div className="row mb-3 align-items-center">
                                <label htmlFor="customer" className="col-sm-3 col-form-label">Customer</label>
                                <div className="col-sm-9">
                                <select onChange={(e)=>setsaleDetails({...saleDetails,customer:e.target.value})} value={saleDetails.customer} className="form-select" id="customer">
                                <option defaultValue>Select Customer</option>
                                {allCustomers?.length > 0 ?
                                allCustomers.map((item) => (
                                <option value={item.name}>{item.name}</option>
                                ))
                                :
                                <option className='text-danger'>Nothing To Display...</option>
                                }
                                </select>
                                </div>
                                </div>
                               
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="invoiceDate" className="col-sm-3 col-form-label">Date:</label>
                                    <div className="col-sm-9">
                                        <input onChange={(e) => setsaleDetails({ ...saleDetails, date: e.target.value })} type="date" className="form-control" id="invoiceDate" />
                                    </div>
                                </div>
                                <div className="mb-3 row align-items-center">
                                    <label htmlFor="quantity" className="col-sm-3 col-form-label">Quantity</label>
                                    <div className="col-sm-9">
                                        <input onChange={handleQuantityChange} type="text" className="form-control" id="quantity" placeholder="Quantity" />
                                    </div>
                                </div>
                                {totalAmount > 0 && (
                                    <div className="mb-3 row align-items-center">
                                        <label className="col-sm-3 col-form-label">Total Amount:</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" value={totalAmount} readOnly />
                                        </div>
                                        <div className="col-sm-4">
                                            <Button variant="outline-primary" onClick={payNow}>Pay</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSell} disabled={!paymentConfirmed}>
                        Sell Product
                    </Button>
                </Modal.Footer>
            </Modal>

            
        </>
    );
}

export default Sell;