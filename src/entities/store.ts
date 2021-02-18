import { ObjectId } from "mongodb";
import { ObjectType, Field } from "type-graphql";
import { prop, index } from "@typegoose/typegoose";
import { ID } from "type-graphql";
import { Location } from "./location";
import 'reflect-metadata';

@ObjectType()
@index({ location: '2dsphere' })
export class Store {
    @Field(type => ID)
    readonly _id!: ObjectId;

    @Field({ nullable: true })
    @prop()
    city: string;

    @Field({ nullable: true })
    @prop()
    postalCode: string;

    @prop()
    @Field({ nullable: true })
    street: string;

    @prop()
    @Field({ nullable: true })
    street2: string;

    @prop()
    @Field({ nullable: true })
    street3: string;

    @prop()
    @Field({ nullable: true })
    addressName: string;

    @prop()
    @Field()
    uuid: string;

    @prop({ type: Location, dim: 1 })
    @Field()
    location?: Location;

    @prop()
    @Field({ nullable: true })
    complexNumber: string;

    @prop()
    @Field()
    showWarningMessage: boolean;

    @prop()
    @Field({ nullable: true })
    todayOpen: string;

    @prop()
    @Field({ nullable: true })
    locationType: string;

    @prop()
    @Field({ nullable: true })
    collectionPoint?: boolean;

    @prop()
    @Field({ nullable: true })
    sapStoreID: string;

    @prop()
    @Field({ nullable: true })
    todayClose: string;
}
