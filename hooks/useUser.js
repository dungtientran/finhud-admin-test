import useSWR from "swr";
import axiosInstance from "@/utils/axiosIntance";
import { useState } from "react";

const LoginToken = async () => {
    try {
        const res = await axiosInstance.get('/admin/info')
        if(res.data.code === 200){
            return res.data.data
        } else {
            const error = new Error("Not authorized!");
            error.status = 403;
            throw error;
        }
    } catch (error) {
        console.error('error', error.message);
        throw new Error("Not authorized!");
    }
};

export default function useUser() {
    const { data, mutate, error } = useSWR('api_user',
        LoginToken
      );

    const loading = !data && !error;
    const loggedOut = error && error.status === 403;

    const logout = () => {
        // Xóa token từ localStorage
        localStorage.removeItem('token');
        // Cập nhật token thành null và tái tạo bộ nhớ cache
        mutate(null);
    };
    return {
        loading,
        loggedOut,
        user: data,
        mutate,
        logout
    };
}