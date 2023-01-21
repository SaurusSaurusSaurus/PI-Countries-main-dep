import React from "react";
import "./Pagination.css"

const Pagination = ({countriesPerPage, totalCountries, setCurrentPage, currentPage}) => {
    const pageNumbers =[]

    for (let i = 1; i<= Math.ceil(totalCountries / countriesPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <div className="body" >
           <ul className="pagination">
                {pageNumbers.map((page,index)=>{
                    return (
                        <button 
                            key={index} 
                            onClick={()=> setCurrentPage(page)} 
                            className={page === currentPage ? "active":""} >
                            {page}
            
                        </button>
                    )
                })}
           </ul>
        </div>
    );
};

export default Pagination;