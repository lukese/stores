import { Service } from "typedi";
import { ObjectId } from "mongodb";

import StoreModel from "./model";
import { Store } from "../../entities/store";

@Service()
export default class StoreService {
  constructor(private readonly storeModel: StoreModel) {}

  public async getById(_id: ObjectId): Promise<Store | null> {
    const store = await this.storeModel.getById(_id);

    return store;
  }

  public async getNearestLocations(latitude: number, longitude: number): Promise<Store[] | null> {
    return await this.storeModel.getNearestLocations(latitude, longitude);
  }
}
