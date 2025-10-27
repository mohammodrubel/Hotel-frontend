import { baseApi } from "../../api/baseApi";

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Add new hotel
    addNewHotel: builder.mutation({
      query: (formData) => ({
        url: `/hotels`,
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" }, // required for FormData
      }),
      invalidatesTags: ["Hotels"], // invalidate list after adding
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
    getAllHotel: builder.query({
      query: (params) =>
        params
          ? `/hotels?${new URLSearchParams(params).toString()}`
          : `/hotels`,
      providesTags: (result) =>
        result?.data
          ? [...result.data.map(({ id }) => ({ type: "Hotels", id })), "Hotels"]
          : ["Hotels"],
    }),
  }),
});

export const {
  useAddNewHotelMutation,
  useGetAllHotelQuery,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelApi;
