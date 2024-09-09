import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { Admin } from "../admin/model/admin.schema";
import { jwtSecret } from "../auth/jsonwebtoken";

export class adminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new HttpException('No auth token', HttpStatus.NOT_FOUND)
    }
    verify(token, jwtSecret, (err: any, admin: Admin) => {
      if (err) {
        throw new HttpException('Invalid auth token', HttpStatus.FORBIDDEN)
      } else if (admin.role !== 'admin') {
        throw new HttpException('Sən admin deyilsən!', HttpStatus.FORBIDDEN)
      } else {
        req.admin = admin
        next()
      }
    })

  }
}
