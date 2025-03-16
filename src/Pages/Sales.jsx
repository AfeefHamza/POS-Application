import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SidebarPOS from '../Components/SidebarPOS'
import { getUserInvoicesAPI } from '../Services/allAPIs'
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import Pgz from '../Admin/AdminComponents/Pgz'

function Sales() {

  const [userInvoices, setuserInvoices] = useState([])

  useEffect(() => {
    getUserInvoices()
  }, [])

  const getUserInvoices = async () => {
    const token = sessionStorage.getItem("token")

    try {
      const reqHeader = {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
      const result = await getUserInvoicesAPI(reqHeader)
      if (result.status === 200) {
        setuserInvoices(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const generatepdf = (invoice) => {
    const pdf = new jspdf();

    pdf.setFontSize(20);
    pdf.setTextColor("#007bff");
    pdf.text(`Invoice No: ${invoice.invoiceNo}`, 10, 10);

    pdf.setFontSize(14);
    pdf.setTextColor("#6c757d");
    pdf.text(`Date: ${invoice.date}`, 10, 20);
    pdf.text(`Customer Name: ${invoice.customer}`, 10, 30);

    const tableStyles = {
      headStyles: {
        fillColor: '#28a745',
        textColor: '#fff',
        fontStyle: 'bold',
        fontSize: 12,
      },
      bodyStyles: {
        textColor: '#343a40',
        fontSize: 10,
      },
      alternateRowStyles: {
        fillColor: '#f2f2f2',
      },
      styles: {
        cellPadding: 5,
        minCellHeight: 15,
      },
      columnStyles: { 
        0: { cellWidth: 40 },
        1: { halign: 'center' },
        2: { halign: 'right' },
        3: { halign: 'right' },  
      },
    };

    let head = [['Product Name', 'Quantity', 'Price', 'Total Amount']];
    let body = [[invoice.productname, invoice.quantity, invoice.sprice, invoice.amount]];

    autoTable(pdf, {
      head: head,
      body: body,
      startY: 50,
      ...tableStyles,
    });

    const finalY = pdf.lastAutoTable.finalY + 10;

    pdf.setFontSize(14);
    pdf.setTextColor("#000");
    pdf.text(`Total Amount: $${invoice.amount}`, 10, finalY);

    pdf.output('dataurlnewwindow');
    pdf.save(`invoice-${invoice.invoiceNo}.pdf`);
  };

  const [currentPage,setcurrentPage]=useState(1)
  const [itemPerPage]=useState(8)
  
  let endingIndex=currentPage*itemPerPage
  let startingIndex=endingIndex-itemPerPage
  let currentItems=userInvoices.slice(startingIndex,endingIndex)

  return (
    <>
      <Row>
        <Col lg={2}>
          <SidebarPOS />
        </Col>

        <Col lg={10}>
          <div className="container-fluid p-4" style={{ background: 'linear-gradient(135deg, #f3f4f6, #e0f2fe)' }}>
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: '#e6f7ff' }}>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered">
                        <thead className="bg-primary text-white">
                          <tr>
                            <th>Invoice No:</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Amount</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems?.length > 0 ?
                            currentItems.map((item, index) => (
                              <tr key={index}>
                                <td>{item.invoiceNo}</td>
                                <td>{item.date}</td>
                                <td>{item.customer}</td>
                                <td>{item.productname}</td>
                                <td>{item.quantity}</td>
                                <td>{item.sprice}</td>
                                <td>{item.amount}</td>
                                <td>
                                  <button onClick={() => generatepdf(item)} className='btn btn-success rounded-3 shadow-sm'>Download Invoice</button>
                                </td>
                              </tr>
                            ))
                            :
                            <tr><td colSpan="8" className='text-danger text-center'>Nothing To Display...</td></tr>
                          }
                        </tbody>
                      </table>
                      {currentItems?.length>0 &&
                        <Pgz totalitems={userInvoices.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
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

export default Sales