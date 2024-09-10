import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomBytes, scryptSync } from "crypto";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getPasswordCrypto(userName: string, password: string) {
    const salt = randomBytes(8).toString("hex");
    const hash = (await scryptSync(password, salt, 32)) as Buffer;
    const saltAndHash = `${salt}.${hash.toString("hex")}`;

    const user = {
      userName,
      password: saltAndHash,
    };

    return user;
  }

  async validateUser(
    userName: string,
    password: string,
    passwordCrypto: string,
  ) {
    const [salt, storedHash] = passwordCrypto.split(".");

    const hash = (await scryptSync(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString("hex")) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { sub: userName };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
