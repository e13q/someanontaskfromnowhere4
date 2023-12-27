import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuth} from '../store/authSlice';


import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' })
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
            { credentials: 'include', url: '/r/refresh' },
            api,
            extraOptions
        )
        if (refreshResult.data) {
         // api.dispatch(tokenReceived(refreshResult.data))
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          //api.dispatch(loggedOut())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const userApi = createApi({
    reducerPath: 'userApi2',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (user) => ({
                url: '/registration',
                method: 'POST',
                credentials: 'include',
                body: user
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                  const { data } = await queryFulfilled;
                  await dispatch(setAuth(data));
                } catch (error) {}
              },
        }),
        login: builder.mutation({
            query: (user) => ({
                    url: '/login',
                    method: 'POST',
                    credentials: 'include',
                    body: user
                
            }),
            async onQueryStarted(user, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(setAuth(data));
                } catch (error) { 
                }
              },
        }),
        checkAuth: builder.mutation({
            query: () => ({
                url: '/r/checkAuth',
                method: 'POST',
                credentials: 'include'
            }),    
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/r/logout',
                method: 'POST',
                credentials: 'include'
            }),
            async onQueryStarted({ dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(setAuth(false));
                } catch (error) { 
                }
              },          
        })
    })
})
export const {useRegistrationMutation, useLoginMutation, useLogoutMutation, useCheckAuthMutation} = userApi;