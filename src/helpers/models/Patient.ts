export type Sex = 'Male' | 'Female' | 'Other';

export type ProfileStatus =
  | 'Registered'
  | 'Approval'
  | 'FinishFirstTime'
  | 'Done';

export type ProfileModel = {
  id: 0;
  full_name: string;
  personal_id: string;
  email: string;
  phone: string;
  password: string;
  q_r_code: string;
  profile_url: string;
  sex: Sex;
  birthday: string;
  address: string;
  created_date: string;
  approval_date: string;
  valid: boolean;
  remind_first_vaccinate_date_time: string;
  first_vaccinate_date_time: string;
  first_vaccinate_description: string;
  remind_second_vaccinate_date_time: string;
  second_vaccinate_date_time: string;
  second_vaccinate_description: string;
  status: ProfileStatus;
};
