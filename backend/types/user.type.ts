export type UserType = {
  UserName: string;
  UserEmail: string;
  UserPicture: string;
};

export enum UserRoles {
  basic,
  admin,
}

export type UserStatsType = {
  HardLevels: number;
  MediumLevels: number;
  EasyLevels: number;
  SpeedWriting: number;
  Mistakes: number;
};
