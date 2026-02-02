export interface TokenInterface {
  access_token: string;
  refresh_token: string;
  role: string;
}

export interface RefreshTokenInterface extends TokenInterface {}
