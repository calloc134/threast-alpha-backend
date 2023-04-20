import { SessionNotFoundException } from '@exceptions/session_not_found';

export class SessionGuardService {
  constructor() {}

  async validateSession(user_cuid: string) {
    if (user_cuid) {
      return true;
    } else {
      throw new SessionNotFoundException();
    }
  }
}
