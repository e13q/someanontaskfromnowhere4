import $api from "../http";
import {Axios} from 'axios';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
// export default class UserService{
//     static async fetchUsers() {
//         return $api.get('/users');
//     }
// }
export const userAPI = createApi({})