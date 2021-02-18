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
              location: {
                  type: 'Point',
                  coordinates: [
                      42.23234,
                      42.3223
                  ]
              }
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
                location {
                    coordinates
                }
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

	it('Should return nearest 5 locations', async () => {
        await populateDatabase(StoreMongooseModel, [
            {
                _id: new mongoose.Types.ObjectId().toHexString().toString(),
                location: {
                    type: 'Point',
                    coordinates: [
                        52.362393,
                        4.865615
                    ]
                }
            },
            {
                _id: new mongoose.Types.ObjectId().toHexString().toString(),
                location: {
                    type: 'Point',
                    coordinates: [
                        52.321911,
                        4.825133
                    ]
                }
            },
            {
                _id: new mongoose.Types.ObjectId().toHexString().toString(),
                location: {
                    type: 'Point',
                    coordinates: [
                        52.341632,
                        4.959806
                    ]
                }
            },
            {
                _id: new mongoose.Types.ObjectId().toHexString().toString(),
                location: {
                    type: 'Point',
                    coordinates: [
                        52.296722,
                        4.870180
                    ]
                }
            },
            {
                _id: new mongoose.Types.ObjectId().toHexString().toString(),
                location: {
                    type: 'Point',
                    coordinates: [
                        52.217704,
                        4.796438
                    ]
                }
            },
            {
                _id: new mongoose.Types.ObjectId().toHexString().toString(),
                location: {
                    type: 'Point',
                    coordinates: [
                        51.179343,
                        5.231840
                    ]
                }
            },
            {
                _id: new mongoose.Types.ObjectId().toHexString().toString(),
                location: {
                    type: 'Point',
                    coordinates: [
                        51.638476,
                        5.209852
                    ]
                }
            },
        ]);

        const graphQLSchema = await buildSchema();

        const server = new ApolloServer({
            schema: graphQLSchema,
        }) as any;

        const { query } = createTestClient(server);

        const variables = {
            latitude: 52.370216,
            longitude: 4.895168,
        };

        const GET_LOCATIONS = gql`
          query getNearestLocations($latitude: Float, $longitude: Float) {
              getNearestLocations(latitude: $latitude, longitude: $longitude) {
                  _id
                  location {
                      coordinates
                  }
              }
          }
      `;

        const res = await query({
            query: GET_LOCATIONS,
            variables,
        });

        // @ts-ignore
        expect(res).toMatchSnapshot({
            'data': {
                'getNearestLocations': [
                    {
                        _id: expect.any(String),
                        location: {
                            coordinates: [52.362393, 4.865615]
                        }
                    },
                    {
                        _id: expect.any(String),
                        location: {
                            coordinates: [52.321911, 4.825133]
                        }
                    },
                    {
                        _id: expect.any(String),
                        location: {
                            coordinates: [52.341632, 4.959806]
                        }
                    },
                    {
                        _id: expect.any(String),
                        location: {
                            coordinates: [52.296722, 4.870180]
                        }
                    },
                    {
                        _id: expect.any(String),
                        location: {
                            coordinates: [52.217704, 4.796438]
                        }
                    },
                ]
            }
        });
    });
});
