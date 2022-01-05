const { Database } = require('mongo');
const {MongoClient} = require('mongodb');


async function main(){

const uri = "mongodb+srv://demo:demo123@cluster0.yb3ss.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client =new MongoClient(uri);

await client.connect();

try{
await client.connect();

await createListing(client,{
    name: "lovely loft",
    summary: "love in paris",
    bedrooms: 1,
    bathrooms: 1
});
}
catch(e){
console.error(e);
}
finally{
   await client.close();
}
}
main().catch(console.error);

async function createListing(client , newListing){
 const result =  await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing)
 console.log(`id:${result.insertedId}`);
}

async function listDatabases(client){
  const dataBasesList = await client.db().admin().listDatabases();

  console.log('Database');
  dataBasesList.databases.forEach(db => {
      console.log(`-${db.name}`);
      
  });
}