import { atom } from "recoil";

export const userDataRecoil = atom({
    key: "userDataRecoil",
    default: {
        userId: "",
        userName: "",
        userEmail: "",
        userCompany: "",
        userRole: "",
        userCode: "",
        userToken: ""
    }
});
export const userRole = atom({
    key: "userRole",
    default: {
        userRole: ""
    }
});