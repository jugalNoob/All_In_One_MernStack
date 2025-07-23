1. What is System Design Process in Software?
The System Design Process in software involves creating a high-level blueprint for how software will function, how different components will interact, and how data will flow through the system. This process includes:

Requirement Gathering: Understanding what the system needs to do.

Component Design: Breaking down the system into manageable
 modules or components (e.g., user interface, backend, database).

Architecture Choice: Deciding on architectural style
 (e.g., Monolithic, Microservices, Event-driven).


Data Flow: Designing how data will be stored, 
processed, and retrieved.

Scalability & Reliability: Ensuring the system can 
scale and handle failures efficiently.

Security: Designing to secure the system against threats 
(authentication, authorization).


Understanding requirements.
Designing components and their interactions.
Choosing between architectural styles (e.g., monolithic, microservices).
Managing data flow, concurrency, and security.
Scaling, maintaining, and monitoring.


Example: Designing a social media platform involves
 creating a user authentication system, content management,
  a real-time notification system, and data storage for posts,
   all while making it scalable.




2. Monolithic Architecture ::::::::::

In a Monolithic Architecture, the entire application is built as a single unit. All the components such as the user interface, business logic, and data access layers are tightly coupled and run in a single process.

Characteristics:

Single codebase for the entire application.

Simple to deploy.

Difficult to scale as the application grows in size.

Any change requires redeploying the whole application.

Example: An e-commerce website built as one large application where
 the product listing, cart, checkout, and payment systems all run
  together in one system.




3. Difference Between Monolithic and Microservices Architecture:
Monolithic: A single unified codebase. All components run
 together as one unit.

Easier to develop and deploy initially.

Difficult to scale and maintain with growth.

Microservices: Breaks down the application into smaller,
 independent services.

Easier to scale and maintain.

Each service can be updated and deployed independently.

Example: In microservices, the e-commerce app could have
 separate services for cart, payments, and product listings,
  allowing them to be updated or scaled separately.



  4. What is Latency in Networking? How to Reduce Latency? CDN vs Caching:
Latency: The time it takes for data to travel from the source to the destination in a network.
Reducing Latency: Use efficient routing protocols, minimize physical distance between servers and users, and implement caching and CDN techniques.
CDN (Content Delivery Network): Distributes content across geographically distributed servers, bringing data closer to the user.
Caching: Temporarily stores data to reduce the need for frequent requests to the main server.
Example: A CDN speeds up video streaming by delivering content from the closest server, reducing latency.


5. What is Throughput? How to Improve Throughput?:
Throughput: The amount of data processed or transferred in a system within a given time.
Improving Throughput: Increase network bandwidth, use better hardware, and optimize software to process data faster.
Example: Increasing throughput on a web server by adding more RAM and improving database query efficiency.
6. What is Consistency in System Design (Strong vs Eventual Consistency):
Consistency: Ensures that all clients see the same data at the same time.
Strong Consistency: Every read receives the most recent write immediately.
Eventual Consistency: Data will eventually be consistent, but not immediately.
Example: A payment system needs strong consistency to ensure all transactions are correct, while a social media feed might work with eventual consistency.
7. What is CAP Theorem?:
CAP Theorem states that in a distributed system, you can only choose two out of the following three:

Consistency: Every read receives the latest write.
Availability: Every request gets a response, whether or not it’s the latest.
Partition Tolerance: The system continues to operate despite network partitions.
Example: A distributed database may sacrifice consistency for availability to ensure it remains operational during network failures.


8. What is Lamport Logical Clock?:
Lamport Logical Clock is an algorithm used to order events in a distributed system. It assigns timestamps to events to ensure a consistent event sequence across multiple systems.

Example: In a distributed file system, Lamport clocks can be used to resolve file changes made by different servers.
9. Difference Between Horizontal and Vertical Scaling:
Horizontal Scaling: Adding more servers or nodes to distribute the load.
Vertical Scaling: Increasing the resources (RAM, CPU) of a single server.
Example: Horizontal scaling for a web service by adding more servers to handle more traffic.
10. Difference Between Redundancy and Replication (Master-Slave Replication):
Redundancy: Duplication of system components for fault tolerance.
Replication: Copying data across multiple servers to ensure availability.
Master-Slave Replication: A master server writes data, and slave servers replicate this data for backups.
Example: A master-slave setup for a database ensures high availability by replicating data from the master to multiple slaves.
11. What is Load Balancer and How It Works? Load Balancing Algorithms:
A load balancer distributes incoming traffic across multiple servers to prevent any single server from becoming overwhelmed.

Load Balancing Algorithms:
Round Robin: Requests are distributed equally across servers.
Least Connections: Requests are sent to the server with the fewest active connections.
IP Hash: The client’s IP address determines which server will handle the request.
Example: A load balancer distributes web requests among multiple servers for an e-commerce site to prevent overloading.
12. What is Caching?:
Caching stores frequently accessed data in a temporary storage (cache) to reduce the time needed to retrieve it in future requests.

Example: A website stores the most frequently accessed images and data in a cache to serve them faster.
13. Cache Eviction Techniques:
LRU (Least Recently Used): Removes the least recently accessed data.
LFU (Least Frequently Used): Removes the least frequently accessed data.
MRU (Most Recently Used): Removes the most recently accessed data.
FIFO (First In, First Out): Removes the oldest data.
LIFO (Last In, First Out): Removes the most recently added data.
RR (Random Replacement): Randomly removes data.
Example: A website might use LRU to ensure that the least recently accessed resources are replaced first.
14. File-Based Storage System:
A File-Based Storage System manages data in files and folders instead of structured databases. It is simple but becomes inefficient for complex data and query needs.

Example: A content management system that stores articles and images in a simple file system.
15. Can RDBMS Scale Horizontally? Why is it Hard to Scale Relational Databases?:
RDBMS Horizontal Scaling: It is difficult due to the complexity of relationships and joins between tables.
Challenges: Data consistency, transactions, and complex joins make it hard to distribute data across servers.
Example: A large e-commerce website might struggle to scale its relational database horizontally due to complex product and order relationships.
16. Types of NoSQL Databases (Which One to Use and Where?):
Document-Based: MongoDB for semi-structured data.
Key-Value Stores: Redis for fast caching.
Column-Based: Cassandra for large-scale distributed data.
Graph-Based: Neo4j for managing relationships.
Example: Use MongoDB for flexible user data storage and Redis for fast caching in a web application.
17. What is Polyglot Persistence?:
Polyglot Persistence refers to using different types of databases for different types of data storage needs.

Example: Using a relational database for financial transactions and a document database for user profile storage.
18. What is Denormalization in RDBMS?:
Denormalization involves combining tables or precomputing joins to reduce complex queries and improve performance.

Example: In an e-commerce system, storing product and category data in a single table instead of separate tables to speed up queries.
19. How Does Indexing Work in Databases? How to Optimize SQL Queries?:
Indexing: Creating an index allows the database to quickly locate and retrieve data without scanning the entire table.
Optimization: Use indexes on columns frequently used in queries, avoid unnecessary joins, and simplify SQL statements.
Example: Adding an index to the "email" column in a user table speeds up search queries.
20. What is Synchronous Communication?:
Synchronous Communication involves a request-response model where the sender waits for the receiver to respond before continuing.

Example: In a payment processing system, the application waits for the bank to confirm the transaction before proceeding.

1:: what is System design Process in software ?
 
2:: Monolithic Architecture?

3::Difference between monolithic and microservices architecture

4::What is latency in networking | How to reduce latency in network | CDN vs Caching

5::What is throughput ? ( How to improve throughput ?

6::What is throughput ? ( How to improve throughput ? )

7::What is Consistency in System Design ( Strong vs Eventual Consistency 

8::What is CAP theorem  ?

9::What is Lamport Logical Clock ?

10::Difference between horizontal and vertical scaling 

11::Difference between Redundancy and Replication  ( Master - Slave Replication )

12::What is load balancer and How it works  ( Load Balancing Algorithms )

13::What is Caching  (Complete Explanation)

14::Cache Eviction Techniques  ( LRU, LFU, MRU, LIFO, FIFO & RR )

15::File based storage system  ( File Based Database Management System  )

16::Can RDBMS scale horizontally  ? ( Why is it hard to scale relational database ? )

17::Types of NoSQL Databases  ( Which one to use and where ? )

18::what is Polyglot Persistence  ?

19::What is denormalization in RDBMS 

20::How does indexing work in Databases  ( How to optimize SQL Queries  )

21::What is Synchronous communication 


22::What is synchronous and asynchronous communication 


23::What is message based communication  ?

24::What is web server 

25::What is communication protocol in computer network 

26::REST API | SOA | Microservices architecture | Tier architecture

27::Difference between Authentication and Authorization 

28::Basic Authentication 

29::Token Based Authentication 

30::OAuth Authentication 

31::Forward proxy and reverse proxy Explained 

32::Reverse proxy server 


33::URL shortener system design


3:: what is architecture?

Ans: internal design details for building the application;




:::::::  Adavance  :::::::::::::::::

⌨️ (00:00) Introduction
⌨️ (00:39) Computer Architecture (Disk Storage, RAM, Cache, CPU)
⌨️ (04:22) Production App Architecture (CI/CD, Load Balancers, Logging & Monitoring)
⌨️ (07:12) Design Requirements (CAP Theorem, Throughput, Latency, SLOs and SLAs)
⌨️ (14:40) Networking (TCP, UDP, DNS, IP Addresses & IP Headers)
⌨️ (19:03) Application Layer Protocols (HTTP, WebSockets, WebRTC, MQTT, etc)
⌨️ (24:01) API Design
⌨️ (29:19) Caching and CDNs
⌨️ (36:33) Proxy Servers (Forward/Reverse Proxies)
⌨️ (42:36) Load Balancers
⌨️ (48:05) Databases (Sharding, Replication, ACID, Vertical & Horizontal Scaling)





Introduction (00:00): Overview of the concepts and topics that will be discussed
 in the session.

Computer Architecture (00:39): Covers fundamental components of a 
computer system such as disk storage, RAM, cache, and CPU, and how they interact.

Production App Architecture (04:22): Discusses the architecture of 
applications in production environments, focusing on CI/CD (Continuous 
Integration/Continuous Deployment), load balancers, and logging & monitoring tools.

Design Requirements (07:12): Explores key system design principles such as
 the CAP theorem, throughput, latency, and service-level objectives (SLOs)
  and agreements (SLAs).


Networking (14:40): Explains networking fundamentals like TCP,
 UDP, DNS, IP addresses, and IP headers.

Application Layer Protocols  Discusses different 
protocols used at the application layer such as HTTP, WebSockets, WebRTC, and MQTT.


API Design (24:01): Provides guidelines and best practices
 for designing APIs.

Caching and CDNs (29:19): Covers caching strategies and content delivery 
networks (CDNs) to optimize performance and scalability.

Proxy Servers (36:33): Differentiates between forward and reverse proxy 
servers and explains their roles in a network.

Load Balancers (42:36): Explains how load balancers distribute traffic
 across multiple servers to ensure high availability and reliability.

Databases (48:05): Discusses database design and scaling strategies such 
as sharding, replication, ACID (Atomicity, Consistency, Isolation, Durability)
 properties, and vertical vs. horizontal scaling.
 


 System desgin the database design and scaling strategies ::::::::::


 1::vertical scaling 

 2::horizontal scaling

 3::load balancers 

 4::content delivery network 

 5::caching 

 6::ip address  

 7::Tcp / IP

 8::Ip address 

 9::Domain Name system 

 10::Http 

 11:Rest 

 12::GraphQL

 13::gRpc

 14::websocket 

 15::sql 

 16::ACID 

 17::NoSql 

 18::Sharding 

 19::Replication 

 