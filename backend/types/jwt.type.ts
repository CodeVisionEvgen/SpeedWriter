export type JwtType = {
  accessToken: string;
  refreshToken: string;
};

export type JwtRefreshPayloadType = {
  _id: string;
  iat: number;
  exp: number;
};
