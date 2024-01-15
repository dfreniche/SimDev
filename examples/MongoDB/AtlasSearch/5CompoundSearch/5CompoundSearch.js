
var mongoClient = null;
var collection

// Connect to MongoDB Atlas
async function initWebService() {
  var userName = system.getenv("MONGO_USERNAME")
  var passWord = system.getenv("MONGO_PASSWORD")

  mongoClient = new MongoClient("mongodb+srv://" + userName + ":" + passWord + "@learn.mongodb.net");
  collection = mongoClient.getDatabase("search").getCollection("claims")
}

// we can compound operators in a single search
async function get_AtlasSearch(req, res) {
  var rval = {}
  
  var queryTerm = req.query.get("queryTerm")

  rval.searchIndexes = await collection.listSearchIndexes()

  searchOperation = [ 
    { $search : { 
      "index": "default",
      "compound": {
        "must": [
          {
            "text": {
              "query": queryTerm,
              "path": "claim_description"
            }
          }
        ],
        "should": [
          {
            "range": {
              "path": "claim_amount",
              "gt": 1000,
              "lt": 5000
            }
          }
        ]
      }
    } 
    } 
  ]
  searchResultsCursor = collection.aggregate(searchOperation)

  rval.searchResult = await searchResultsCursor.toArray()


  res.status(201);
  res.send(rval)
}