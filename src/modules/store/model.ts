import { getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import { Store } from "../../entities/store";

export const StoreMongooseModel = getModelForClass(Store);

export default class StoreModel {
  async getById(_id: ObjectId): Promise<Store | null> {
    return StoreMongooseModel.findById(_id).lean().exec();
  }

  async getNearestLocations(latitude: number, longitude: number): Promise<Store[] | null> {
    return StoreMongooseModel.find(
        { location :
              { $near :
                    {
                      $geometry : {
                        type : "Point" ,
                        coordinates : [latitude, longitude] },
                      $maxDistance : 10000000
                    }
              }
        }
    ).limit(5).exec();
  }
}
