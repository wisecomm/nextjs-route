type PostgrestError = {
  message: string;
  code: string;
};

export interface ApiResponse<T> {
  data: T | null;
  status: number;
  error: PostgrestError | null;
}

export interface LoginData {
  corp_code: string;
  key: string;
  login_ip: string;
  login_time_current: string;
  man_corp_code: string;
  need_change_pwd: string;
  roleid: string;
}
