import axiosInstance from "@/utils/axiosIntance";

export const getSystemAccount = async (page, size, order, search, start_date, end_date, role_id, admin_user_status_id) => {
    try {
        const res = await axiosInstance.get(`/admin/system/accounts`, {
            params: {
                page,
                size,
                order,
                search,
                start_date,
                end_date,
                role_id,
                admin_user_status_id,
            }
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
export const getSystemRequest = async (page, size, order, search, start_date, end_date, request_type_id, request_status_id) => {
    try {
        const res = await axiosInstance.get(`/request/system-request`, {
            params: {
                page,
                size,
                order,
                search,
                start_date,
                end_date,
                request_type_id,
                request_status_id,
            }
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}