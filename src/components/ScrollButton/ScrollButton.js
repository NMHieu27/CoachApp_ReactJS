import { useState } from 'react';
import './ScrollButton.scss';
function ScrollButton() {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button id="scroll-button" onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }}>
            <i class="fa-solid fa-circle-arrow-up"></i>
        </button>
    );
}

export default ScrollButton;
