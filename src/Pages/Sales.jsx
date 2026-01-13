import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import SidebarPOS from '../Components/SidebarPOS'
import { getUserInvoicesAPI } from '../Services/allAPIs'
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'
import Pgz from '../Admin/AdminComponents/Pgz'
import '../Styles/admin-pages.css'

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
      <Row style={{ margin: 0 }}>
        <Col md={2} className="p-0">
          <SidebarPOS />
        </Col>

        <Col md={10} className="p-0">
          <div className="page-container p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #fce7f3 100%)' }}>
            <div className="page-header mb-4">
              <h1>Sales History</h1>
              <p>View and manage all your sales invoices</p>
            </div>
            <div className="modern-card overflow-hidden">
              <div className="table-responsive">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems?.length > 0 ?
                      currentItems.map((item, index) => (
                        <tr key={index}>
                          <td><strong>#{item.invoiceNo}</strong></td>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                          <td>{item.customer}</td>
                          <td>{item.productname}</td>
                          <td><span className="badge-modern badge-info">{item.quantity}</span></td>
                          <td style={{ color: '#10b981', fontWeight: 'bold' }}>₹{item.sprice}</td>
                          <td style={{ color: '#0f3460', fontWeight: 'bold', fontSize: '16px' }}>₹{item.amount}</td>
                          <td>
                            <button onClick={() => generatepdf(item)} className='modern-btn modern-btn-success' style={{ fontSize: '12px', padding: '6px 12px' }}>
                              <i className="fas fa-download me-1"></i>Download
                            </button>
                          </td>
                        </tr>
                      ))
                      :
                      <tr>
                        <td colSpan="8" className='text-center'>
                          <div className="empty-state">
                            <div className="empty-state-icon">📄</div>
                            <p className="empty-state-title">No Invoices Found</p>
                          </div>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
                {currentItems?.length>0 &&
                  <div className="p-4" style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                    <Pgz totalitems={userInvoices.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage}/>
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

export default Sales