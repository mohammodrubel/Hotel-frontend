import { jwtDecode } from "jwt-decode";

const convertMyToken = (token)=>{
    const decoded = jwtDecode(token);
    return decoded
}


export default convertMyToken