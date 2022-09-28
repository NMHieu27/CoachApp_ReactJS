import './dropdown.scss';
import { useState, useRef } from 'react';
function Dropdown({
    selected,
    setSelected,
    options = [],
    icon = 'fas fa-caret-down',
    isIcon = false,
    isEdit = false,
    placeholder = '',
}) {
    const [isActive, setIsActive] = useState(false);

    const dropdown_toggle_el = useRef(null);
    const dropdown_content_el = useRef(null);
    const dropdown_input_el = useRef(null);

    const compareIgnore = (str1, str2) => {
        return str1
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .includes(
                str2
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd')
                    .replace(/Đ/g, 'D'),
            );
    };

    const renderDropdownItem = () => {
        let result = options.filter((option) => {
            return compareIgnore(option.name, dropdown_input_el.current.value);
        });
        if (result.length === 0) {
            result = [...options];
        }
        return (
            <div ref={dropdown_content_el} className="dropdown-content">
                {result.map((option) => (
                    <div
                        key={option.id}
                        onClick={(e) => {
                            console.log(option.id);
                            setSelected(option.name);
                            setIsActive(false);
                        }}
                        className="dropdown-item"
                    >
                        {option.name}
                    </div>
                ))}
            </div>
        );
    };

    const clickOutsideRef = (content_ref, toggle_ref) => {
        document.addEventListener('mousedown', (e) => {
            // user click toggle
            if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
                setIsActive(true);
                if (isEdit) {
                    dropdown_input_el.current.value = '';
                    dropdown_input_el.current.placeholder = placeholder;
                }
            } else {
                // user click outside toggle and content
                if (content_ref.current && !content_ref.current.contains(e.target)) {
                    setIsActive(false);
                    if (isEdit && !options.some((option) => option.name.includes(dropdown_input_el.current.value))) {
                        setSelected('');
                    }
                }
            }
        });
    };
    clickOutsideRef(dropdown_content_el, dropdown_toggle_el);
    return (
        <div ref={dropdown_toggle_el} className="dropdown">
            <div className="dropdown-btn">
                {isEdit ? (
                    <input
                        className="dropdown-input"
                        ref={dropdown_input_el}
                        type="text"
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                    />
                ) : (
                    selected
                )}

                {isIcon && (
                    <span>
                        {' '}
                        <i style={{ color: '#2e3c50' }} className={icon}></i>
                    </span>
                )}
            </div>
            {isEdit && isActive
                ? renderDropdownItem()
                : isActive && (
                      <div ref={dropdown_content_el} className="dropdown-content">
                          {options.map((option) => (
                              <div
                                  key={option.id}
                                  onClick={(e) => {
                                      setSelected(option.name);
                                      setIsActive(false);
                                  }}
                                  className="dropdown-item"
                              >
                                  {option.name}
                              </div>
                          ))}
                      </div>
                  )}
        </div>
    );
}

export default Dropdown;
