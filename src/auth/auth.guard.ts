import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { jwtSecret } from './jsonwebtoken';
import { verify } from 'jsonwebtoken';
import { Admin } from 'src/admin/model/admin.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // const apiKey = request.headers['api-key'];
    // if (!apiKey || apiKey !== jwtSecret) {
    //   throw new HttpException("Girişə yetkiniz yoxdur.",HttpStatus.UNAUTHORIZED)
    // }
    const token=request.headers.authorization?.split(' ')[1]
    
    if(!token){
      throw new HttpException('Token tapılmadı.',HttpStatus.NOT_FOUND)
    }
    verify(token,jwtSecret,(err:any, admin:Admin)=>{
      if(err){
        throw new HttpException('Token yanlışdır.',HttpStatus.UNAUTHORIZED)
      }else if(admin.role!=='admin'){
        throw new HttpException('Sizin qeyd olunan səhifəyə daxil olmaq üçün səlahiyyətiniz yoxdur!',HttpStatus.FORBIDDEN)
      }
    })
    return true;
  }


}
  