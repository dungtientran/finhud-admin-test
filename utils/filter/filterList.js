//system
export const roleFilterSystem = [
    // {
    //     label: "Tất cả",
    //     value: '',
    // },
    {
        label: "NV kiểm soát",
        value: "0",
    },
    {
        label: "NV báo cáo",
        value: "2",
    },
    {
        label: "NV hệ thống",
        value: "3",
    },
    {
        label: "NV quản trị",
        value: "4",
    },
    {
        label: "NV IT",
        value: "5",
    },
]
export const statusSystemFilter = [
    // {
    //     value: "",
    //     label: "Tất cả",
    // },
    {
        value: "1",
        label: "Đang hoạt động",
    },
    {
        value: "0",
        label: "Ngừng hoạt động",
    },
]

export const requestItems = [
    {
        value: 6,
        label: "Tạo tài khoản hệ thống",
    },
    {
        value: 7,
        label: "Cập nhật tài khoản",
    },
    {
        value: 8,
        label: "Đặt lại mật khẩu",
    },
];
export const statusItems = [
    {
        value: 0,
        label: "Chờ phê duyệt",
    },
    {
        value: 1,
        label: "Đã được phê duyệt",
    },
    {
        value: 2,
        label: "Không được phê duyệt",
    },
];

// Customer
export const statusFilter = [
    {
        value: "",
        label: "Tất cả",
    },
    {
        value: 1,
        label: "Đang hoạt động",
    },
    {
        value: 0,
        label: "Ngừng hoạt động",
    },

];
export const statusItemCheckbox = [
    {
        value: 0,
        label: "Chờ phê duyệt",
    },
    {
        value: 1,
        label: "Đã được phê duyệt",
    },
    {
        value: 2,
        label: "Không được phê duyệt",
    },
];
export const customerRequestCheckboxFilter = [
    {
        value: 0,
        label: "Mở tài khoản",
    },
    {
        value: 1,
        label: "Thay đổi thông tin",
    },
    {
        value: 2,
        label: "Đóng tài khoản",
    },
    {
        value: 3,
        label: "KYC",
    },
];
export const customerAssetFilter = [
    {
        value: "1",
        label: "Cận dưới (VND)",
    },
    {
        value: "2",
        label: "Cận trên (VND)",
    },
];
export const customerProfitFilter = [
    {
        value: "1",
        label: "Cận dưới (%)",
    },
    {
        value: "2",
        label: "Cận trên (%)",
    },
];

// Transaction
export const requetTypeTransactionOrderFilter = [
    {
        value: "2",
        label: "Mua",
    },
    {
        value: "1",
        label: "Bán",
    },

];
export const statusTransactionOrderFilter = [
    {
        value: "1",
        label: "Chưa thanh toán",
    },
    {
        value: "2",
        label: "Chờ xử lý",
    },
    {
        value: "5",
        label: "Đã thanh toán",
    },

];

// Product

export const typeCCQ = [
    {
        value: "1",
        label: "Quỹ cổ phiếu",
    },
    {
        value: "2",
        label: "Quỹ cân bằng",
    },
    {
        value: "3",
        label: "Quỹ đầu tư",
    },
    {
        value: "4",
        label: "Quỹ trái phiếu",
    },
]
export const statusCCQ = [
    {
        value: "1",
        label: "Đang hoạt động",
    },
    {
        value: "2",
        label: "Khóa",
    },
]


