//isloggedin
export const isloggedin = () => {
    let data = localStorage.getItem("ewgcsCrm");


    if (data !== null) {
        return true;
    } else {
        return false;
    }
}

//dologin=>set localstorage
export const dologin = (data, next) => {
    localStorage.setItem("ewgcsCrm", JSON.stringify(data));
    next();
}

//dologout => remove from localstorage
export const dologout = (next) => {
    localStorage.removeItem("ewgcsCrm");
    //localStorage.removeItem("clockin");
    next()
}

//get token
export const getToken = () => {

    if (isloggedin()) {
        return JSON.parse(localStorage.getItem("ewgcsCrm")).token
    } else {
        return null;
    }
}