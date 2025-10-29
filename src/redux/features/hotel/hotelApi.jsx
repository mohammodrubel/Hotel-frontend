import { baseApi } from "../../api/baseApi";

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewHotel: builder.mutation({
      query: (formData) => ({
        url: `/hotels`,
        method: "POST",
        body: formData, // ✅ just send FormData
        // headers: remove this line
      }),
      invalidatesTags: ["Hotels"],
    }),
    // ✅ Update hotel
    updateHotel: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hotels/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // ✅ Delete hotel
    deleteHotel: builder.mutation({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Hotels", id },
        "Hotels",
      ],
    }),

    // ✅ Get all hotels
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

export const {
  useAddNewHotelMutation,
  useGetAllHotelQuery,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelApi;
