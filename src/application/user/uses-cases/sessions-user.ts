import { Injectable } from "@nestjs/common";
import type { User } from "../entities/user";
import { JwtService } from "@nestjs/jwt";

export interface userPayload {
  sub: string;
  name: string;
  createdAt: string;
}

interface SessionUserRequest {
  user: User;
}

@Injectable()
export class SessionsUser {
  constructor(private jwtService: JwtService) {}

  async execute({ user }: SessionUserRequest) {
    const payload: userPayload = {
      sub: user.id!,
      name: user.name,
      createdAt: user.createdAt.toJSON(),
    };

    const jwt = this.jwtService.sign(payload);

    return jwt;
  }
}
