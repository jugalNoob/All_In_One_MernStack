
🌐 Step 5: Test
Visit: http://whoami.localhost

Dashboard: http://localhost:8080/dashboard/


docker-compose up -d


127.0.0.1 whoami.localhost


🧪 Final Step: Rebuild and Restart
bash
Copy
Edit
docker-compose down
docker-compose up --build -d


docker-compose down -v  -->delete volumn like update
docker-compose up --build -d



✅ Auto Load Balancing (Round-Robin)
Just by scaling your Docker service:

docker-compose up --scale express-api=3 -d



Url Create ------------->>

  # - 'traefik.http.routers.api.rule=Host("api.192.168.1.100.nip.io")'  



  /// ----- >>>> This Is HTTP  --->>>


      labels:
    - "traefik.enable=true"
    - "traefik.http.routers.api.entrypoints=web"
    - "traefik.http.services.api.loadbalancer.server.port=9000"
    - 'traefik.http.routers.api.rule=Host("api.localhost")'



    /// ---> Thios is HTTPS ::::::::::::::::::::::


    labels:
  - "traefik.enable=true"
  - 'traefik.http.routers.api.rule=Host("api.yourdomain.com")'
  - "traefik.http.routers.api.entrypoints=websecure"
  - "traefik.http.routers.api.tls.certresolver=letsencrypt"
  - "traefik.http.services.api.loadbalancer.server.port=9000"
