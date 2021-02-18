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
}
