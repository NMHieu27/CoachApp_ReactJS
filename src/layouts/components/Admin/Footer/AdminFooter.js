import React from 'react';
const AdminFooter = () => {
    return (
        <footer>
            <div class="text-center p-3">
                <a class="text-dark" href="#!" style={{ fontWeight: 'bold' }}>
                    © 2022 Copyright: H&L Company
                </a>
            </div>
        </footer>
    );
};

export default React.memo(AdminFooter);
