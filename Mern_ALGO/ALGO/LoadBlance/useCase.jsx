
✅ 1. Static Algorithms
Use Case: Internal dev tools, diagnostics.

Real World: A company’s CI/CD pipeline routes logs to a fixed log collector server.

🔁 2. Round Robin Algorithm
Use Case: Balanced routing for stateless apps.

Real World: Apache HTTPD, NGINX, and HAProxy use this by default for round-robin request distribution across servers.

💻 3. Round Robin Demo
Use Case: Educational purpose or simple proxy demos.

Real World: Shown in Node.js load balancer examples, Docker Swarm default uses this round-robin scheduling.

⚖️ 4. Weighted Round Robin
Use Case: Servers with different capacities.

Real World: Kubernetes Ingress, NGINX Plus, and HAProxy allow weighted round robin based on CPU/memory.

📶 5. Dense Round Robin
Use Case: Scenarios requiring tighter control on switching.

Real World: HAProxy allows leastconn and dense round robin for more optimized routing.

🌐 6. IP Hash Algorithm
Use Case: Sticky sessions, same user hits same server.

Real World: Used by NGINX and Kong Gateway for session persistence in ecommerce or gaming apps.

🔗 7. URL Hash Algorithm
Use Case: CDN caching and routing.

Real World: Cloudflare, Akamai, and Fastly use URL hashing for content caching across edge locations.

🎲 8. Random Allocation
Use Case: Simple random sampling across nodes.

Real World: Used in canary deployments or A/B testing where traffic is randomly split (e.g., Netflix or Spotify testing new features).

🔄 9. Dynamic Algorithms
Use Case: Real-time load-aware balancing.

Real World: AWS Application Load Balancer, Azure Traffic Manager, and NGINX Plus monitor CPU/memory/disk before forwarding.

📉 10. Least Connections
Use Case: Long-running connections like WebSocket or video streaming.

Real World: Zoom, Slack, and WhatsApp use this logic to route messages over stable nodes.

🏋️ 11. Weighted Least Connection
Use Case: Dynamic load + unequal backend capabilities.

Real World: HAProxy Enterprise supports it in environments with heterogeneous nodes (different RAM/CPU).

⏱️ 12. Least Response Time Algorithm
Use Case: Real-time apps where response time is critical.

Real World: Uber, Airbnb, and Stock trading apps prefer the fastest responding API server.

🧠 13. Resource-Based Algorithms
Use Case: Optimize for CPU, RAM, or GPU load.

Real World: Google Cloud Load Balancer considers backend metrics. Kubernetes HPA (Horizontal Pod Autoscaler) also makes resource-aware decisions.

🌍 14. Geo-Location Based Load Balancing
Use Case: Serve users from nearest region.

Real World:

YouTube → Video delivery via regional CDN edge

Cloudflare / AWS CloudFront → Global load balancing based on country/ISP

Facebook → Routes user to nearest data center

🚫 15. Rate Limiting
Use Case: Protect APIs from abuse or DoS.

Real World:

GitHub API → 5000 requests/hour

Twitter API → Tier-based rate limiting

Stripe → Rate limit by IP + Auth token

🧷 16. Session Persistence (Sticky Sessions)
Use Case: User login sessions, chat apps.

Real World:

Ecommerce (Amazon, Flipkart) → Same cart state is preserved

Gaming servers (Fortnite) → Players stay connected to same instance

Node.js apps using express-session with load balancers like Kong or NGINX



| #  | Algorithm            | Example Company / Platform | Use Case                      |
| -- | -------------------- | -------------------------- | ----------------------------- |
| 1  | Static Routing       | Internal DevOps Tools      | Fixed route logs              |
| 2  | Round Robin          | NGINX, Docker Swarm        | Stateless microservices       |
| 4  | Weighted Round Robin | Kubernetes, HAProxy        | Heterogeneous node strengths  |
| 6  | IP Hash              | Kong Gateway, NGINX        | Sticky sessions               |
| 7  | URL Hash             | Cloudflare, Fastly         | Caching/static assets         |
| 9  | Dynamic              | AWS ALB, GCP LB            | Real-time optimization        |
| 10 | Least Connections    | WhatsApp, Zoom             | Long-lived connections        |
| 12 | Least Response Time  | Uber, Stock Trading Apps   | Fastest server wins           |
| 13 | Resource Based       | Google Cloud, Kubernetes   | CPU/GPU-aware routing         |
| 14 | Geo Location Based   | Cloudflare, YouTube        | Nearest server/CDN edge       |
| 15 | Rate Limiting        | GitHub, Twitter, Stripe    | API abuse prevention          |
| 16 | Session Persistence  | Amazon, Gaming Apps        | Consistent session experience |




🔷 All Types of Load Balancing Techniques (Complete List)
✅ 1. Static Load Balancing
Decisions are made without real-time server status.


| Algorithm                | Description                     | Example         |
| ------------------------ | ------------------------------- | --------------- |
| **Round Robin**          | Cyclically distributes requests | NGINX, Apache   |
| **Weighted Round Robin** | Accounts for server weight      | Kubernetes      |
| **Dense Round Robin**    | Repeats same server more often  | HAProxy         |
| **Random Allocation**    | Chooses a server at random      | Canary tests    |
| **Static Routing**       | Hardcoded backend assignment    | Dev tools       |
| **IP Hashing**           | Hash of IP maps to server       | Sticky sessions |
| **URL Hashing**          | Hash of URL path maps to server | Caching/CDN     |



🔄 2. Dynamic Load Balancing
Uses real-time metrics (CPU, latency, active connections).

v
| Algorithm                      | Description                                   | Example                |
| ------------------------------ | --------------------------------------------- | ---------------------- |
| **Least Connections**          | Chooses server with fewest active connections | Chat apps              |
| **Weighted Least Connections** | Same as above but considers weight            | HAProxy                |
| **Least Response Time**        | Server with lowest average latency wins       | Stock trading          |
| **Resource-Based**             | Considers CPU, RAM, disk, etc.                | GCP, Kubernetes        |
| **Dynamic (Custom)**           | Uses custom monitoring & logic                | Netflix internal tools |



🌍 3. Geo-Aware Load Balancing
Routes based on client’s physical or network location.

| Algorithm              | Description                     | Example             |
| ---------------------- | ------------------------------- | ------------------- |
| **Geo Location-Based** | Closest data center or CDN edge | Cloudflare, YouTube |


🛡️ 4. Control & Session Techniques
These don’t balance based on load, but manage how requests flow.

| Technique                                 | Description                      | Example                |
| ----------------------------------------- | -------------------------------- | ---------------------- |
| **Rate Limiting**                         | Limit requests per IP/user/token | Stripe, GitHub         |
| **Session Persistence (Sticky Sessions)** | Keep user bound to one server    | Amazon cart, chat apps |


🔧 Bonus Categories (Optional)
You might also see these in specific platforms or enterprise-grade systems:

| Extra Type                      | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| **Application-Aware LB**        | Parses layer 7 (e.g., HTTP header) to route traffic          |
| **Content-Based Routing**       | Routes based on file type, URL pattern, etc.                 |
| **DNS-Based Load Balancing**    | Uses DNS to return IP of different servers                   |
| **Service Mesh Load Balancing** | Envoy-based (Istio/Linkerd) dynamic routing per microservice |
