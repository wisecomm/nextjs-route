export interface ApiResponse {
  data: any[] | null;
  status: number;
  error: string;
}
interface LoginData {
  corp_code: string;
  key: string;
  login_ip: string;
  login_time_current: string;
  man_corp_code: string;
  need_change_pwd: string;
  roleid: string;
}
