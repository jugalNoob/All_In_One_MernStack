🧠 ADVANCED CMD COMMANDS (WINDOWS LIKE A PRO)



⚙️ 1. System & Hardware Info (Deep)

| Task                       | Command                                   |
| -------------------------- | ----------------------------------------- |
| Get detailed system info   | `systeminfo`                              |
| List all installed drivers | `driverquery`                             |
| List BIOS version          | `wmic bios get smbiosbiosversion`         |
| Check CPU info             | `wmic cpu get name`                       |
| Check motherboard info     | `wmic baseboard get product,manufacturer` |
| View boot configuration    | `bcdedit`                                 |



📁 2. Advanced File and Directory Ops


| Task                            | Command                         |
| ------------------------------- | ------------------------------- |
| List all hidden/system files    | `dir /a`                        |
| Create multiple folders at once | `mkdir folder1 folder2 folder3` |
| Search for a file               | `dir /s /p filename.txt`        |
| Compare two files               | `fc file1.txt file2.txt`        |
| Use wildcards in file delete    | `del /q *.log`                  |


🧱 3. Registry Editor via CMD

| Task                | Command                                                         |
| ------------------- | --------------------------------------------------------------- |
| Export registry key | `reg export HKCU\Software\MyApp backup.reg`                     |
| Import registry key | `reg import backup.reg`                                         |
| Add registry value  | `reg add HKCU\Software\MyApp /v setting /t REG_SZ /d "enabled"` |
| Delete registry key | `reg delete HKCU\Software\MyApp /f`                             |


🔒 4. User Privileges & Policies

| Task                         | Command                                                         |
| ---------------------------- | --------------------------------------------------------------- |
| Force logout a user          | `logoff <SessionID>`                                            |
| Set password to never expire | `wmic useraccount where name='Jugal' set PasswordExpires=false` |
| Disable user                 | `net user Jugal /active:no`                                     |
| Enable user                  | `net user Jugal /active:yes`                                    |


🧪 5. System Troubleshooting / Fix Tools

| Task                        | Command               |
| --------------------------- | --------------------- |
| Reset all TCP/IP            | `netsh int ip reset`  |
| Reset Winsock catalog       | `netsh winsock reset` |
| Scan and fix system files   | `sfc /scannow`        |
| Check & repair disk         | `chkdsk /f /r`        |
| Run performance diagnostics | `perfmon /report`     |


💻 6. Process, Services & Startup Control

| Task                       | Command                                   |
| -------------------------- | ----------------------------------------- |
| List all running processes | `tasklist`                                |
| Kill a process by name     | `taskkill /IM chrome.exe /F`              |
| List all services          | `sc query`                                |
| Stop a service             | `sc stop "ServiceName"`                   |
| Disable service on boot    | `sc config "ServiceName" start= disabled` |


🧰 7. Scheduled Tasks & Automation

| Task                  | Command                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| List all tasks        | `schtasks /query /fo LIST /v`                                           |
| Create scheduled task | `schtasks /create /sc daily /tn "Backup" /tr "C:\backup.bat" /st 01:00` |
| Delete scheduled task | `schtasks /delete /tn "Backup"`                                         |
| Run task now          | `schtasks /run /tn "Backup"`                                            |


🗃️ 8. Disk & Volume Management (with DISKPART)

| Task            | Command                |
| --------------- | ---------------------- |
| Launch DISKPART | `diskpart`             |
| List all disks  | `list disk`            |
| Select disk 0   | `select disk 0`        |
| List partitions | `list partition`       |
| Format drive    | `format fs=ntfs quick` |


🧑‍💻 9. WMIC Power User Commands

| Task                    | Command                                            |
| ----------------------- | -------------------------------------------------- |
| List startup apps       | `wmic startup get caption,command`                 |
| View installed software | `wmic product get name,version`                    |
| Uninstall a program     | `wmic product where name="AppName" call uninstall` |
| Get system uptime       | `wmic os get lastbootuptime`                       |
\


🔐 10. Security & Encryption

| Task                       | Command                           |
| -------------------------- | --------------------------------- |
| Encrypt a file             | `cipher /e file.txt`              |
| Decrypt a file             | `cipher /d file.txt`              |
| Wipe deleted files         | `cipher /w:C:\`                   |
| List local security policy | `secedit /export /cfg secpol.cfg` |
]

⚡ 11. Power Config & Remote

| Task                   | Command                         |
| ---------------------- | ------------------------------- |
| Show power config info | `powercfg /batteryreport`       |
| Hibernate PC           | `shutdown /h`                   |
| Remote shutdown        | `shutdown /m \\ComputerName /s` |
