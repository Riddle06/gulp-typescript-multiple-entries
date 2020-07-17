import {
  RequestOtpParams,
  RegisterMemberAndLineParams,
  GetLineTokenAndLoginResult,
} from './login.interface';
import { sendRequest } from '../post/post.func';

export async function requestOtp(params: RequestOtpParams): Promise<boolean> {
  var res = await sendRequest('igas/consumerapp/requestotp', {
    uuid: '',
    d: {
      account: params.phone,
      type: params.type,
    },
  });
  if (res.c == '200') {
    return true;
  } else {
    alert(res.m);
    return false;
  }
}

/**
 * 取得LineToken並登入
 * @param lineUuid
 */
export async function getLineTokenAndLogin(
  lineUuid: string
): Promise<GetLineTokenAndLoginResult | null> {
  const res = await sendRequest('igas/consumerapp/getLineTokenAndLogin', {
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
  } else {
    alert(res.m);
  }
  return null;
}

/** 註冊會員並新增LineToken */
export async function registerMemberAndLineToken(
  params: RegisterMemberAndLineParams
): Promise<void> {
  var res = await sendRequest('igas/consumerapp/registertMemberAndLineToken', {
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
  } else {
    alert(res.m);
  }
}
