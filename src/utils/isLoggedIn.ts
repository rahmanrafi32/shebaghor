import {getFromLocalStorage} from "@/utils/local-storage";

const isLoggedIn = () => {
    const authToken = getFromLocalStorage('token')
    return !!authToken
}

export default isLoggedIn;
