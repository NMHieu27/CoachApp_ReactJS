import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
function Modal({
    isShowing,
    setIsShowing,
    hide,
    width = '700px',
    children,
    btnLeft = 'Trở lại',
    btnRight = 'Hoàn tất',
    title = 'Modal',
    onClickAction,
    isFooter = false,
}) {
    const modal_el = useRef();

    // const clickOutsideRef = (toggle_ref) => {
    //     document.addEventListener('mousedown', (e) => {
    //         // user click outside toggle
    //         if (toggle_ref.current && !toggle_ref.current.className.includes(e.target.className)) {
    //             setIsShowing(false);
    //         }
    //     });
    // };
    // clickOutsideRef(modal_el);

    return isShowing
        ? ReactDOM.createPortal(
              <React.Fragment>
                  <div className="modal-overlay" />
                  <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <div ref={modal_el} className="modal" style={{ width: width }}>
                          <div className="modal-header">
                              <button
                                  type="button"
                                  className="modal-close-button"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={hide}
                              >
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div className="modal-title-custom">{title}</div>
                          <div className="modal-body-custom">{children}</div>
                          {isFooter && (
                              <div className="modal-footer-custom">
                                  <button className="modal-footer-custom__btn-left" onClick={hide}>
                                      {btnLeft}
                                  </button>
                                  <button className="modal-footer-custom__btn-right" onClick={onClickAction}>
                                      {btnRight}
                                  </button>
                              </div>
                          )}
                      </div>
                  </div>
              </React.Fragment>,
              document.body,
          )
        : null;
}
export default Modal;
