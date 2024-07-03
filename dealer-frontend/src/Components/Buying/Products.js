import React from 'react'
import Product from './Product'
const Products = () => {
  return (
    <>
      <div className="my-10">
        <h4 className='lg:text-5xl text-4xl font-bol text-secondary text-center my-12'> OUR PARTS</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {carParts.slice(0,6).map((carPart)=>(
                <Product key={carPart._id} carPart={carPart}></Product>
            ))}

        </div>

      </div>
    </>
  )
}

export default Products
