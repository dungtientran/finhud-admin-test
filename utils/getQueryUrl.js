import { useRouter } from 'next/router';
const getQueryUrl = () => {
    const { query } = useRouter();
    let page = Number(query.page) >= 1 ? Number(query.page) : 1;
    let size = Number(query.pasizege) >= 1 ? Number(query.size) : 20;
    let search = query.search;
    let order = query.order;
    let status = query.status;
    let start_date = query.start_date;
    let end_date = query.end_date;
    let request_type_id = query.request_type_id;
    let total_asset_min = query.total_asset_min;
    let total_asset_max = query.total_asset_max;
    let type_id = query.type_id;
    let status_id = query.status_id;
    let request_status_id = query.request_status_id;
    let role_id = query.role_id;
    let admin_user_status_id = query.admin_user_status_id;
    return {
        page,
        size,
        search,
        order,
        status,
        start_date,
        end_date,
        request_type_id,
        total_asset_min,
        total_asset_max,
        type_id,
        status_id,
        request_status_id,
        role_id,
        admin_user_status_id,
    }
}
export default getQueryUrl;