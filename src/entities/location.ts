import { ObjectType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import 'reflect-metadata';

@ObjectType()
export class Location {
    @Field()
    @prop()
    readonly type: String;

    @Field(type => [Number])
    @prop({ required: true })
    coordinates: [Number];
}
