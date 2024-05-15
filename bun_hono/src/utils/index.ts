import mongodb from "../config/MongoDbClient";
import sql from "../config/PostgresClient";

async function transferData() {
  try {
    const db = await mongodb;
    console.log("Connected to MongoDB");

    const documents = await db.collection("securities").find({}).toArray();
    console.log("Documents fetched from MongoDB:", documents.length);

    for (const doc of documents) {
      console.log(
        "Adding doc:",
        `${doc.symbol}, ${doc.name}, ${doc.exchange}, ${doc.assetType}, ${doc.ipoDate}, ${doc.delistingDate}, ${doc.status}, ${doc.country}, ${doc.sector}, ${doc.industry}`
      );

      const insertQuery = sql`
        INSERT INTO securities
        (symbol, name, exchange, asset_type, ipo_date, delisting_date, status, country, sector, industry)
        VALUES 
        (${doc.symbol}, ${doc.name || doc.symbol}, ${doc.exchange}, ${
        doc.assetType
      }, ${doc.ipoDate}, ${doc.delistingDate}, ${doc.status}, ${doc.country}, ${
        doc.sector
      }, ${doc.industry}
        ) ON CONFLICT (symbol) DO NOTHING
      `;

      // Execute the query
      await insertQuery;
    }

    console.log("Data transferred successfully");
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

export default transferData;
