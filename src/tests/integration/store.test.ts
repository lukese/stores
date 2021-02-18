import { createTestClient } from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server-express";
import { buildSchema } from "../../utils";
// @ts-ignore
import mongoose from "mongoose";

import { StoreMongooseModel } from "../../modules/store/model";

import {
    connect,
    clearDatabase,
    closeDatabase,
    populateDatabase,
} from "../utils";

beforeAll(async () => connect());

beforeEach(async () => {
    await populateDatabase(StoreMongooseModel, []);
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async (done) => {
    await closeDatabase();
    done();
});

describe("Store", () => {
	it(`should get a store`, async () => {
      const storeId = new mongoose.Types.ObjectId().toHexString().toString();

      await populateDatabase(StoreMongooseModel, [
          {
              _id: storeId,
              street: 'Test',
              longitude: 42.3223,
              latitude: 42.23234,
          },
      ]);

      const graphQLSchema = await buildSchema();

      const server = new ApolloServer({
          schema: graphQLSchema,
      }) as any;

      const { query } = createTestClient(server);

      const variables = {
          id: storeId,
      };

		const GET_STORE = gql`
        query getStore($id: ObjectId!) {
            getStore(id: $id) {
                _id
                longitude
                latitude
            }
        }
    `;

      const res = await query({
          query: GET_STORE,
          variables,
      });

      // @ts-ignore
        expect(res).toMatchSnapshot({
          'data': {
              'getStore': {
                  _id: expect.any(String),
              }
          }
      });
	});
});
