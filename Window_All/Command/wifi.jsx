Great, Jugal! Here's a full list of Windows CMD commands for managing Wi-Fi networks, from basic to advanced, using tools like netsh wlan, ipconfig, and others.

📶 1. Show All Available Wi-Fi Networks
bash
Copy
Edit
netsh wlan show networks
✅ Shows SSIDs, network types, and encryption types of nearby networks.

📂 2. View Saved Wi-Fi Profiles
bash
Copy
Edit
netsh wlan show profiles
✅ Lists all Wi-Fi networks you've connected to and saved credentials for.

🔍 3. Show Wi-Fi Profile Details
bash
Copy
Edit
netsh wlan show profile name="Your_SSID" key=clear
✅ Reveals detailed info including Wi-Fi password under Key Content.

📤 4. Export Saved Wi-Fi Profiles (with password)
bash
Copy
Edit
netsh wlan export profile name="Your_SSID" folder="C:\backup" key=clear
✅ Creates an XML file of the profile. Useful for backup or copying to another PC.

📥 5. Import Wi-Fi Profile
bash
Copy
Edit
netsh wlan add profile filename="C:\backup\Wi-Fi-Your_SSID.xml"
✅ Installs a Wi-Fi configuration on another computer without typing SSID or password.

🚫 6. Delete a Wi-Fi Profile
bash
Copy
Edit
netsh wlan delete profile name="Your_SSID"
✅ Removes a saved Wi-Fi network and password.

📲 7. Connect to a Specific Wi-Fi Network
bash
Copy
Edit
netsh wlan connect name="Your_SSID"
✅ Connects to a Wi-Fi network using a previously saved profile.

🔌 8. Disconnect from Current Wi-Fi
bash
Copy
Edit
netsh wlan disconnect
✅ Immediately disconnects from the connected Wi-Fi.

📶 9. View Current Wi-Fi Connection Info
bash
Copy
Edit
netsh wlan show interfaces
✅ Shows signal strength, SSID, BSSID (MAC of router), authentication type, etc.

🛰️ 10. Show Wi-Fi Driver Information
bash
Copy
Edit
netsh wlan show drivers
✅ Displays wireless adapter driver version, supported authentication, and hosted network support.

📡 11. Hosted Network (Wi-Fi Hotspot) – Legacy
Note: Hosted network is deprecated in Windows 10/11 for some drivers.

bash
Copy
Edit
netsh wlan set hostednetwork mode=allow ssid=MyHotspot key=12345678
netsh wlan start hostednetwork
✅ Turns your PC into a hotspot (if supported). To stop:

bash
Copy
Edit
netsh wlan stop hostednetwork
🧱 12. Reset Wi-Fi Stack (Fix Issues)
bash
Copy
Edit
netsh winsock reset
netsh int ip reset
ipconfig /release
ipconfig /renew
ipconfig /flushdns
✅ Fully resets IP settings and DNS. Useful for resolving connectivity problems.

⚡ Bonus: PowerShell Alternative to Get Wi-Fi Password
powershell
Copy
Edit
(netsh wlan show profile name="SSID" key=clear) -match 'Key Content(.*)' | Out-String
💡 Tips



| Task                         | Command                                                                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| View current IP              | `ipconfig`                                                                                                                                                    |
| View MAC address             | `getmac` or `ipconfig /all`                                                                                                                                   |
| Enable/Disable Wi-Fi adapter | `wmic path win32_networkadapter where "NetConnectionID='Wi-Fi'" call disable`<br>`wmic path win32_networkadapter where "NetConnectionID='Wi-Fi'" call enable` |




✅ 1. Wi-Fi Management (via netsh wlan)


| **Task**                      | **Command**                                       |
| ----------------------------- | ------------------------------------------------- |
| 🔍 View nearby Wi-Fi networks | `netsh wlan show networks`                        |
| 📁 View saved Wi-Fi profiles  | `netsh wlan show profiles`                        |
| 🔑 View Wi-Fi password        | `netsh wlan show profile name="SSID" key=clear`   |
| 📤 Export Wi-Fi profile       | `netsh wlan export profile name="SSID" key=clear` |
| 📥 Import Wi-Fi profile       | `netsh wlan add profile filename="SSID.xml"`      |
| 🚫 Delete Wi-Fi profile       | `netsh wlan delete profile name="SSID"`           |
| 📶 Connect to saved Wi-Fi     | `netsh wlan connect name="SSID"`                  |
| 🔌 Disconnect Wi-Fi           | `netsh wlan disconnect`                           |
| 🛰️ Show current Wi-Fi status | `netsh wlan show interfaces`                      |
| 🧰 Show Wi-Fi driver info     | `netsh wlan show drivers`                         |
