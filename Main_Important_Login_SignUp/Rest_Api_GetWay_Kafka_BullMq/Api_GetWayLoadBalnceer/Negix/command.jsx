🧪 Testing with /etc/hosts
Add the following to your /etc/hosts file for local DNS routing:

plaintext
Copy
Edit
127.0.0.1 api.localhost
127.0.0.1 traefik.localhost


🔄 Summary Mapping


| Traefik                    | Nginx Equivalent                     |
| -------------------------- | ------------------------------------ |
| Host(`api.localhost`)      | `server_name api.localhost;`         |
| `entrypoints=web`          | `listen 80;`                         |
| Load balancer to port 9000 | `proxy_pass http://express-api:9000` |
| Middleware rate limit      | `limit_req_zone` + `limit_req`       |



✅ Next Steps
Run: docker-compose up --build

Visit: http://api.localhost → routes to Express API

Visit: http://traefik.localhost → routes to whoami

Test rate limiting with ab or curl in loops

Would you like me to help you add HTTPS (SSL) and support for nginx rate limit logging, or Dockerized