export type DeadlineItemObj = {
  tieu_de?: string;
  noi_dung?: string;
  ngay_bat_dau?: string;
  ngay_ket_thuc?: string;
  file?: FileList | null | string;
  ma_gv?: string;
};

export type Report = {
  loai_bao_cao?: string;
  noi_dung?: string;
  ngay_bat_dau?: string;
  ngay_ket_thuc?: string;
  file?: File | FileList | null | string;
};

export type Teacher = {
  fullname?: string;
  email?: string;
  phonenumber?: string;
};

export type Topic = {
  _id?: string;
  topic_name?: string;
  topic_description?: string;
  ma_gv?: Teacher;
  trang_thai?: string;
  score?: string;
};

export type Notification = {
  _id?: string;
  tieu_de?: string;
  noi_dung?: string;
  file?: FileList | null | string;
  createdAt?: string;
};

export type RegisteredTopic = {
  _id?: string;
  active?: boolean;
  ma_sv?: {
    _id: string;
    fullname: string;
    email: string;
  };
  id_topic?: string;
  topic_name?: string;
  ma_gv?: string;
  id_deadlines?: string[];
  deadlines_done?: string[];
  reports?: [];
  reports_done?: [];
  submit_reports?: [];
  submit_deadlines?: [];
  change_topic?: string;
  id_new_topic?: {
    _id?: string;
    topic_name?: string;
  };
  score?: string;
};

export type SubmitReport = {
  _id?: string;
  loai_bao_cao?: string;
  ma_sv?: string;
  id_report?: string;
  noi_dung?: string;
  ngay_bat_dau?: string;
  ngay_ket_thuc?: string;
  file?: FileList | null | string;
};

export type SubmitDeadline = {
  _id?: string;
  loai_bao_cao?: string;
  ma_sv?: string;
  id_deadline?: string;
  noi_dung?: string;
  ngay_bat_dau?: string;
  ngay_ket_thuc?: string;
  file?: FileList | null | string;
};
