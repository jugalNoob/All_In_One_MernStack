📁 3. Basic Docker Terminology


| Term           | Description                                           |
| -------------- | ----------------------------------------------------- |
| **Image**      | A snapshot of your application and its environment    |
| **Container**  | A running instance of an image                        |
| **Dockerfile** | A text file with instructions to build a Docker image |
| **Volume**     | Persistent data storage outside the container         |
| **Network**    | Docker’s way of allowing containers to communicate    |
| **Registry**   | A repository for Docker images (e.g., Docker Hub)     |



🧪 4. Basic Docker Commands

# Check version
docker --version

# Pull an image
docker pull nginx

# Run a container
docker run -d -p 8080:80 nginx

# List containers
docker ps -a

# Stop a container
docker stop <container_id>

# Remove container/image
docker rm <container_id>
docker rmi <image_id>


🏗️ 5. Dockerfile Example
Dockerfile
Copy
Edit
# Dockerfile for a Node.js app
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
Build and Run:

bash
Copy
Edit
docker build -t my-node-app .
docker run -d -p 3000:3000 my-node-app




📦 6. Docker Compose (Multi-container Setup)
📄 docker-compose.yml:

yaml
Copy
Edit
version: "3.8"
services:
  web:
    build: .
    ports:
      - "3000:3000"
  redis:
    image: redis


    Run Compose:

bash
Copy
Edit
docker-compose up -d
docker-compose down


📚 7. Docker Volumes (Persist Data)
bash
Copy
Edit
# Create volume
docker volume create mydata

# Use in container
docker run -d -v mydata:/data busybox



🔗 8. Docker Networking
Bridge (default)

Host (container uses host's network)

None (no networking)

Custom (for isolated networks)

bash
Copy
Edit
# Create network
docker network create mynet

# Use network
docker run -d --network=mynet myapp


🐳 9. Dockerizing a MERN App (Example)
Directory Structure:

mern-app/
├── backend/
│   ├── Dockerfile
├── frontend/
│   ├── Dockerfile
├── docker-compose.yml




Backend Dockerfile:

Dockerfile
Copy
Edit
FROM node:18
WORKDIR /backend
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
Frontend Dockerfile:

Dockerfile
Copy
Edit
FROM node:18
WORKDIR /frontend
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
docker-compose.yml:

yaml
Copy
Edit
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend




      🔐 10. Docker Secrets & Environment Variables
With environment variables:

bash
Copy
Edit
docker run -e MONGO_URL=mongodb://localhost myapp
With Compose:

yaml
Copy
Edit
environment:
  - MONGO_URL=mongodb://mongo
Or use .env file.

🧹 11. Docker Cleanup
bash
Copy
Edit
docker system prune         # Remove all unused containers, networks, images
docker volume prune
docker image prune
🚀 12. Deploy to Production (Best Practices)
Use multi-stage builds to reduce image size

Always define .dockerignore

Pin versions (node:18-alpine, not node:latest)

Use healthchecks in Compose

Use CI/CD with Docker (GitHub Actions, GitLab, Jenkins)

Use Docker Swarm or Kubernetes for orchestration

📊 13. Docker Monitoring Tools
Portainer: GUI for managing Docker

cAdvisor: Resource usage and performance metrics

Prometheus + Grafana: For production monitoring

🌐 14. Push to Docker Hub
bash
Copy
Edit
docker login
docker tag myapp jugal/myapp:v1
docker push jugal/myapp:v1
🔄 15. Multi-Stage Builds (Advanced Optimization)
Dockerfile
Copy
Edit
# Stage 1: build
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: serve
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
🛡️ 16. Security in Docker
Don’t run apps as root

Use Docker Bench for security audits

Use Slim images (alpine, distroless)

Scan images with tools like docker scan

⛵ 17. Docker vs Kubernetes


| Feature    | Docker           | Kubernetes              |
| ---------- | ---------------- | ----------------------- |
| Purpose    | Containerization | Container Orchestration |
| Complexity | Easy             | Complex but powerful    |
| Scaling    | Manual           | Automatic               |




🧠 Summary

| Concept           | Command or Tool                  |
| ----------------- | -------------------------------- |
| Create Image      | `docker build`                   |
| Run Container     | `docker run`                     |
| Manage Containers | `docker ps`, `stop`, `rm`        |
| Networking        | `docker network`                 |
| Multi-service     | `docker-compose`                 |
| Persist Data      | `docker volume`                  |
| Deploy            | `docker push`, Swarm, Kubernetes |





🐳 Docker Concepts – From Zero to Advanced
🔰 1. Introduction to Docker
Container: Lightweight, portable, isolated execution environment.

Image: Read-only template used to create containers.

Docker Engine: Core software to build and run containers.

Client-Server Architecture: Docker uses a CLI (client) and a daemon (server).

📦 2. Docker Components
Dockerfile: Script with instructions to build an image.

Docker Image: A snapshot built from a Dockerfile.

Docker Container: A running instance of an image.

Docker Hub: Default public registry for storing and sharing Docker images.

Docker CLI: Command-line interface to interact with Docker.

Docker Daemon: Background service that manages Docker objects.

🏗️ 3. Building Blocks
Layers: Each command in a Dockerfile creates a new image layer.

Union File System: Combines layers to form a single unified image.

Tagging: Labeling images for versioning.

Context: Directory used when building images (includes Dockerfile and other files).

⚙️ 4. Running Containers
Detached vs. Interactive Mode: Running in background vs. foreground.

Port Binding: Mapping container ports to host ports.

Environment Variables: Injecting values at runtime into containers.

Volumes: Persistent storage outside of container lifecycle.

Bind Mounts: Mounting host files/directories into containers.

Named Volumes: Managed volumes tracked by Docker.

Temporary Containers: Automatically removed after exit.

🔗 5. Networking in Docker
Bridge Network: Default isolated network for containers.

Host Network: Container shares host’s network stack.

None Network: Container has no external networking.

Overlay Network: For multi-host (Swarm) networking.

Custom Network: User-defined isolated networks.

DNS in Docker: Internal name resolution between containers.

🧰 6. Docker Compose
Multi-container Applications: Define and run multi-service apps.

Services: Individual containers defined in Compose.

Volumes and Networks in Compose: Declared and shared between services.

Dependencies: Define startup order between services.

🔐 7. Configuration & Secrets
Environment Variable Injection: At build or runtime.

Secrets Management: Securely store sensitive data like passwords or API keys.

Config Management: Store and use plain-text configuration files in containers.

🚢 8. Image Optimization
Multi-stage Builds: Use multiple FROM stages to reduce final image size.

Minimized Base Images: Use of alpine, scratch, etc.

.dockerignore: Prevents unnecessary files from being sent during image build.

Caching: Docker caches image layers for faster builds.

🔄 9. Orchestration and Scaling
Docker Swarm: Native Docker clustering/orchestration.

Kubernetes: Advanced container orchestration platform.

Replicas: Define the number of running instances.

Load Balancing: Distribute traffic across container replicas.

Service Discovery: Automatic internal addressing of services.

🔍 10. Monitoring & Logging
Logs: Capture container logs.

Health Checks: Define container health status checks.

Resource Limits: Restrict CPU and memory usage.

Monitoring Tools: Portainer, cAdvisor, Prometheus, Grafana.

🛡️ 11. Security Concepts
Least Privilege: Run containers with minimal permissions.

User Namespaces: Isolate host and container users.

Image Signing: Verify image authenticity.

Scanning: Detect vulnerabilities in images.

Seccomp, AppArmor, SELinux: Kernel-level security controls.

📤 12. Image Distribution
Private Registries: Self-hosted image repositories.

Docker Hub & Alternatives: Public image registries.

Push/Pull: Upload or download images from registries.

🧹 13. Cleanup & Maintenance
Image/Container Pruning: Remove unused images and containers.

Dangling Images: Images without tags.

Volumes & Networks Cleanup: Manage unused resources.

🧪 14. Testing & CI/CD
Docker in CI/CD: Used in pipelines for build, test, deploy.

Test Containers: Create disposable environments for testing.

Integration with GitHub Actions / GitLab CI / Jenkins.

⚖️ 15. Comparison with Virtual Machines
Performance: Containers are more lightweight and efficient.

Isolation: Containers share the OS kernel; VMs have separate OS.

Startup Time: Containers start instantly; VMs take longer.

🧠 16. Best Practices
Use minimal base images

Always use .dockerignore

Avoid storing secrets in images

Pin dependency versions

Regularly scan and update images

Clean up after builds

Use multi-stage builds

