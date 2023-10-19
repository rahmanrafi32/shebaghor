import {baseApi} from "@/redux/api/baseApi";
import serviceReducer from './features/service/serviceSlice'

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    service: serviceReducer
}
