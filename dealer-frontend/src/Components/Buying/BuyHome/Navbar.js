import React, { useContext, useState } from 'react';
import { AiOutlineShoppingCart, AiOutlineHome } from 'react-icons/ai';
import { TiHome } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';

const Navbar = ({ onSearch }) => {
    const { mechauthState } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value); // Propagate search term to parent component
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                <div className="d-flex align-items-center" style={{ gap: '15px', marginLeft: '20px' }}>
                    <Link className="nav-link" to={`/buyparts/${mechauthState.mechanicId}`} style={{ fontWeight: 'bold', fontSize: '2rem', color: 'black', display: 'flex', alignItems: 'center' }}>
                        <TiHome style={{ color: 'black', marginRight: '10px' }} />
                    </Link>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search Products"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchInputChange}
                            style={{border:'1px solid black'}}
                        />
                        <button className="btn btn-outline-primary"  type="submit">Search</button>
                    </form>
                </div>
                <ul className="navbar-nav mb-2 mb-lg-0 d-flex flex-row align-items-center" style={{ gap: '15px' }}>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/${mechauthState.mechanicId}/orderhistory`} style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'black' }}>
                            Order History
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/cart/${mechauthState.mechanicId}`} style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'black' }}>
                            <AiOutlineShoppingCart /> Cart
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
};

export default Navbar;
