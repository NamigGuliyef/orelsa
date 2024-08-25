import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  description: string
  @Prop({ required: true })
  price: string
  @Prop()
  discount: string
  @Prop()
  discount_price: string
  @Prop({ required: true })
  model_no: string
  @Prop({ required: true })
  category: string
  @Prop({ required: true, default: false })
  new: boolean
  @Prop({ required: true })
  photos: [string]
}