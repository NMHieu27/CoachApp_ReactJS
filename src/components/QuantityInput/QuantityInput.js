import { useState } from 'react';
import './QuantityInput.scss';
function QuantityInput() {
    const [quantity, setQuantity] = useState(8);

    const handleDecrement = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

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
