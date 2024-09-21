import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class HomeNewCollection {
  _id: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  newproductPhoto: string;
  @Prop({ default: false })
  active: boolean;
}

export const homeNewCollectionModel =
  SchemaFactory.createForClass(HomeNewCollection);

@Schema({ versionKey: false, timestamps: true })
export class HomeBrowseRange {
  _id: string;
  @Prop()
  description: string;
  @Prop()
  browseRangePhoto: string;
}

export const HomeBrowseRangeModel =
  SchemaFactory.createForClass(HomeBrowseRange);
