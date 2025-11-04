import { baseApi } from "../../api/baseApi";

export const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewBooking: builder.mutation({
      query: (data) => ({
        url: `/booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),

    getAllBooking: builder.query({
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
          url: `/booking?${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useAddNewBookingMutation, useGetAllBookingQuery } = BookingApi;
