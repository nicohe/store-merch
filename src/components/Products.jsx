import React, { useContext } from 'react';
import Product from './Product.jsx';
import AppContext from '../context/AppContext';
import '../styles/components/Products.css';

const Products = () => {
    const { state: { products }, addToCart } = useContext(AppContext);

    const handleAddToCart = product => () => {
        addToCart(product);
    }

    return (
        <div className="Products">
            <div className="Products-items">
                {
                    products.map(product => (
                        <Product key={products.id} product={product} handleAddToCart={handleAddToCart} />
                    ))
                }
            </div>
        </div>
    )
}

export default Products;