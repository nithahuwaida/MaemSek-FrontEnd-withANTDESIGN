export const getJwt=()=>{
    return localStorage.getItem("token-jwt");
};

export const getUserId=()=>{
    return localStorage.getItem("user-id");
};

export const getUserEmail=()=>{
    return localStorage.getItem("user-email");
};