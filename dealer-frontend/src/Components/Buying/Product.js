import React from 'react'
import { useNavigate } from 'react-router-dom'
const Product = ({carPart}) => {
const {_id, img, name, price, quantity, description} =carPart;
const navigate = useNavigate();
const navigatetoPartsDetail = (_id) =>{
    navigate(`/parts/${_id}`);
}


  return (
    <>
      <div className="card card-compact w-96 bg-base-100 mx-auto shadow-xl border-2 hover:bg-gray-200 hover:scale-105 hover:duration-500">
        <figure className='hover:scale-110 p-5'>
            <img className='h-60' src={img} alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="text-2xl text-center font-bold">{name.slice(0,35)}</h2>
            <p className="text-2xl text-center font-bold">Price: ${price}</p>
            <p className="text-2xl text-center font-bold">Quantity: ${quantity}</p>
            <p>{description.slice(0,300)}</p>
            <div className="card-actions justify-end">
                <button onClick={()=>navigatetoPartsDetail(_id)}
                    className='btn btn-primary'
                >
                Book Now
                </button>
            </div>
        </div>

      </div>
    </>
  )
}

export default Product
