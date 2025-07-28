

📂 1. File and Directory Commands

| **Task**                   | **Command**                  |
| -------------------------- | ---------------------------- |
| Show files and folders     | `dir`                        |
| Change directory           | `cd foldername`              |
| Go back one directory      | `cd ..`                      |
| Create a new folder        | `mkdir foldername`           |
| Delete a folder            | `rmdir foldername`           |
| Delete folder with content | `rmdir /S foldername`        |
| Delete a file              | `del file.txt`               |
| Copy a file                | `copy file1.txt file2.txt`   |
| Move a file                | `move file1.txt foldername\` |
| Rename a file              | `rename old.txt new.txt`     |
| View file contents         | `type file.txt`              |
| Create a new file          | `echo Hello > file.txt`      |



⚙️ 2. System Information and Tools

| **Task**                   | **Command**                  |
| -------------------------- | ---------------------------- |
| Show computer name         | `hostname`                   |
| Show Windows version       | `ver`                        |
| Show system info           | `systeminfo`                 |
| Check CPU details          | `wmic cpu get name`          |
| Check BIOS info            | `wmic bios get serialnumber` |
| List environment variables | `set`                        |
| Check current date         | `date /t`                    |
| Check current time         | `time /t`                    |


👤 3. User Account Management

| **Task**                     | **Command**                                   |
| ---------------------------- | --------------------------------------------- |
| List all users               | `net user`                                    |
| Create a new user            | `net user Jugal pass123 /add`                 |
| Delete a user                | `net user Jugal /delete`                      |
| Make user admin              | `net localgroup administrators Jugal /add`    |
| Remove user from admin group | `net localgroup administrators Jugal /delete` |


🧠 4. Task and Process Management]


| **Task**            | **Command**                   |
| ------------------- | ----------------------------- |
| List running tasks  | `tasklist`                    |
| Kill a task by name | `taskkill /IM notepad.exe /F` |
| Kill a task by PID  | `taskkill /PID 1234 /F`       |


🔐 5. File Attributes and Security
| **Task**            | **Command**          |
| ------------------- | -------------------- |
| Hide a file         | `attrib +h file.txt` |
| Make file read-only | `attrib +r file.txt` |
| Encrypt a file      | `cipher /e file.txt` |
| Decrypt a file      | `cipher /d file.txt` |



💾 6. Disk and Drive Commands


| **Task**                   | **Command**                                   |
| -------------------------- | --------------------------------------------- |
| Check disk space           | `wmic logicaldisk get size,freespace,caption` |
| List all drives            | `wmic logicaldisk get name`                   |
| Check disk for errors      | `chkdsk C:`                                   |
| Format a drive             | `format D:`                                   |
| Launch disk partition tool | `diskpart`                                    |
| Disk cleanup tool (UI)     | `cleanmgr`                                    |


🔋 7. Power Management

| **Task**                    | **Command**         |
| --------------------------- | ------------------- |
| Shutdown PC immediately     | `shutdown /s /t 0`  |
| Restart PC immediately      | `shutdown /r /t 0`  |
| Log out                     | `shutdown /l`       |
| Scheduled shutdown (60 sec) | `shutdown /s /t 60` |
| Abort scheduled shutdown    | `shutdown /a`       |


🧪 8. Miscellaneous Utilities

| **Task**                    | **Command**         |
| --------------------------- | ------------------- |
| Clear screen                | `cls`               |
| Exit Command Prompt         | `exit`              |
| Pause script (in .bat file) | `pause`             |
| Print a message             | `echo Hello Jugal!` |


🛠 9. Advanced & Scripting (Batch/Automation)

| **Task**                  | **Command**                         |
| ------------------------- | ----------------------------------- |
| Set a variable            | `set name=Jugal`                    |
| Print variable            | `echo %name%`                       |
| Run loop over files       | `for %%f in (*.txt) do echo %%f`    |
| Conditional logic (batch) | `if exist file.txt echo File found` |
