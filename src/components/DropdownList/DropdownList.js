import { useState, useRef } from 'react';
import DropdownItem from './DropdownItem';
import './DropdownList.scss';

function DropdownList({ data }) {
    const [value, setValue] = useState();
    const inputRef = useRef();

    return (
        <div className="DropdownList">
            <input ref={inputRef} className="DropdownList__search-input" value={value} readOnly />
            <div className="DropdownList__items-container">
                <div className="DropdownList__items-container__content">
                    {data.map((value) => (
                        <div key={value.id}>
                            {value.children ? (
                                <DropdownItem
                                    parent={value}
                                    children={value.children}
                                    value={value}
                                    setValue={setValue}
                                />
                            ) : (
                                <p className="item-parent-content" onClick={() => setValue(value.name)}>
                                    {value.name}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DropdownList;
