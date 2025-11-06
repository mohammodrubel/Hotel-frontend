import { baseApi } from "../../api/baseApi";

export const UsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useAllUsersQuery } = UsersApi;
