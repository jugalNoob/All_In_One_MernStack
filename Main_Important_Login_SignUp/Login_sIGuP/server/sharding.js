+------------------------+
|  MongoDB Application   |
+------------------------+
            |
         +------+
         |mongos| (query router)
         +------+
        /   |   \
+----------+ +----------+ +----------+
| Shard 1  | | Shard 2  | | Shard 3  |
| (Replica)| | (Replica)| | (Replica)|
+----------+ +----------+ +----------+
