import { baseApi } from "../../api/baseApi";

export const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Booking
    addNewBooking: builder.mutation({
      query: (data) => ({
        url: `/booking`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),

    // ✅ Get All Bookings (Admin)
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
      providesTags: ["Booking"],
    }),

    // ✅ Get Current User’s Bookings
    getMyBooking: builder.query({
      query: () => ({
        url: `/booking/user`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),

    // ✅ Delete Booking
    removebooking: builder.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useAddNewBookingMutation,
  useGetAllBookingQuery,
  useGetMyBookingQuery,
  useUpdateBookingStatusMutation,
  useRemovebookingMutation,
} = BookingApi;
