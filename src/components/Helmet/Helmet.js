import React from 'react';
import PropTypes from 'prop-types';

function Helmet(props) {
    document.title = 'Vé Xe H&L - ' + props.title;

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return <div>{props.children}</div>;
}

Helmet.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Helmet;
