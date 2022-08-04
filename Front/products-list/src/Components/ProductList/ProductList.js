import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        $(document).attr('title', 'Product List');

        axios.get('https://polar-shelf-26710.herokuapp.com/index.php')
        .then(res => {
            setProducts(res.data);
        });
    }, []);

    const handleMassDelete = () => {
        let checks = $('.delete-checkbox');
        checks = Array.from(checks).filter(check => check.checked)
        checks.forEach((e, index, array) => {
            array[index] = e.id;
        });

        axios.delete('https://polar-shelf-26710.herokuapp.com/index.php', { data: checks})
            .then(() => {
                window.location.reload(false);
            });
    }

    const handleCheck = (e) => {
        $(`.${e.target.id}`).toggleClass('checked');
    }

    return (
    <>
        <header>
            <h1>Product List</h1>
            <div>
                <Link to={'/add-product'}>ADD</Link>
                <button type={'button'} id={'delete-product-btn'} onClick={handleMassDelete}>MASS DELETE</button>
            </div>
        </header>
        <hr />
        <main>
            {products.map(product => { return (
            <div key={product.id} className={product.id}>
                <div>
                    <input type={'checkbox'} className={'delete-checkbox'} id={product.id} onClick={handleCheck}/>
                </div>
                <div>
                    <p>{product.sku}</p>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <p>{product.about}</p>
                </div>
            </div>
            )})}
        </main>
        <hr />
        <footer>
            <h4>Scandiweb Test assignment</h4>
        </footer>
    </>
    )
}

export default ProductList;