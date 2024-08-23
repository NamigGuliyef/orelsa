import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'

@Schema({ versionKey: false, timestamps: true })
export class Home {
  @Prop()
  title: string
  @Prop()
  description: string
  @Prop()
  photo: string
}

export const homeModel = SchemaFactory.createForClass(Home)
