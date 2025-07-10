const { reset, restart } = require("nodemon")
const monitor = require("nodemon/lib/monitor")

Q what is PM2 ?

Ans::https://pm2.keymetrics.io/docs/usage/process-management/

//npm install pm2 -g

https://www.npmjs.com/package/pm2


Pm2 Command  Line Interface ::::::::::::: ------------------->>>>

pm2 start app.js   "MyApp" --watch

$ pm2 start "npm run start"
$ pm2 start "ls -la"
$ pm2 start app.py



pm2 list

2:::Stop 
pm2 stop 0
$ pm2 stop api
$ pm2 stop [process_id]
pm2 stop all
pm2 stop app1 app3 app4



2:::pm2 delete  -------->>

pm2 delete api
pm2 delete all

3::restart -----------
pm2 restart 0
pm2 restart api
pm2 restart app1 app3 app4
$ pm2 restart all


:::Listing Applications 
$ pm2 list
# Or
$ pm2 [list|ls|l|status]
$ pm2 list --sort name:desc
# Or
$ pm2 list --sort [name|id|pid|memory|cpu|status|uptime][:asc|desc]


:::To have more details on a specific application: --------->>

pm2 describe 0

:::To monitor logs, custom metrics, application information:

pm2 monit


::::Starting a Node.js application in cluster mode that will leverage all CPUs available:

pm2 start api.js -i <processes>

:::Zero Downtime Reload
Hot Reload allows to update an application without any downtime:cls

$ pm2 reload all


With the drop-in replacement command for node, called
 pm2-runtime, run your Node.js application in
a hardened production environment. Using it is seamless:

RUN npm install pm2 -g
CMD [ "pm2-runtime", "npm", "--", "start" ]


:::Host monitoring speedbar
PM2 allows to monitor your host/server vitals with a monitoring speedbar.

$ pm2 set pm2:sysmonit true
$ pm2 update
$ pm2 monit


:::Log Management
To consult logs just type the command:

$ pm2 logs

$ pm2 logs APP-NAME       # Display APP-NAME logs
$ pm2 logs --json         # JSON output
$ pm2 logs --format       # Formated output

$ pm2 flush               # Flush all logs
$ pm2 reloadLogs          # Reload all logs


:::To enable log rotation install the following module

$ pm2 install pm2-logrotate



2::https://www.npmjs.com/package/response-time  --> Important 






monitor ............ Install all Npm Modules 


1:: https://gist.github.com/piyushgarg-dev/7c4016b12301552b628bbac21a11e6ab --> all about


1:: Grafana  use for valiusation raw  metrics  information

..https://grafana.com/







2::Prometheus  Prom client and metric  collection is a metric tools for monitoring

https://www.npmjs.com/package/prom-client .. install 


Prometheus server : port .9090

00... metrics    use for 

..number 

..memory 

..cpu

..req and res check letency

...available memory 

..data base time 





3:: Grafana Loki for collection console information error check 





Q monitoring  use

1:: metrics    use for 

..number 

..memory 

..cpu

..req and res check letency


2 :: Log collection use for  

..console.log

..check server log