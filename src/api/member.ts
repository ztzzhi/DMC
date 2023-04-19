import { REQUEST_TAG } from "@/config"
import { postRequest } from "@/utils/request"

// 会员列表
export const getMemberlist = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/getUserList/user`, data)

// 会员新增
export const addMemberlist = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/setUsers/user`, data)

// 会员详情
export const detailMemberlist = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/getIdToUserInfo`, data)

// 交易记录
export const getTransactions = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/UserWalletLogList`, data)

//充值
export const recharge = (data: any): Promise<any> =>
  postRequest(`/api/${REQUEST_TAG}/user/UserToUp`, data)
