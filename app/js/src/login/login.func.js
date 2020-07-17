var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { post } from '../post/post.func.js';
export function requestOtp(params) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = yield post.sendRequest('igas/consumerapp/requestotp', {
            uuid: '',
            d: {
                account: params.phone,
                type: params.type,
            },
        });
        if (res.c == '200') {
            return true;
        }
        else {
            alert(res.m);
            return false;
        }
    });
}
/**
 * 取得LineToken並登入
 * @param lineUuid
 */
export function getLineTokenAndLogin(lineUuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield post.sendRequest('igas/consumerapp/getLineTokenAndLogin', {
            d: {},
            uuid: '',
            line_uuid: lineUuid,
        });
        if (res.c == '200') {
            return {
                uuid: res.d.uuid,
                type: res.d.type,
                blacklist: res.d.blacklist,
                addressStatus: res.d.addressStatus,
                checkOutType: res.d.checkOutType,
                city: res.d.city,
                area: res.d.area,
                storefront: res.d.storefront,
                address: res.d.address,
                userName: res.d.userName,
            };
        }
        else {
            alert(res.m);
        }
        return null;
    });
}
/** 註冊會員並新增LineToken */
export function registerMemberAndLineToken(params) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = yield post.sendRequest('igas/consumerapp/registertMemberAndLineToken', {
            uuid: '',
            d: {
                line_uuid: params.lineUuid,
                account: params.account,
                name: params.name,
                email: params.email,
                otp_code: params.otpCode,
                device_id: 'line_' + params.lineUuid,
                device_type: '6',
            },
        });
        if (res.c == '200') {
            //導頁
        }
        else {
            alert(res.m);
        }
    });
}
