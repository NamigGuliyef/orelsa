import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  description: string
  @Prop({ required: true })
  price: number
  @Prop()
  discount: number
  @Prop()
  discount_price: number
  @Prop({ required: true })
  model_no: string
  @Prop({ required: true })
  category: string
  @Prop({ required: true, default: false })
  new: boolean
  @Prop({ required: true })
  photos: [string]
  @Prop({ required: true, default: false })
  active: boolean
}

export const productModel=SchemaFactory.createForClass(Product)