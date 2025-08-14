              ┌─────────────────────────┐
              │     Master Process       │
              │   PID: (e.g., 1234)      │
              │--------------------------│
              │ - Starts all workers     │
              │ - Monitors for crashes   │
              │ - Shares server port     │
              └───────────┬──────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
 ┌────────────┐    ┌────────────┐    ┌────────────┐
 │ Worker #1  │    │ Worker #2  │    │ Worker #3  │
 │ PID: 4567  │    │ PID: 4568  │    │ PID: 4569  │
 │------------│    │------------│    │------------│
 │ Express app│    │ Express app│    │ Express app│
 │ listens on │    │ listens on │    │ listens on │
 │ port 9000  │    │ port 9000  │    │ port 9000  │
 └────────────┘    └────────────┘    └────────────┘
        ▲                 ▲                 ▲
        └─────────────────┴─────────────────┘
                          │
                  OS Load Balancer
                          │
                          ▼
                 Incoming HTTP Requests





                 [ Client Browser ]           [ Master Process ]                  [ Worker Processes ]
        │                           │                                      │
        │ 1. Send HTTP GET /         │                                      │
        ├───────────────────────────►│                                      │
        │                           2│  Master has server socket            │
        │                            │  but doesn't process the request     │
        │                            │  Passes TCP connection to OS LB      │
        │                            ▼                                      │
        │                    ┌─────────────────┐                            │
        │                    │ OS Load Balancer│                            │
        │                    └─────────────────┘                            │
        │                           │                                        │
        │                 (Round-robin / sticky on Win)                      │
        │                           │                                        │
        │                           ▼                                        ▼
        │                 Connection sent to Worker #3             Worker #3: Express app
        │                           │                                finds matching route `/`
        │                           │                                Sends "Hello from PID 4440"
        │◄──────────────────────────┘                                      │
        │                                                                    │

        │ 3. Send HTTP GET /home                                            │
        ├──────────────────────────────────────────────────────────────────►│
        │                           Master + OS LB decide                   │
        │                           On Linux → may go to Worker #5           │
        │                           On Windows → may still hit Worker #3     │
        │                                                                    ▼
        │                                                         Worker #5: Express app
        │                                                         finds `/home` route
        │                                                         Sends "Hello from PID 9604"
        │◄──────────────────────────────────────────────────────────────────┘
