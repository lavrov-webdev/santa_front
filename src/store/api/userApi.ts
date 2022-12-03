import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {LoginRoomReq} from "../../api/types";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => {
    login: builder.mutation<Lo>()
  }
})
