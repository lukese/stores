import { ObjectId } from "mongodb";
import { ObjectType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import { ID, Float } from "type-graphql";
import 'reflect-metadata';

@ObjectType()
export class Store {
    @Field(type => ID)
    readonly _id!: ObjectId;

    @Field()
    city: string;

    @Field()
    postalCode: string;

    @prop()
    @Field()
    street: string;

    @prop()
    @Field()
    street2: string;

    @prop()
    @Field()
    street3: string;

    @prop()
    @Field()
    addressName: string;

    @prop()
    @Field()
    uuid: string;

    @prop()
    @Field(type => Float)
    longitude: number;

    @prop()
    @Field(type => Float)
    latitude: number;

    @prop()
    @Field()
    complexNumber: string;

    @prop()
    @Field()
    showWarningMessage: boolean;

    @prop()
    @Field()
    todayOpen: string;

    @prop()
    @Field()
    locationType: string;

    @prop()
    @Field()
    collectionPoint: boolean;

    @prop()
    @Field()
    sapStoreID: string;

    @prop()
    @Field()
    todayClose: string;
}
