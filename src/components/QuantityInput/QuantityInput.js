import { useState, useEffect } from 'react';
import './QuantityInput.scss';
const defaultFn = () => {};
function QuantityInput({ onChange = defaultFn, maxValue = 100 }) {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrement = () => {
        if (quantity < maxValue) setQuantity(quantity + 1);
    };

    useEffect(() => {
        onChange({ value: quantity });
    }, [quantity, onChange]);

    return (
        <div className="quantity-container">
            <button className="quantity-button--left" onClick={handleDecrement}>
                &mdash;
            </button>
            <input className="quantity-input--center" type="text" value={quantity} readOnly />
            <button className="quantity-button--right" onClick={handleIncrement}>
                &#xff0b;
            </button>
        </div>
    );
}

export default QuantityInput;
