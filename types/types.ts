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

export interface Registration {
  competition_name: string;
  competition_type: string;
  competition_using_submission: boolean;
  created_at: Date;
  is_active: boolean;
  id: string;
  user_college: string;
  user_email: string;
  user_fullname: string;
  payment_status: string;
  submission_status?: string;
  url?: string;
  member: Member[];
}

export interface Member {
  acceptance_status: string;
  user_fullname: string;
  user_email: string;
  created_at: Date;
  is_active: boolean;
}
