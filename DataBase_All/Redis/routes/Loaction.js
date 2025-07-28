Awesome, Jugal! 🌍 Let’s break down 🕵️ 7. Redis Geospatial Indexing, which is perfect for building location-based services like:

Find nearby stores or users

Track delivery agents

Geofencing alerts

Real-time map dashboards


✅ Core Commands:
Command	Description
GEOADD	Add a location (longitude, latitude, name)
GEORADIUS	Get members within a radius (⛔️ deprecated in Redis 6.2)
GEOSEARCH	✅ Modern way to find locations within radius
GEODIST	Get distance between two points
GEOPOS	Get coordinates of a member
GEORADIUSBYMEMBER	(Deprecated) Radius around a known member



✅ Example: Find Nearby Users or Stores
🧠 Use Case: Find users within 5 km of a given location


const { createClient } = require("redis");
const redisClient = createClient();

(async () => {
  await redisClient.connect();

  const key = "geo:users";

  // 🧍 Add users to geo index
  await redisClient.geoAdd(key, [
    { longitude: 77.5946, latitude: 12.9716, member: "user:jugal" },   // Bangalore
    { longitude: 72.8777, latitude: 19.0760, member: "user:mumbai" },  // Mumbai
    { longitude: 77.1025, latitude: 28.7041, member: "user:delhi" },   // Delhi
  ]);

  console.log("✅ Users added to geo index");

  // 📍 Search within 500 km of Bangalore
  const results = await redisClient.geoSearch(key, {
    longitude: 77.5946,
    latitude: 12.9716,
    radius: 500,
    unit: "km",
    WITHDIST: true,
    SORT: "ASC",
  });

  console.log("📍 Nearby Users:");
  console.log(results);
})();

📌 Output Example:
bash
Copy
Edit
[
  { member: 'user:jugal', distance: 0 },
  { member: 'user:mumbai', distance: 841.12 }
]


📏 GEODIST – Get Distance Between Two Members
js
Copy
Edit
const distance = await redisClient.geoDist("geo:users", "user:jugal", "user:delhi", "km");
console.log(`📏 Distance from Bangalore to Delhi: ${distance} km`);


| Use Case             | Redis Key Format        | Purpose                        |
| -------------------- | ----------------------- | ------------------------------ |
| Nearby drivers       | `geo:drivers`           | Find closest drivers to a user |
| Store locator        | `geo:stores`            | Find stores within 10 km       |
| Event attendees      | `geo:attendees:<event>` | Visualize attendees on a map   |
| Emergency responders | `geo:firefighters`      | Dispatch nearest team          |
