import { SessionNotFoundException } from '@exceptions/session_not_found';

export class SessionGuardService {
  constructor() {}

  // セッションが付属しているかを検証するメソッド
  async validateSession(user_cuid: string) {
    // user_cuidが存在していれば(nullでなければ)trueを返却
    if (user_cuid) {
      return true;
    } else {
      throw new SessionNotFoundException();
    }
  }
}
