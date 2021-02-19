## Find the nearest stores

This is a NodeJS graphQL based API which allows you to find the nearest store based on some coordinates


### How to setup
1. Run `git clone` on the repository
2. Copy the `.env.example` file to `.env`
3. Connect to MongoDB locally
4. Ensure there is a stores collection in MongoDB in your database
5. Import the JSON file into the collection
6. Run `npm install`
7. Run `npm run start`
8. You can now visit `http://localhost:5000/graphql` to play with the API in playground

###### You may have to manually create the index on the collection

1. Open a terminal
2. Run `mongo`
3. Execute the following command: `db.stores.createIndex({location: "2dsphere"})`

_Note_ - Ensure the updated stores json is used, as the coordinates have been transformed to a GeoPoint for MongoDB

### Example Query

Find the nearest Locations:

```
query {
  getNearestLocations (latitude: 51.5073219, longitude: -0.1276474) {
    _id
    postalCode
    street
    street2
    street3
    addressName
    uuid
    complexNumber
    showWarningMessage
    todayOpen
    locationType
    collectionPoint
    sapStoreID
    todayClose
    location {
      coordinates
    }
  }
}
```

### Things to improve (with more time)

* adding a script to transform the source json into a json with location data as "location" : { "type" : "Point", "coordinates" : [ 51.874272, 6.245829 ] },
* adding a migration that pre-populates the collection and creates the index
* dockerizing the setup for a one-command start
