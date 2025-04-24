import { ValidateSession } from "@application/user/uses-cases/validate-session";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private sessionsUser: ValidateSession) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string) {
    return await this.sessionsUser.execute({
      email,
      password,
    });
  }
}
