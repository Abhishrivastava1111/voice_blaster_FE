const ValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
}
const ValidMobileNumber = (mobile_no) => {
    return /^(0|91)?[6-9][0-9]{9}$/.test(mobile_no);

}


export {ValidEmail,ValidMobileNumber}