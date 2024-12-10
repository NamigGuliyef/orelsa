import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { adminDto } from '../admin/dto/admin.dto';
import { Admin } from '../admin/model/admin.schema';
import { MessageResponse, tokenMessageResponse } from '../utils/messagetype';
import { jwtSecret } from './jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel('admin') private readonly adminModel: Model<Admin>) { }

  async SignUp(AdminDto: adminDto): Promise<MessageResponse> {
    const hashPass = await hash(AdminDto.password, await genSalt(10))
    await this.adminModel.create({ ...AdminDto, password: hashPass })
    return { message: "Admin yaradıldı." }
  }


  async SingIn(AdminDto: adminDto): Promise<tokenMessageResponse> {
    const adminExist = await this.adminModel.findOne({ username: AdminDto.username })
    if (!adminExist) throw new HttpException('Username yanlış daxil edildi ❌.', HttpStatus.NOT_FOUND)
    const rightPass = await compare(AdminDto.password, adminExist.password)
    if (!rightPass) throw new HttpException('Şifrə yanlışdır ❌.', HttpStatus.UNAUTHORIZED)
    const token = sign({ username: adminExist.username, role: adminExist.role }, jwtSecret, { expiresIn: '1h' })
    return { token, message: 'Giriş uğurlu oldu. Admin panelə daxil olursunuz ✅' }
  }

}
