import './contract.scss';
import { useState } from 'react';
import Helmet from '~/components/Helmet/Helmet';
import Image from '~/components/Image';
import Dropdown from '~/components/Dropdown/Dropdown';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import config from '~/config';

import country from '~/fakedata/country';
function Contract() {
    const currentUserId = localStorage.getItem('userId');
    const [selectedCountry, setSelectedCountry] = useState(country[0].name);
    const [selectedCountryId, setSelectedCountryId] = useState(country[0].id);
    console.log(selectedCountry);
    console.log(selectedCountryId);
    return (
        <Helmet title="Trở thành đối tác">
            <div className="contract-wrapper">
                <div className="contract-container container">
                    <div className="contract-content">
                        <div className="row contract-content__container">
                            <div className="col-5 contract-content__container__left">
                                <div className="contract-left_box">
                                    <div className="contract-title">Đăng kí mở bán vé</div>
                                    <div className="contract-img-box">
                                        <Image className="contract-img" src="cccc" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-7 contract-content__container__right">
                                <div className="contract-left_box">
                                    <form>
                                        <div class="col-md-11 mb-2 pb-2">
                                            <label class="form-label" for="fullname">
                                                Họ và tên
                                            </label>
                                            <div class="form-outline">
                                                <input
                                                    type="text"
                                                    id="fullname"
                                                    name="fullname"
                                                    class="form-control form-control-lg"
                                                    // value={formik.values.fullname}
                                                    // onChange={formik.handleChange}
                                                />
                                            </div>
                                            {/* {formik.errors.fullname && (
                                                    <p className="signin-signup__errorMsg">{formik.errors.fullname}</p>
                                                )} */}
                                        </div>
                                        <div class="col-md-11 mb-2 pb-2">
                                            <label class="form-label" for="garagename">
                                                Tên nhà xe
                                            </label>
                                            <div class="form-outline">
                                                <input
                                                    type="text"
                                                    id="garagename"
                                                    name="garagename"
                                                    class="form-control form-control-lg"
                                                    // value={formik.values.garagename}
                                                    // onChange={formik.handleChange}
                                                />
                                            </div>
                                            {/* {formik.errors.garagename && (
                                                    <p className="signin-signup__errorMsg">{formik.errors.garagename}</p>
                                                )} */}
                                        </div>
                                        <div class="col-md-11 mb-2 pb-2">
                                            <div class="form-outline">
                                                <label class="form-label">Tỉnh, thành phố</label>
                                                <div style={{ height: '56px' }}>
                                                    <Dropdown
                                                        maxHeight={'150px'}
                                                        options={country}
                                                        selected={selectedCountry}
                                                        setSelected={setSelectedCountry}
                                                        selectedId={selectedCountryId}
                                                        setSelectedId={setSelectedCountryId}
                                                        isEdit
                                                        placeholder="Chọn điểm đón"
                                                        top={'100%'}
                                                        paddingDropDown="0px 20px"
                                                        borderDropDown="1px solid #ccc"
                                                        borderRadiusDropDown="5px"
                                                        borderContentDropDown="1px solid #ccc"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-11 mb-2 pb-2">
                                            <label class="form-label" for="address">
                                                Địa chỉ cụ thể
                                            </label>
                                            <div class="form-outline">
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    class="form-control form-control-lg"
                                                    // value={formik.values.address}
                                                    // onChange={formik.address}
                                                />
                                            </div>
                                            {/* {formik.errors.garagename && (
                                                    <p className="signin-signup__errorMsg">{formik.errors.garagename}</p>
                                                )} */}
                                        </div>
                                        <div class="col-md-11 mb-2 pb-2">
                                            <div class="form-outline">
                                                <label class="form-label" for="emailAddress">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="emailAddress"
                                                    class="form-control form-control-lg"
                                                    // value={formik.values.email}
                                                    // onChange={formik.handleChange}
                                                />
                                            </div>
                                            {/* {formik.errors.email && (
                                                    <p className="signin-signup__errorMsg">{formik.errors.email}</p>
                                                )} */}
                                        </div>
                                        <div class="col-md-11 mb-2 pb-2">
                                            <div class="form-outline">
                                                <label class="form-label" for="phoneNumber">
                                                    Số điện thoại
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    id="phoneNumber"
                                                    class="form-control form-control-lg"
                                                    // value={formik.values.phone}
                                                    // onChange={formik.handleChange}
                                                />
                                            </div>
                                            {/* {formik.errors.phone && (
                                                    <p className="signin-signup__errorMsg">{formik.errors.phone}</p>
                                                )} */}
                                        </div>

                                        <div class="col-md-11 pt-2" style={{ textAlign: 'right' }}>
                                            <input class=" btn-lg btn-signup" type="submit" value="Đăng kí" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
}

export default Contract;
