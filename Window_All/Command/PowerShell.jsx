🧠 Master-Level Windows CMD & PowerShell Commands


🖥️ System Information and Control


| **Task**                   | **CMD Command**                            | **PowerShell Equivalent**               |
| -------------------------- | ------------------------------------------ | --------------------------------------- |
| View full system info      | `systeminfo`                               | `Get-ComputerInfo`                      |
| List environment variables | `set`                                      | `Get-ChildItem Env:`                    |
| Shutdown/restart system    | `shutdown /s /t 0` <br> `shutdown /r /t 0` | `Stop-Computer` <br> `Restart-Computer` |
| Open system config         | `msconfig`                                 | `Start-Process msconfig`                |
| Open registry editor       | `regedit`                                  | `Start-Process regedit`                 |
| Task manager               | `taskmgr`                                  | `Start-Process taskmgr`                 |
| Kill a process             | `taskkill /F /IM notepad.exe`              | `Stop-Process -Name notepad`            |


📶 Wi-Fi Commands (CMD only)

| **Task**                    | **Command**                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| Show Wi-Fi profiles         | `netsh wlan show profiles`                                                                           |
| Show saved profile password | `netsh wlan show profile name="PROFILE_NAME" key=clear`                                              |
| Export all Wi-Fi profiles   | `netsh wlan export profile folder=C:\ key=clear`                                                     |
| Enable/Disable Wi-Fi        | `wmic path win32_networkadapter where "NetConnectionID='Wi-Fi'" call enable` <br> `... call disable` |


🌐 Networking

| **Task**                    | **CMD**                                          | **PowerShell**                              |                             |
| --------------------------- | ------------------------------------------------ | ------------------------------------------- | --------------------------- |
| IP Configuration            | `ipconfig /all`                                  | `Get-NetIPConfiguration`                    |                             |
| DNS cache view/flush        | `ipconfig /displaydns` <br> `ipconfig /flushdns` | `Clear-DnsClientCache`                      |                             |
| Show all active connections | `netstat -ano`                                   | `Get-NetTCPConnection`                      |                             |
| Ping                        | `ping google.com`                                | `Test-Connection google.com`                |                             |
| Trace route                 | `tracert google.com`                             | `Test-NetConnection google.com -TraceRoute` |                             |
| ARP table                   | `arp -a`                                         | `Get-NetNeighbor`                           |                             |
| Routing table               | `route print`                                    | `Get-NetRoute`                              |                             |
| List open ports             | `netstat -ab`                                    | `Get-NetTCPConnection` or \`Get-Process     | ? { $\_.MainWindowTitle }\` |


🗃️ File & Disk Management

| **Task**                 | **CMD**                     | **PowerShell**                    |
| ------------------------ | --------------------------- | --------------------------------- |
| Disk usage               | `chkdsk`                    | `Get-Volume`                      |
| List drives              | `wmic logicaldisk get name` | `Get-PSDrive`                     |
| View hidden/system files | `dir /a`                    | `Get-ChildItem -Force`            |
| Create hardlink          | `mklink /H link target`     | `New-Item -ItemType HardLink`     |
| Create symlink           | `mklink /D link target`     | `New-Item -ItemType SymbolicLink` |


🛡️ Security & Users

| **Task**              | **CMD**                                    | **PowerShell**         |
| --------------------- | ------------------------------------------ | ---------------------- |
| View user accounts    | `net user`                                 | `Get-LocalUser`        |
| Create user           | `net user user1 password /add`             | `New-LocalUser`        |
| Add user to group     | `net localgroup Administrators user1 /add` | `Add-LocalGroupMember` |
| View running services | `services.msc` or `tasklist /svc`          | `Get-Service`          |
| Modify group policy   | `gpedit.msc`                               | *N/A directly*         |


🧪 Advanced Debug / Monitoring

| **Task**            | **CMD**                            | **PowerShell**                            |
| ------------------- | ---------------------------------- | ----------------------------------------- |
| Performance monitor | `perfmon`                          | `Start-Process perfmon`                   |
| Resource monitor    | `resmon`                           | `Start-Process resmon`                    |
| Event viewer        | `eventvwr`                         | `Get-WinEvent`                            |
| Task scheduler      | `taskschd.msc`                     | `Get-ScheduledTask`                       |
| View logs           | `wevtutil qe System /c:10 /f:text` | `Get-EventLog -LogName System -Newest 10` |



🧰 Hidden Utilities (Pro Level)

| **Tool**                             | **Launch**                                             |
| ------------------------------------ | ------------------------------------------------------ |
| GodMode folder (all system settings) | `mkdir GodMode.{ED7BA470-8E54-465E-825C-99712043E01C}` |
| Reliability Monitor                  | `perfmon /rel`                                         |
| Snipping Tool                        | `snippingtool` or `snip`                               |
| Disk Cleanup                         | `cleanmgr`                                             |
| Windows Memory Diagnostic            | `mdsched`                                              |
| Device Manager                       | `devmgmt.msc`                                          |
| Services Manager                     | `services.msc`                                         |

