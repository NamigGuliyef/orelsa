import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema({ versionKey: false, timestamps: true })
export class Contact {
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  email: string
  @Prop({ required: true })
  subject: string
  @Prop({ required: true })
  message: string 
}

export const contactModel = SchemaFactory.createForClass(Contact)
