import commonAPI from './commonAPI' 
import server_url from './server_url'

export const userRegisterAPI = async(reqBody)=>{

    return await commonAPI("POST",`${server_url}/register`,reqBody)
}

export const userVerifyOTPAPI = async (reqBody) => {
    // { userId: "", otp: ""}
  return await commonAPI("POST", `${server_url}/verify-otp`, reqBody);
};


export const userLoginAPI = async(reqBody)=>{

    return await commonAPI("POST",`${server_url}/login`,reqBody)
}


export const addCategoryAPI = async(reqBody,reqHeader)=>{

    return await commonAPI("POST",`${server_url}/add-category`,reqBody,reqHeader)
}

export const getAllCategoryAPI = async(searchKey,reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-all-category?search=${searchKey}`,"",reqHeader)
}


export const addbrandAPI = async(reqBody,reqHeader)=>{

    return await commonAPI("POST",`${server_url}/add-brand`,reqBody,reqHeader)
}

export const getAllBrandAPI = async(searchKey,reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-all-brand?search=${searchKey}`,"",reqHeader)
}

export const addcompanyAPI = async(reqBody,reqHeader)=>{

    return await commonAPI("POST",`${server_url}/add-company`,reqBody,reqHeader)
}

export const getAllCompanyAPI = async(searchKey,reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-all-company?search=${searchKey}`,"",reqHeader)
}


export const addproductsAPI = async(reqBody,reqHeader)=>{

    return await commonAPI("POST",`${server_url}/add-product`,reqBody,reqHeader)
}

export const getAllProductsAPI = async(searchKey,reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-all-products?search=${searchKey}`,"",reqHeader)
}

export const deleteProductAPI = async(pid,reqHeader)=>{

    return await commonAPI("DELETE",`${server_url}/delete-product/${pid}`,{},reqHeader)
}

export const updateProductAPI = async (pid,reqBody,reqHeader)=>{

    return await commonAPI("PUT",`${server_url}/update-product/${pid}`,reqBody,reqHeader)
 
 }

 export const updateStockAPI = async (pid,reqBody,reqHeader)=>{

    return await commonAPI("PUT",`${server_url}/update-stock/${pid}`,reqBody,reqHeader)
 
 }

 export const deleteCategoryAPI = async(pid,reqHeader)=>{

    return await commonAPI("DELETE",`${server_url}/delete-category/${pid}`,{},reqHeader)
}

export const deleteBrandAPI = async(pid,reqHeader)=>{

    return await commonAPI("DELETE",`${server_url}/delete-brand/${pid}`,{},reqHeader)
}

export const deleteCompanyAPI = async(pid,reqHeader)=>{

    return await commonAPI("DELETE",`${server_url}/delete-company/${pid}`,{},reqHeader)
}


export const addCustomerAPI = async(reqBody,reqHeader)=>{

    return await commonAPI("POST",`${server_url}/add-customer`,reqBody,reqHeader)
}

export const editProfileAPI = async (reqBody,reqHeader)=>{

    return await commonAPI("PUT",`${server_url}/edit-profile`,reqBody,reqHeader)
 
 }


 export const addInvoiceAPI = async (pid,reqBody,reqHeader)=>{

    return await commonAPI("POST",`${server_url}/add-invoice/${pid}`,reqBody,reqHeader)
 
 }

 export const getAllUsersAPI = async (reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-all-users`,"",reqHeader)
 
 }

 export const getAllCustomersAPI = async (searchKey,reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-all-customer?search=${searchKey}`,"",reqHeader)
 
 }
 export const deleteCustomerAPI = async(pid,reqHeader)=>{

    return await commonAPI("DELETE",`${server_url}/delete-customer/${pid}`,{},reqHeader)
}

 export const deleteUserAPI = async(id,reqHeader)=>{

    return await commonAPI("DELETE",`${server_url}/delete-user/${id}`,{},reqHeader)
}
 
export const getUserInvoicesAPI = async (reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-user-invoice`,"",reqHeader)
 
 }

 export const getInvoiceNumberAPI = async (reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-invoice-number`,"",reqHeader)
 
 }

 export const getTotalStockAPI= async (reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-total-stock`,"",reqHeader)
 
 }

 export const getTotalQuantityAPI= async (reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-total-quantity`,"",reqHeader)
 
 }

 export const getTotalAmountAPI= async (reqHeader)=>{

    return await commonAPI("GET",`${server_url}/get-total-amount`,"",reqHeader)
 
 }

 export const getUserTotalQuantityAPI= async (reqHeader)=>{

    return await commonAPI("GET",`${server_url}/user-total-quantity`,"",reqHeader)
 
 }

 export const getUserTotalAmountAPI= async (reqHeader)=>{

    return await commonAPI("GET",`${server_url}/user-total-amount`,"",reqHeader)
 
 }

