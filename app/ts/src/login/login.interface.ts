export enum RequestOtpType {
    /**
     * 1.登入
     */
    SignIn = "1", //登入 
    /**
     * 2.註冊
     */
    SignUp = "2" //註冊
}

export interface RequestOtpParams {
    phone: number;
    /**
     * SignIn:登入 SignUp:註冊
     */
    type: RequestOtpType;
}

export interface GetLineTokenAndLoginResult {
    uuid: string;
    type: string;
    blacklist: string;
    addressStatus: string;
    checkOutType: string;
    city: string;
    area: string;
    storefront: string;
    address: string;
    userName: string;
}

export interface RegisterMemberAndLineParams {
    lineUuid: string;
    account: string;
    name: string;
    email: string;
    otpCode: string;
}