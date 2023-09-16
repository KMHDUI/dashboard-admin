export interface User {
  id: string;
  email: string;
  fullname: string;
  nickname: string;
  phone: string;
  status: string;
  updated_at: string;
  created_at: string;
  is_verified: boolean;
  college: string;
  batch?: number;
  bod?: string;
  haloBelanjaUrl?: string;
  major?: string;
  sn?: string;
  snUrl?: string;
}
