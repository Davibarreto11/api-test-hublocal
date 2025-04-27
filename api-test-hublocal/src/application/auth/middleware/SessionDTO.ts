import { SessionUserBody } from "@infra/http/dtos/session-user-body";
import {
  BadRequestException,
  Injectable,
  type NestMiddleware,
} from "@nestjs/common";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";

@Injectable()
export class SessionDTOMiddleware implements NestMiddleware {
  async use(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body ?? {};

    const authInBody = new SessionUserBody();
    authInBody.email = email;
    authInBody.password = password;
    console.log(authInBody);
    const validations = await validate(authInBody);

    if (validations.length) {
      throw new BadRequestException(validations);
    }

    next();
  }
}
