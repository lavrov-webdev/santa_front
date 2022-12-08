export type ResType<T> = {
  error: null | string;
  data: T;
};
export type TUser = {
  id: number;
  name: string;
};
export type CreateRoomRes = ResType<{
  room_id: string;
  room_root_password: string;
}>;
export type CreateRoomPostData = {
  users: {
    name: string;
  }[];
};
export type GetRoomInfoRes = ResType<{
  users_to_login: TUser[];
  cost?: number;
}>;
export type LoginRoomRes = ResType<{
  users_to_select: TUser[];
}>;
export type LoginRoomReq = {
  room_id: string;
  user_id: number;
};
export type SelectUserReq = {
  room_id: string;
  choosing_user_id: number;
  selected_user_id: number;
};
