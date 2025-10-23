import { baseApi } from "../../api/baseApi";

export const hotelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addNewHotel: builder.mutation({
            query: (data) => ({
                url: `/hotels`,
                method: "POST",
                body: data,
            }),
        }),
        GetAllHotel: builder.query({
            query: (args) => {
                  const queryString = new URLSearchParams(
                    args?.reduce((acc, { name, value }) => {
                      if (value !== undefined && value !== null) {
                        acc[name] = value;
                      }
                      return acc;
                    }, {})
                  ).toString();
                return {
                  url: `/hotels?${queryString}`,
                  method: "GET",
                };
            },
        }),
    }),
});

export const { useAddNewHotelMutation ,useGetAllHotelQuery} = hotelApi;
