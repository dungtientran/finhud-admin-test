import axiosInstance from "@/utils/axiosIntance";
export const getTransactionOrder = async (page, size, order, search, start_date, end_date, status_id, type_id) => {
    try {
        const res = await axiosInstance.get(`/admin/transaction-order`, {
            params: {
                page,
                size,
                order,
                search,
                start_date,
                end_date,
                status_id,
                type_id,
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getTransactionRequest = async (page, size, order, search, start_date, end_date, request_status_id, type_id) => {
    try {
        const res = await axiosInstance.get(`/request/get-transaction-request`, {
            params: {
                page,
                size,
                order,
                search,
                start_date,
                end_date,
                request_status_id,
                type_id
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getTransactionOrderDetails = async (transactionId) => {
    try {
        const res = await axiosInstance.get('/admin/transaction/detail', {
            params: {
                transactionId
            }
        });
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getTransactionRequestDetails = async (requestId) => {
    try {
        const res = await axiosInstance.get('/request/get-transaction-request/detail', {
            params: {
                requestId
            }
        });
        return res.data
    } catch (error) {
        console.log(error);
    }
}

