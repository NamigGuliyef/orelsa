import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'

@Schema({ versionKey: false, timestamps: true })
export class Home {
  _id: string
  @Prop()
  title: string
  @Prop()
  description: string
  @Prop()
  newproductPhoto: string
  @Prop()
  browseRangePhotos: [string]
}

export const homeModel = SchemaFactory.createForClass(Home)
