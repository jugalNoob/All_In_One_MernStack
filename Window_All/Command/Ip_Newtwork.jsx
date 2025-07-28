🌐 1. Basic IP & Network Configuration

| Command                 | Description                                   |
| ----------------------- | --------------------------------------------- |
| `ipconfig`              | Show IP address, subnet mask, default gateway |
| `ipconfig /all`         | Full details including MAC, DHCP, DNS, etc.   |
| `ipconfig /release`     | Release current IP address (DHCP only)        |
| `ipconfig /renew`       | Renew IP address from DHCP server             |
| `ipconfig /flushdns`    | Clear DNS resolver cache                      |
| `ipconfig /displaydns`  | View DNS cache                                |
| `ipconfig /registerdns` | Force DNS registration                        |



✅ Example:

ipconfig /all
ipconfig /flushdns



📡 2. Testing Network Connectivity


| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `ping <host>`     | Check if host is reachable                 |
| `ping 8.8.8.8`    | Ping Google DNS (checks internet)          |
| `tracert <host>`  | Trace route to host (shows each hop)       |
| `pathping <host>` | Combines ping + tracert + packet loss info |
| `netstat`         | Show current network connections           |


ping google.com
tracert yahoo.com


📶 3. Active Network Connections & Ports

| Command       | Description                     |
| ------------- | ------------------------------- |
| `netstat -a`  | All open ports and connections  |
| `netstat -an` | Show ports in numerical form    |
| `netstat -b`  | Show apps using each connection |
| `netstat -o`  | Show PID of each connection     |
| `netstat -s`  | Show protocol statistics        |


netstat -ano

🛰️ 4. DNS & Name Resolution

| Command                           | Description                      |
| --------------------------------- | -------------------------------- |
| `nslookup <domain>`               | Get IP address of domain         |
| `nslookup`                        | Enter interactive DNS shell      |
| `nslookup set type=mx google.com` | Lookup mail servers for a domain |


nslookup openai.com


🧭 5. Network Routes & Interfaces

| Command                                  | Description        |
| ---------------------------------------- | ------------------ |
| `route print`                            | Show routing table |
| `route add <IP> mask <Subnet> <Gateway>` | Add a static route |
| `route delete <IP>`                      | Delete route       |


route print
route add 192.168.10.0 mask 255.255.255.0 192.168.1.1


🧱 6. Firewall & Port Control

| Command                                                                                                     | Description                       |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `netsh advfirewall show allprofiles`                                                                        | Show firewall settings            |
| `netsh firewall set opmode disable`                                                                         | Disable firewall (legacy systems) |
| `netsh advfirewall firewall add rule name="Open Port 9000" dir=in action=allow protocol=TCP localport=9000` | Open a port                       |


🌐 7. Network Adapter Settings (netsh)

| Command                                                                                         | Description                      |
| ----------------------------------------------------------------------------------------------- | -------------------------------- |
| `netsh interface ip show config`                                                                | Show IP settings of all adapters |
| `netsh interface ip set address name="Ethernet" static 192.168.1.100 255.255.255.0 192.168.1.1` | Set static IP                    |
| `netsh interface ip set dns name="Ethernet" static 8.8.8.8`                                     | Set static DNS                   |
| `netsh wlan show profiles`                                                                      | Show saved Wi-Fi profiles        |
| `netsh wlan show interfaces`                                                                    | Show Wi-Fi connection info       |
| `netsh wlan export profile name="SSID" key=clear`                                               | Export Wi-Fi credentials         |
| `netsh wlan delete profile name="SSID"`                                                         | Delete saved Wi-Fi profile       |



🔌 8. ARP & MAC Address

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `getmac`      | Show MAC addresses of all interfaces |
| `arp -a`      | Show ARP cache (IP to MAC mapping)   |
| `arp -d <IP>` | Delete ARP entry                     |


🕵️‍♂️ 9. Network Diagnostics

| Command               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `netsh diag gui`      | Opens Network Diagnostics Tool (older Windows) |
| `netsh winsock reset` | Reset Winsock Catalog (fix weird networking)   |
| `netsh int ip reset`  | Reset TCP/IP stack                             |



🧪 10. PowerShell Bonus (Advanced)

| Command                         | Description                             |
| ------------------------------- | --------------------------------------- |
| `Test-NetConnection google.com` | Test connectivity like ping, but richer |
| `Get-NetIPAddress`              | Show IP addresses via PowerShell        |
| `Get-NetTCPConnection`          | List TCP connections                    |


