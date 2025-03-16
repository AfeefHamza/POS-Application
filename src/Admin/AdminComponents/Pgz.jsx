import React from 'react'

function Pgz({totalitems,itemPerPage,setcurrentPage,currentPage}) {


    let pages=[]


    for(let i=1;i<=Math.ceil(totalitems/itemPerPage);i++)
    {
            pages.push(i)
    }
    const handlePrev=()=>{
        if(currentPage>1){
            setcurrentPage(currentPage-1)
        }
    }

    const handleNext=()=>{
        if (currentPage<pages.length){
            setcurrentPage(currentPage+1)
        }
    }


  return (
    <>
    <div className='d-flex align-items-center justify-content-center my-5'>

        <button onClick={handlePrev} className='btn btn-outline-danger border border-1 me-2' disabled={currentPage==1}><i class="fa-solid fa-arrow-left"></i></button>
    {
        pages.map(page=>(
            <button onClick={()=>setcurrentPage(page)} className={`btn btn-outline-danger border border-1 me-2 ${currentPage==page?'active':''}`}>{page}</button>

        ))
    }

<button onClick={handleNext} className='btn btn-outline-danger border border-1 me-2' disabled={currentPage==pages.length}><i class="fa-solid fa-arrow-right"></i></button>
    </div>

    </>
  )
}

export default Pgz