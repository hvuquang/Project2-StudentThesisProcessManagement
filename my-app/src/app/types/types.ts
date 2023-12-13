export type DeadlineItemObj = {
  tieu_de: string;
  noi_dung: string;
  ngay_bat_dau: string;
  ngay_ket_thuc: string;
  file?: string;
  ma_gv: string;
};

export type Teacher = {
  fullname?: string;
  email?: string;
  phonenumber?: string;
};

export type Topic = {
  _id?: string;
  topic_name: string;
  topic_description: string;
  ma_gv?: Teacher;
  trang_thai?: string;
};
