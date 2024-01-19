import axiosInstance from "@/utils/axiosIntance"

export const getAllProductCCQ = async (page, size, order, search, type_id, status) => {
    try {
        const res = await axiosInstance.get(`admin/product-ccq`, {
            params: {
                page,
                size,
                order,
                search,
                type_id,
                status,
            },
            data: search
        })
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const deleteProductCCQ = async (id) => {
    try {
        const res = await axiosInstance.delete(`/admin/delete-product-ccq/${id}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}