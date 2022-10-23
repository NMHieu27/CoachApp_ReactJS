const routes = {
    // Auth routes
    signin: '/auth/dang-nhap',
    signup: '/auth/dang-ki',

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
    // --Admin - Coach management
    coachManagement: '/admin/danh-sach-xe',
    addCoach: '/admin/danh-sach-xe/them-xe',
    editCoach: '/admin/danh-sach-xe/chinh-sua/:id',
    // --Admin - Coaches management
    coachesManagement: '/admin/danh-sach-chuyen-xe',
    addCoaches: '/admin/danh-sach-chuyen-xe/them-xe',
    editCoaches: '/admin/danh-sach-chuyen-xe/chinh-sua/:id',
    // --Admin - Stats - revenue
    revenueStat: '/admin/thong-ke-doanh-thu',
    coachesStat: '/admin/thong-ke-mat-do-chuyen-xe',

    // Coach Garage routes
    garage: '/garage',
    // --Garage - Coach management
    garageManageCoach: '/garage/danh-sach-xe',
    garageAddCoach: '/garage/danh-sach-xe/them-xe',
    garageEditCoach: '/garage/danh-sach-xe/chinh-sua/:id',
    // --Garage - Coaches management
    garageManageCoaches: '/garage/danh-sach-chuyen-xe',
    garageAddCoaches: '/garage/danh-sach-chuyen-xe/them-xe',
    garageEditCoaches: '/garage/danh-sach-chuyen-xe/chinh-sua/:id',
    // --Garage - Stats
    garageRevenueStat: '/garage/thong-ke-doanh-thu',
    garageCoachesStat: '/garage/thong-ke-mat-do-chuyen-xe',

    // Client routes
    home: '/',
    contract: '/mo-ban-ve',
    goodsmanagement: '/don-hang',
    booking: '/dat-ve',
    coachesdetail: '/chi-tiet-chuyen-xe/:coachesID',
    accountinfo: '/thong-tin-ca-nhan',
    accountinfosetting: '/thong-tin-ca-nhan/chinh-sua',

    //unauthorized
    unauthorized: '/unauthorized',
};

export default routes;
