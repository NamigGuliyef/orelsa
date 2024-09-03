import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Admin {
  @Prop()
  username: string
  @Prop()
  password: string
  @Prop({ default: 'admin' })
  role: string
}

export const adminModel = SchemaFactory.createForClass(Admin)
