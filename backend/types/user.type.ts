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
  hard: number;
  medium: number;
  easy: number;
  SpeedWriting: number;
  Mistakes: number;
};
