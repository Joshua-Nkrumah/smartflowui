import TokenModel from './Token.model';
import UserModel from './User.model';

export default class LoginResponseModel {
  public user!: UserModel;
  public token!: TokenModel;
}
