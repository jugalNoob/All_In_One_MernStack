2. Docker Images :::::::::::::::::::::::::::::::::::

..List all images:

docker images

...Pull an image from Docker Hub:
docker pull [image-name]

....Build an image from a Dockerfile:

docker build -t [image-name]:[tag] .
Example: docker build -t myapp:v1 .
  
....Tag an image: 
docker tag [image-id] [username]/[repository-name]:[tag]
Example: docker tag abcd1234 myuser/myapp:v1

...Remove an image:
docker rmi [image-name]
Example: docker rmi myapp:v1

...Inspect an image: 
docker inspect [image-name]


...Push an image to Docker Hub: 
docker push [username]/[repository-name]:[tag]
Example: docker push myuser/myapp:v1


::::::  2 Docker Container ::::::::::::::

...Run a container:

docker run [image-name]
Example: docker run nginxf


...Run a container with a custom name:


10. Inspecting and Debugging :::::::::::::::::::::::::::::::::::::::::::

  
...Inspect a container:

docker inspect [container-id]


...View container logs:
docker logs [container-id]


...View real-time container logs:
docker logs -f [container-id]


...View resource usage (CPU, Memory) of containers:
docker stats


5. Docker Networks ::::::::::::::::::::::::::::::::::::::::::::::::::::
Commands


....List all networks:
docker network ls


...Create a network:
docker network create [network-name]
Example: docker network create mynetwork

....Run a container on a specific network:
docker run --network [network-name] [image-name]
Example: docker run --network mynetwork nginx

...Connect a running container to a network:
docker network connect [network-name] [container-id]


...Disconnect a running container from a network:
docker network disconnect [network-name] [container-id]


...Inspect a network:
docker network inspect [network-name]


...Remove a network:
docker network rm [network-name]





7. Docker Swarm (Orchestration) :::::::::::::::::::::::::::::
Commands

...Initialize Docker Swarm:
docker swarm init


...Join a Docker Swarm:
docker swarm join --token [token] [manager-ip]:[port]


....List nodes in a swarm:
docker node ls


...Deploy a stack:

docker stack deploy -c [compose-file.yml] [stack-name]


...List services in a stack:

docker stack services [stack-name]


...Remove a stack:
docker stack rm [stack-name]





:::::::::::::::: New Feature in docker   ::::::::::::::::::::::::::::::::::


1::1. Docker Scout

Commands:
....Analyze a local Docker image:

docker scout cves [image]
Example: docker scout cves myapp:latest


2::22. Docker Build for Cloud (Buildx)
...Build an image for multiple platforms:

docker buildx build --platform linux/amd64,linux/arm64 -t [image-name] .
Example: docker buildx build --platform linux/amd64,linux/arm64 -t myapp:multiarch .


3:33. Docker Debug

.....Attach to a running container for debugging:
docker exec -it [container-id] /bin/bash


::::4. Docker Desktop for Cloud-Native Development :":::



::::5. Docker BuildKit (Faster Builds) 





Docker is an open-source platform designed to automate the deployment, scaling, and management of applications within lightweight, portable containers. It allows developers to package their applications and dependencies into a standardized unit (a container) that can run on any system with Docker installed, regardless of the environment. Here's a breakdown of Docker and its key concepts:

1. Containers
Containers are lightweight, standalone, and executable software packages that include everything needed to run an
  application: the code, runtime, libraries, and system tools. Unlike virtual machines (VMs), containers share
    the host system's OS kernel but keep everything else isolated. This makes them muchmore efficient in terms
      of performance and resources.

      

2. Docker Engine
The Docker Engine is the core component of Docker. It is responsible for creating and running Docker containers.
  It consists of three main components:
Docker Daemon: The background service that manages containers.
REST API: Interfaces with the daemon for control and configuration.
Docker CLI (Command Line Interface): A user-friendly way to interact with Docker.

  
3. Dockerfile
A Dockerfile is a text document containing the steps needed to build a Docker image. It automates the process
  of building an image by specifying commands such as copying files, installing dependencies, and setting environment variables.
    

Sample Dockerfile:
dockerfile
Copy code
# Use an official image as a base
FROM python:3.8-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Define environment variables
ENV PORT=8000

# Run the application
CMD ["python", "app.py"]


4. Docker Images
Docker images are immutable templates used to create containers. An image can be based on an existing image (like Ubuntu) 
  or built from scratch using a Dockerfile. Images can be shared via Docker registries, such as Docker Hub, which serves
    as a central repository.
    

5. Docker Container
A container is a runtime instance of an image. It holds everything needed to execute an application. Containers are portable, 
  lightweight, and designed to be run, stopped, or paused with ease.
  

6. Docker Compose
Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you can use a 
  docker-compose.yml file to configure your application's services, networks, and volumes. This is useful for managing
    more complex applications with multiple components, like a web application with a frontend, backend, and database.

Sample docker-compose.yml:
yaml
Copy code
version: '3'
services:
  web:
    image: my-web-app
    ports:
      - "5000:5000"
  database:
    image: postgres
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password


7. Docker Swarm
Docker Swarm is Docker’s native clustering and orchestration tool. It enables the creation of a cluster of Docker nodes, 
  where services can be scaled across multiple machines.
  

8. Docker Registry
A Docker Registry is a storage and distribution system for Docker images. The most well-known public registry is Docker 
  Hub, but organizations can also set up their private registries to manage internal images.
    

9. Advantages of Docker
Portability: Applications can be containerized and moved between development, testing, and production environments with no
  compatibility issues.
    
Isolation: Containers are isolated from one another, ensuring that different applications don't conflict.
Efficiency: Unlike VMs, containers share the host OS kernel, making them more lightweight.
Scalability: Containers can be easily scaled horizontally by distributing containerized applications across multiple systems.
Faster Development and Deployment: Containers can be built quickly, allowing for continuous integration/continuous deployment
  (CI/CD) practices.

  
10. Common Docker Commands
Here are some common Docker commands:

docker pull [image]: Downloads an image from a registry.
docker build -t [name] .: Builds an image from a Dockerfile.
docker run [image]: Runs a container from an image.
docker ps: Lists running containers.
docker stop [container_id]: Stops a running container.
docker exec -it [container_id] /bin/bash: Opens a shell into a running container.
docker-compose up: Starts all services defined in a docker-compose.yml file.
docker-compose down: Stops and removes services defined in a docker-compose.yml file.

  
11. Volumes
Docker volumes are used to persist data generated by and used by Docker containers. They allow data to exist outside
  the container’s lifecycle, making it easier to maintain state between restarts.
bash
Copy code
docker run -v /my/host/dir:/container/dir [image]


12. Networking in Docker
Docker provides several network drivers for containers to communicate with each other and with the outside world:

Bridge (default): Allows containers to communicate with each other on the same host.
Host: Shares the host's network stack, providing the same IP and ports as the host.
None: No networking, completely isolates the container.
13. Orchestration with Kubernetes
While Docker provides its native orchestration tool with Docker Swarm, many organizations prefer Kubernetes for orchestrating large-scale, multi-container applications. Kubernetes automates deployment, scaling, and operation of application containers across clusters of hosts.
