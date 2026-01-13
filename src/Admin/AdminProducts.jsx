import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Addstock from './AdminComponents/Addstock'
import Delete from './AdminComponents/Delete'
import UpdateProductInfo from './AdminComponents/UpdateProductInfo'
import SideBarAdmin from '../Admin/SideBarAdmin'
import { getAllBrandAPI, getAllCategoryAPI, getAllProductsAPI } from '../Services/allAPIs'
import { deleteProductResponseContext, updateProductResponseContext, updateStockResponseContext } from '../Contexts/ContextAPI'
import Pgz from './AdminComponents/Pgz'
import '../Styles/admin-pages.css'

function AdminProducts() {

    const [allProducts, setallProducts] = useState([])
    const { productResponse } = useContext(updateProductResponseContext)
    const { stockResponse } = useContext(updateStockResponseContext)
    const { deleteProductResponse } = useContext(deleteProductResponseContext)

    const [allCategorys, setallCategorys] = useState([])
    const [allBrands, setallBrands] = useState([])

    const [dummyallProducts, setdummyallProducts] = useState([])

    const [searchKey, setSearchKey] = useState("")

    useEffect(() => {
        getAllProducts()
        getAllCategory()
        getAllBrand()
    }, [searchKey, productResponse, stockResponse, deleteProductResponse])

    const getAllProducts = async () => {
        const token = sessionStorage.getItem("token")
        try {
            const reqHeader = {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }

            const result = await getAllProductsAPI(searchKey, reqHeader)
            if (result.status === 200) {
                setallProducts(result.data)
                setdummyallProducts(result.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getAllCategory = async () => {
        const token = sessionStorage.getItem("token")
        try {
            const reqHeader = {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }

            const result = await getAllCategoryAPI("", reqHeader)
            if (result.status === 200) {
                setallCategorys(result.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getAllBrand = async () => {
        const token = sessionStorage.getItem("token")
        try {
            const reqHeader = {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }

            const result = await getAllBrandAPI("", reqHeader)
            if (result.status === 200) {
                setallBrands(result.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const filterCategory = (category) => {
        if (category === "Filter by Category") {
            setallProducts(dummyallProducts)
        } else {
            const filteredProducts = dummyallProducts.filter(item => item.category === category)
            setallProducts(filteredProducts)
        }
    }

    const filterBrand = (brand) => {
        if (brand === "Filter by Brand") {
            setallProducts(dummyallProducts)
        } else {
            const filteredProducts = dummyallProducts.filter(item => item.brand === brand)
            setallProducts(filteredProducts)
        }
    }

    const [currentPage, setcurrentPage] = useState(1)
    const [itemPerPage] = useState(8)

    let endingIndex = currentPage * itemPerPage
    let startingIndex = endingIndex - itemPerPage

    let currentItems = allProducts.slice(startingIndex, endingIndex)

    return (
        <Row style={{ margin: 0 }}>
            <Col md={2} className="p-0">
                <SideBarAdmin />
            </Col>
            <Col md={10} className="p-0">
                <div className="page-container p-4" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)' }}>
                    <div className="page-header mb-4">
                        <h1>Manage Products</h1>
                        <p>View, edit, and manage all your products efficiently</p>
                    </div>

                    <div className="modern-card p-4 mb-4">
                        <div className="filter-section">
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="filter-group">
                                        <label>Search by Product Name</label>
                                        <div className="search-box">
                                            <i className="fas fa-search"></i>
                                            <input 
                                                onChange={(e) => setSearchKey(e.target.value)} 
                                                type="text" 
                                                className="modern-input" 
                                                placeholder="Search products..." 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="filter-group">
                                        <label>Filter by Category</label>
                                        <select onChange={(e) => filterCategory(e.target.value)} className="modern-select">
                                            <option defaultValue>Filter by Category</option>
                                            {allCategorys.length > 0 ?
                                                allCategorys.map((item) => (
                                                    <option key={item.name} value={item.name}>{item.name}</option>
                                                )) :
                                                <option className='text-danger'>Nothing To Display...</option>
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="filter-group">
                                        <label>Filter by Brand</label>
                                        <select onChange={(e) => filterBrand(e.target.value)} className="modern-select">
                                            <option defaultValue>Filter by Brand</option>
                                            {allBrands.length > 0 ?
                                                allBrands.map((item) => (
                                                    <option key={item.name} value={item.name}>{item.name}</option>
                                                )) :
                                                <option className='text-danger'>Nothing To Display...</option>
                                            }
                                        </select>
                                    </div>
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
                                        <th>Purchase From</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 ?
                                        currentItems.map((item, index) => (
                                            <tr key={item.id}>
                                                <td><strong>{startingIndex + index + 1}</strong></td>
                                                <td>{item.name}</td>
                                                <td><span className="badge-modern badge-info">{item.category}</span></td>
                                                <td><span className="badge-modern badge-success">{item.brand}</span></td>
                                                <td><strong>${item.price}</strong></td>
                                                <td>
                                                    <span className={`badge-modern ${item.stock > 50 ? 'badge-success' : item.stock > 20 ? 'badge-warning' : 'badge-danger'}`}>
                                                        {item.stock} units
                                                    </span>
                                                </td>
                                                <td>{item.companyname}</td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <Addstock details={item} />
                                                        <UpdateProductInfo details={item} />
                                                        <Delete insideAdminPr={true} details={item} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                <div className="empty-state">
                                                    <div className="empty-state-icon">📭</div>
                                                    <p className="empty-state-title">No Products Found</p>
                                                    <p>Try adjusting your filters or search terms</p>
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            {currentItems.length > 0 &&
                                <div className="p-4" style={{ textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                                    <Pgz totalitems={allProducts.length} itemPerPage={8} setcurrentPage={setcurrentPage} currentPage={currentPage} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default AdminProducts
