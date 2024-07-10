import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import Bikes from '../Bikes'

const BuyHome = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Bikes searchTerm={searchTerm} />
    </>
  )
}

export default BuyHome
