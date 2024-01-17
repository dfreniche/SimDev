var mongoClient = null;
var listingsCollection


// Can you modify this to find the cheapest House in Canada with a pool?
// What suburb is it in

async function get_Query(req, res) {
  
    var query = {}
    var projection  = {}

    projection.summary = true;
    projection.beds = true;   
    projection.property_type=true;
    projection['address.market'] = true
    projection.price = true;
 
    query.beds = gt(5)
    query['address.country'] = "Turkey"

    //Highest first
    var sortOrder = { price : -1 }

    var cursor = listingsCollection.find(query, projection).limit(10).sort(sortOrder)
    var claims = await cursor.toArray();
    res.status(200)
    res.send(claims)
}

async function initWebService() {
    var userName = system.getenv("MONGO_USERNAME")
    var passWord = system.getenv("MONGO_PASSWORD")
    mongoClient = new MongoClient("mongodb+srv://" + userName  + ":" + passWord + "@learn.mongodb.net");
    listingsCollection = mongoClient
            .getDatabase("sample_airbnb")
            .getCollection("listingsAndReviews")
  }
    