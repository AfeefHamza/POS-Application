import React, { createContext, useEffect, useState } from 'react'
export const authorizationContext=createContext()


function AuthorizationContext({children}) {

        const [isAuthorized,setIsAuthorized]=useState()

        useEffect(() => {
            if(sessionStorage.getItem("token"))
            {
              setIsAuthorized(true)
            }
            else
            {
              setIsAuthorized(false)
            }
          }, [])
    
    
  return (
<>
<authorizationContext.Provider value={{isAuthorized,setIsAuthorized}}>
{children}
</authorizationContext.Provider> 
</>
 )
}

export default AuthorizationContext