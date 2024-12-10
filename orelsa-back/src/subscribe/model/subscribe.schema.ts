import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class Subscribe {
  @Prop({ required: true })
  email: string
}

export const subscribeModel = SchemaFactory.createForClass(Subscribe)
