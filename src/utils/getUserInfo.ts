import {getFromLocalStorage} from "@/utils/local-storage";
import {decodedToken} from "@/utils/decodedToken";

export const getUserInfo = () => {
    const authToken = getFromLocalStorage('token');
    if (authToken) {
        return decodedToken(authToken);
    } else {
        return "";
    }
};
