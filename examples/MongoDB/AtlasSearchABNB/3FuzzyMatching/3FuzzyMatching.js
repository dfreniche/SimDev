var mongoClient = null;
var collection;

// ℹ️ search in all fields, but now you can make up to two typos
// try with: "niu york", "bouston", etc.

async function get_AtlasSearch(req, res) {
  var rval = {};

  var queryTerm = req.query.get("queryTerm");
  var path = { wildcard: "*" };

  searchOperation = {
    $search: {
      text: {
        query: queryTerm,
        path: path,
        fuzzy: {
          maxEdits: 2, //Allow for some changes
        },
      },
    },
  };

  searchResultsCursor = collection.aggregate([searchOperation]);
  rval.searchResult = await searchResultsCursor.toArray();
  res.status(201);
  res.send(rval);
}

// Connect to MongoDB Atlas
async function initWebService() {
  var userName = await system.getenv("MONGO_USERNAME");
  var passWord = await system.getenv("MONGO_PASSWORD", true);

  mongoClient = new MongoClient(
    "mongodb+srv://" + userName + ":" + passWord + "@learn.mongodb.net",
  );
  collection = mongoClient
    .getDatabase("sample_airbnb")
    .getCollection("listingsAndReviews");
}
