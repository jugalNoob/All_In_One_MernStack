===============================
Windows File & Folder Commands
===============================

✅ Check Files and Folders (Tree View)

tree # Basic tree structure
tree /F # Show files in tree
tree /F | more # Paginated output
tree /A # Use ASCII characters
tree C:\Projects /F # View specific directory

(WSL/Git Bash/Linux)
tree -L 3 # Limit depth to 3 levels
tree -d # Directories only

✅ Create a File

echo "text" > file.txt # Overwrite/create
echo "text" >> file.txt # Append to file
type nul > file.txt # Empty file
copy con file.txt # Interactive (Ctrl+Z to save)
fsutil file createnew largefile.txt 1048576 # 1MB file

(PowerShell)
New-Item file.txt -ItemType File
Set-Content file.txt "Hello"
1..100 | Out-File numbers.txt

✅ Create a Folder

mkdir folder
mkdir folder\subfolder
mkdir "folder with spaces"
md folder1 folder2 folder3 # Multiple folders

✅ Delete File or Folder

del file.txt
del *.tmp # Wildcard delete
del /Q *.log # Quiet mode
rd /S /Q folder # Force delete folder
rmdir /S folder # Alternative

✅ Rename File or Folder

ren old.txt new.txt
rename "old name.txt" "new name.txt"
ren *.htm *.html # Bulk rename

✅ Move/Copy Files & Folders

move file.txt destination\
move /Y file.txt dest\ # Suppress prompts
copy src.txt dest\
copy *.txt backup\
xcopy src dest /E /H /C /I # /E=subdirs /H=hidden
robocopy src dest /MIR # Mirror directories
robocopy src dest /MOV # Move files

✅ List Files and Directories

dir # Basic listing
dir /B # Bare format
dir /S # Include subdirs
dir /O:N # Sort by name
dir /A:D # Only directories
dir /A:-D # Only files
dir /T:W # Show last written

✅ Open Folder or File

start . # Open current dir
start .. # Open parent dir
start file.txt # Open with default app
start notepad file.txt # Open with specific app
explorer . # Alternative

✅ Create Multiple Files/Folders

for /L %i in (1,1,5) do @echo. > file%i.txt
for /L %i in (1,1,3) do @mkdir folder%i
mkdir {1..5} # (PowerShell)

✅ Search for Files

dir /s /b filename.txt # Basic search
dir /s /b *.jpg # Wildcard search
where /R C:\ *.exe # Recursive search
findstr /S /I "text" *.txt # Search content

✅ File Attributes

attrib +R file.txt # Read-only
attrib +H folder # Hidden
attrib -H -R file.txt # Remove attributes
attrib /S *.doc # Process matching files

✅ File Comparisons

fc file1.txt file2.txt # Compare files
comp /A file1.txt file2.txt # ASCII comparison

✅ File Information

type file.txt # View contents
more < file.txt # Paginated view
certutil -hashfile file.txt SHA256 # Checksum

✅ Symbolic Links

mklink link.txt target.txt # Create symlink
mklink /D linkdir targetdir # Directory symlink

✅ Permissions

icacls file.txt # View permissions
icacls file.txt /grant User:R # Grant read

✅ Disk Usage

dir /s # Show sizes
chkdsk # Disk check
fsutil volume diskfree C: # Free space

✅ Advanced Operations

find "search" file.txt # Text search (old)
for %f in (*.txt) do @echo %f # File iteration
for /D %d in (*) do @echo %d # Directory iteration

(PowerShell Alternatives)
Get-ChildItem -Recurse
Test-Path file.txt
Remove-Item -Force -Recurse folder

Would you like me to add any specific categories or commands?