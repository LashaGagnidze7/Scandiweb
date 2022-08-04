import {useState, useEffect} from 'react'; 
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

function AddProduct() {
    const nav = useNavigate();
    const [type, setType] = useState('switcher');
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false); 

    const handleTypeChange = (e) => {
        setType(e.target.value);
        $('p').hide();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFlag2(false);
        let flag1 = false;
        setFlag(type === 'switcher');

        
        const allInputs = Array.from($('input'));
        const numberInputs = allInputs.slice(2);

        for (const input of allInputs) {
            if (input.value === '') {
                setFlag(true);
                flag1 = true;
                break;
            }
        }

        for (const input of numberInputs) {
            const number = Number(input.value);
            if (isNaN(number) || number <= 0) {
                $(`#${input.id}`).next().show();
                setFlag(true);
                flag1 = true;
            } else {
                $(`#${input.id}`).next().hide();
            }
        }

        if (!flag1) {
            const details = {};

            for (const input of allInputs) {
                details[input.id] = input.value;
            }

            details['type'] = type;

            axios.post('https://polar-shelf-26710.herokuapp.com/index.php', details)
                .then(res => {
                    res.data ? nav('/') : setFlag2(true);
                });
        }
    }

    useEffect(() => {
        $(document).attr('title', 'Product Add');
    }, []);

    const [switcher] = useState({
        'switcher': <></>,
        'DVDProduct': <>
            <label>
                   Size (MB) <input type={'text'} id={'size'} />
                   <p  style={{display: 'none'}} className={'error'}>Please, provide the data of indicated type</p>
            </label>
            <p>Please, provide size</p>
            </>,
        'FurnitureProduct': <>
            <label>
                Height (CM) <input type={'text'} id={'height'} />
                <p style={{display: 'none'}} className={'error'}>Please, provide the data of indicated type</p>
            </label>
            <label>
                Width (CM) <input type={'text'} id={'width' } />
                <p style={{display: 'none'}} className={'error'}>Please, provide the data of indicated type</p>
            </label>
            <label>
                Length (CM) <input type={'text'} id={'length'} />
                <p style={{display: 'none'}} className={'error'}>Please, provide the data of indicated type</p>
            </label>
            <p>Please, provide dimensions</p>
            </>,
        'BookProduct': <>
            <label>
                Weight (KG) <input type={'text'} id={'weight'} />
                <p style={{display: 'none'}} className={'error'}>Please, provide the data of indicated type</p>
            </label>
            <p>Please, provide weight</p>
            </>
    });

    return (
        <>
        <header>
            <h1>Product Add</h1>
            <div className='add'>
                <button type='submit' form='product_form'>Save</button>
                <Link to='/' >Cancel</Link>
            </div>
        </header>
        <hr />
        <main>
            <form id={'product_form'} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor={'sku'}>SKU</label>
                    <input type={'text'} id={'sku'} />
                </div>

                <div>
                    <label htmlFor={'name'}>Name</label>
                    <input type={'text'} id={'name'} />
                </div>

                <div>
                    <label htmlFor={'price'}>Price ($)</label>
                    <input type={'text'} id={'price'} />
                    <p style={{display: 'none'}} className={'error'}>Please, provide the data of indicated type</p>
                </div>

                <div>
                    <label htmlFor={'productType'}>Type Switcher:</label>
                    <select id={'productType'} onChange={handleTypeChange}>
                        <option id='Switcher' value={'switcher'}>Type Switcher</option>
                        <option id='DVDProduct' value={'DVDProduct'}>DVD</option>
                        <option id='FurnitureProduct' value={'FurnitureProduct'}>Furniture</option>
                        <option id='BookProduct' value={'BookProduct'}>Book</option>
                    </select>
                </div>

                <div className='specific'>
                    {switcher[type]}
                </div>
                {flag && <p className={'error1'}>Please, submit required data</p>}
                {flag2 && <p className={'error1'}>Choose different sku</p>}
            </form>
        </main>
        <hr />
        <footer>
            <h4>Scandiweb Test assignment</h4>
        </footer>
        </>
    );
}

export default AddProduct;
