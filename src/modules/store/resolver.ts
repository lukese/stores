import { Resolver, Arg, Query } from "type-graphql";
import { Service } from "typedi";
import { ObjectId } from "mongodb";

import { Store } from "../../entities/store";
import StoreService from "./service";

@Service()
@Resolver((of) => Store)
export default class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Query((returns) => Store)
  async getStore(@Arg("id") id: ObjectId) {
    return this.storeService.getById(id);
  }

  @Query((returns) => [Store])
  async getNearestLocations(@Arg("latitude") latitude: number, @Arg("longitude") longitude: number) {
    return await this.storeService.getNearestLocations(latitude, longitude);
  }
}
