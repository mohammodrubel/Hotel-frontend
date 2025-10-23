import { baseApi } from "../../api/baseApi";

export const roomApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addNewRoom: builder.mutation({
            query: (data) => ({
                url: `/room`,
                method: "POST",
                body: data,
            }),
        }),
        getAllRooms: builder.query({
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
                  url: `/room?${queryString}`,
                  method: "GET",
                };
            },
        }),
    }),
});

export const { useAddNewRoomMutation,useGetAllRoomsQuery} = roomApi;
