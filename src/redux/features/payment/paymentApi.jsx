import { baseApi } from "../../api/baseApi";

export const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSessionVerify: builder.mutation({
      query: (sessionId) => ({
        url: `/payments/verify/${sessionId}`,
        method: "POST",
      }),
      invalidatesTags: ["payment"],
    }),

    // getAllBooking: builder.query({
    //   query: (args) => {
    //     const queryString = new URLSearchParams(
    //       args?.reduce((acc, { name, value }) => {
    //         if (value !== undefined && value !== null) {
    //           acc[name] = value;
    //         }
    //         return acc;
    //       }, {})
    //     ).toString();
    //     return {
    //       url: `/booking?${queryString}`,
    //       method: "GET",
    //     };
    //   },
    // }),
  }),
});

export const { useAddSessionVerifyMutation } = PaymentApi;
