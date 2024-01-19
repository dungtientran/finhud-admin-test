import axiosInstance from "@/utils/axiosIntance"

export const getCustomerAccount = async (page, size, order, search, status, start_date, end_date) => {
    try {
        const res = await axiosInstance.get(`/admin/customer`, {
            params: {
                page,
                size,
                order,
                search,
                status,
                start_date,
                end_date,
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getCustomerAccountDetails = async (customerId) => {
    try {
        const res = await axiosInstance.get('/admin/customer/info', {
            params: {
                customerId
            }
        });
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getCustomerRequets = async (page, size, order, search, request_type_id, request_status_id, start_date, end_date) => {
    try {
        const res = await axiosInstance.get(`/request/user-request`, {
            params: {
                page,
                size,
                order,
                search,
                request_type_id,
                request_status_id,
                start_date,
                end_date,
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getCustomerRequetsDetails = async (requestId) => {
    try {
        const res = await axiosInstance.get('/request/user-request/detail', {
            params: {
                requestId
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const getCustomerAsset = async (order, search, total_asset_min, total_asset_max) => {
    try {
        const res = await axiosInstance.get(`/admin/user-asset`, {
            params: {
                order,
                search,
                total_asset_min,
                total_asset_max,
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getCustumerEquity = async () => {
    try {
        const res = await axiosInstance.get(`/admin/user-asset?page=1`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getCustumerDetailsAsset = async (userId) => {
    try {
        const res = await axiosInstance.get(`/admin/user-asset/${userId}`);
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getCustumerDetailsEquity = async (userId) => {
    try {
        const res = await axiosInstance.get(`/admin/user-equity/${userId}`);
        return res.data
    } catch (error) {
        console.log(error);
    }
}

