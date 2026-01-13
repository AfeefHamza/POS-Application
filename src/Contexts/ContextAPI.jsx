import React, { createContext, useState } from 'react'

export const categoryResponseContext=createContext()
export const brandResponseContext=createContext()
export const companyResponseContext=createContext()
export const updateProductResponseContext=createContext()
export const updateStockResponseContext=createContext()
export const deleteProductResponseContext=createContext()
export const deleteCategoryResponseContext=createContext()
export const deleteBrandResponseContext=createContext()
export const deleteCompanyResponseContext=createContext()
export const sellQuantityResponeContext=createContext()
export const deleteUserResponeContext=createContext()
export const deleteCustomerResponeContext=createContext()
export const updateInvoiceResponeContext=createContext()


function ContextAPI({children}) {

        const [categoryResponse,setcategoryResponse]=useState("")
        const [brandResponse,setbrandResponse]=useState("")
        const [companyResponse,setcompanyResponse]=useState("")
        const [productResponse,setproductResponse]=useState("")
        const [stockResponse,setstockResponse]=useState("")
        const [deleteProductResponse,setdeleteProductResponse]=useState("")
        const [deleteCategoryResponse,setdeleteCategoryResponse]=useState("")
        const [deleteBrandResponse,setdeleteBrandResponse]=useState("")
        const [deleteCompanyResponse,setdeleteCompanyResponse]=useState("")
        const [sellQuantityResponse,setsellQuantityResponse]=useState("")
        const [deleteUserResponse,setdeleteUserResponse]=useState("")
        const [deleteCustomerResponse,setdeleteCustomerResponse]=useState("")
        const [updateInvoiceResponse,setupdateInvoiceResponse]=useState("")

    
  return (
    <>
    <updateInvoiceResponeContext.Provider value={{updateInvoiceResponse,setupdateInvoiceResponse}}>
    <deleteCustomerResponeContext.Provider value={{deleteCustomerResponse,setdeleteCustomerResponse}}>
    <deleteUserResponeContext.Provider value={{deleteUserResponse,setdeleteUserResponse}}>
    <sellQuantityResponeContext.Provider value={{sellQuantityResponse,setsellQuantityResponse}}>
    <deleteCompanyResponseContext.Provider value={{deleteCompanyResponse,setdeleteCompanyResponse}}>
    <deleteBrandResponseContext.Provider value={{deleteBrandResponse,setdeleteBrandResponse}}>
    <deleteCategoryResponseContext.Provider value={{deleteCategoryResponse,setdeleteCategoryResponse}}>
    <deleteProductResponseContext.Provider value={{deleteProductResponse,setdeleteProductResponse}}>
    <updateStockResponseContext.Provider value={{stockResponse,setstockResponse}}>
    <updateProductResponseContext.Provider value={{productResponse,setproductResponse}}>
    <companyResponseContext.Provider value={{companyResponse,setcompanyResponse}}>
    <categoryResponseContext.Provider value={{categoryResponse,setcategoryResponse}}>
            <brandResponseContext.Provider value={{brandResponse,setbrandResponse}}>
            {children}
            </brandResponseContext.Provider>
        </categoryResponseContext.Provider>
    </companyResponseContext.Provider>
    </updateProductResponseContext.Provider>
    </updateStockResponseContext.Provider>
    </deleteProductResponseContext.Provider>
    </deleteCategoryResponseContext.Provider>
    </deleteBrandResponseContext.Provider>
    </deleteCompanyResponseContext.Provider>
    </sellQuantityResponeContext.Provider>
    </deleteUserResponeContext.Provider>
    </deleteCustomerResponeContext.Provider>
    </updateInvoiceResponeContext.Provider>
   
    </>
  )
}

export default ContextAPI