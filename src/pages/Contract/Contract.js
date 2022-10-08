import './contract.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Helmet from '~/components/Helmet/Helmet';
import Image from '~/components/Image';
import Dropdown from '~/components/Dropdown/Dropdown';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import coachGarageAPI from '~/api/coachGarageAPI';
import config from '~/config';

import country from '~/fakedata/country';
function Contract() {
    const currentUserId = localStorage.getItem('userId');
    const nav = useNavigate();
    useEffect(() => {
        if (!currentUserId) {
            nav(config.routes.signin);
        }
    }, [currentUserId, nav]);
    let selectedDistrict = '';
    let selectedDistrictId = '';

    // Test
    // let countryName = '';
    // let countryId = '';
    // const handleClick = () => {
    //     console.log(countryName);
    //     console.log(countryId);
    // };

    const formik = useFormik({
        initialValues: {
            fullname: '',
            name_garage: '',
            phone: '',
            email: '',
            address: '',
            districId: '',
            userId: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Vui lòng điền trường này !'),
            phone: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(
                    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    'Phải là định dạng số và đủ 10 ký tự !',
                ),
            email: Yup.string()
                .required('Vui lòng điền trường này !')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Vui lòng nhập đúng định dạng email !'),
            name_garage: Yup.string().required('Vui lòng điền trường này !'),
            address: Yup.string().required('Vui lòng điền trường này !'),
        }),
        onSubmit: async (values) => {
            console.log(currentUserId, selectedDistrictId);
            values.userId = currentUserId;
            values.districId = selectedDistrictId;
            if (!values.userId) {
                toast.error('Vui lòng đăng nhập để thực hiện đăng kí ', {
                    theme: 'colored',
                });
            } else {
                try {
                    const params = {
                        name: values.name_garage,
                        phone: values.phone,
                        address: values.address,
                        districId: +selectedDistrictId,
                        userId: +currentUserId,
                    };
                    const response = await coachGarageAPI.postAddGarage(params);
                    if (response.code === 200) {
                        toast.success('Đơn đăng kí đã được gửi đi !', { theme: 'colored' });
                    } else {
                        toast.error('Đăng ký thất bại! ' + response.message, {
                            theme: 'colored',
                        });
                    }
                } catch (error) {
                    console.log('Thất bại khi gửi dữ liệu: ', error.message);
                    toast.error('Thất bại khi gửi dữ liệu ! ' + error.message, { theme: 'colored' });
                }
                console.log(values);
            }
        },
    });

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
                                    <form onSubmit={formik.handleSubmit}>
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
                                                    value={formik.values.fullname}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                            {formik.errors.fullname && (
                                                <p className="signin-signup__errorMsg">{formik.errors.fullname}</p>
                                            )}
                                        </div>
                                        <div class="col-md-11 mb-2 pb-2">
                                            <label class="form-label" for="name_garage">
                                                Tên nhà xe
                                            </label>
                                            <div class="form-outline">
                                                <input
                                                    type="text"
                                                    id="name_garage"
                                                    name="name_garage"
                                                    class="form-control form-control-lg"
                                                    value={formik.values.name_garage}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                            {formik.errors.name_garage && (
                                                <p className="signin-signup__errorMsg">{formik.errors.name_garage}</p>
                                            )}
                                        </div>
                                        <div class="col-md-11 mb-2 pb-2">
                                            <div class="form-outline">
                                                <label class="form-label">Tỉnh, thành phố</label>
                                                <div style={{ height: '56px' }}>
                                                    <Dropdown
                                                        maxHeight={'150px'}
                                                        options={country}
                                                        onChange={({ selected, selectedId }) => {
                                                            selectedDistrict = selected;
                                                            selectedDistrictId = selectedId;
                                                        }}
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
                                                    value={formik.values.address}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                            {formik.errors.address && (
                                                <p className="signin-signup__errorMsg">{formik.errors.address}</p>
                                            )}
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
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                            {formik.errors.email && (
                                                <p className="signin-signup__errorMsg">{formik.errors.email}</p>
                                            )}
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
                                                    value={formik.values.phone}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                            {formik.errors.phone && (
                                                <p className="signin-signup__errorMsg">{formik.errors.phone}</p>
                                            )}
                                        </div>

                                        <div class="col-md-11 pt-2" style={{ textAlign: 'right' }}>
                                            <input class=" btn-lg btn-signup" type="submit" value="Đăng kí" />
                                        </div>
                                    </form>
                                    {/* <button class=" btn-lg btn-signup" onClick={handleClick}>
                                        Dk
                                    </button> */}
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
