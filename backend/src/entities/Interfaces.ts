export interface ILogin {
  username: string;
  password: string;
}

export interface IObjectHTTP {
  status: number;
  message: string;
  json?: any;
}

export interface JSONBalance {
  [key: string]: any
}

export interface ITransaction {
  creditedAccountUser: string;
  value: number;
}