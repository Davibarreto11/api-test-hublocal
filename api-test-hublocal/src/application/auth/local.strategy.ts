import { ValidateSessionCase } from "@application/auth/use-cases/validate-session";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private sessionsUser: ValidateSessionCase) {
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
