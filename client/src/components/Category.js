import React from 'react'

function Category({ category }) {
    return (
        <div className='List'>
              <p className='ctgName'>{category.name}</p>
            
        </div>
    )
}

export default Category