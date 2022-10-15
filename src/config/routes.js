const routes = {
    // Auth routes
    signin: '/dang-nhap',
    signup: '/dang-ki',

    // Admin routes
    admin: '/admin',
    // -- Admin - account
    accounts: '/admin/nguoi-dung',
    addNewAccount: '/admin/nguoi-dung/them-nguoi-dung',
    editAccount: '/admin/nguoi-dung/chinh-sua/:id',
    // -- Admin - register coach garage
    registerManagement: '/admin/danh-sach-dang-ki-nha-xe',
    // -- Admin - category management
    categoryManagement: '/admin/phan-loai-xe',
    addCategory: '/admin/phan-loai-xe/them-phan-loai-xe',
    editCategory: '/admin/phan-loai-xe/chinh-sua/:id',
    // -- Admin - Coach garage management
    coachGarageManagement: '/admin/danh-sach-nha-xe',
    addCoachGarage: '/admin/danh-sach-nha-xe/them-nha-xe',
    editCoachGarage: '/admin/danh-sach-nha-xe/chinh-sua/:id',

    // Client routes
    home: '/',
    contract: '/mo-ban-ve',
    goodsmanagement: '/don-hang',
    booking: '/dat-ve',
    coachesdetail: '/chi-tiet-chuyen-xe/:coachesID',
    accountinfo: '/thong-tin-ca-nhan',
    accountinfosetting: '/thong-tin-ca-nhan/chinh-sua',
};

export default routes;
