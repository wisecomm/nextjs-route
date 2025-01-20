export interface LoginReturn {
  code: string;
  data: LoginData;
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
