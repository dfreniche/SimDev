var mongoClient = null;
var viewCollection;

async function get_View(req, res) {
  var data = await viewCollection.find({ propertyId: "ABC123" }).toArray();
  res.status(202);
  res.send(data);
}

// Every time this is called - add the ip of the caller to a list and
// increment the number of view by one.

async function post_View(req, res) {
  var sourceIp = req.sourceIp;

  query = { propertyId: "ABC123" };

  updateOps = {};
  updateOps["$set"] = { lastView: new Date() };
  updateOps["$inc"] = { nViews: 1 };
  updateOps["$push"] = { viewIp: sourceIp };

  var rval = await viewCollection.updateOne(query, updateOps);

  res.status(202);
  res.send(rval);
}

async function initWebService() {
  var userName = await system.getenv("MONGO_USERNAME");
  var passWord = await system.getenv("MONGO_PASSWORD", true);
  mongoClient = new MongoClient(
    "mongodb+srv://" + userName + ":" + passWord + "@learn.mongodb.net",
  );
  viewCollection = mongoClient
    .getDatabase("example")
    .getCollection("advertViews");
  // Set up empty collection with one document
  await viewCollection.drop();
  const property = { propertyId: "ABC123", nViews: 0, viewIp: [] };
  await viewCollection.insertOne(property);
}
