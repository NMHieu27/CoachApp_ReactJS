import { useState } from 'react';
import './DropdownItem.scss';
function DropdownItem({ parent, children, value, setValue }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className="dropdown-item-custom">
            <div className="dropdown-item-custom__parent">
                <p onClick={() => setIsCollapsed(!isCollapsed)}>
                    <i
                        class={`fa-sharp fa-solid fa-caret-${isCollapsed ? 'down' : 'right'}`}
                        style={{ marginRight: '5px' }}
                    ></i>
                </p>
                <p> {parent.name}</p>
            </div>
            {isCollapsed && (
                <div className="dropdown-item-custom__group-child-item">
                    {children.map((sub) => (
                        <p className="dropdown-item-custom__child-item" onClick={() => setValue(sub.name)}>
                            {sub.name}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownItem;
