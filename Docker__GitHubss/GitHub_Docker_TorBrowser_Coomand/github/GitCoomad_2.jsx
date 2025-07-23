
:::::::: Base of Git Hub :::::::::::::::::::: ......................<><>?<><><><><>
  
git config --global user.name ""

git config --global user.email

git config --list -->check all user information

git init -->create folder add all information

git status -->check file status

git log  -->check status and check commint

1::Git init -- 

2::git status  --> check  status

3::git add . --> all file addda

4::git add py.py --> single file data

5::Git log --> check comments
Author: jugalNoob <sjugal126@gmail.com>
Date:   Sat Apr 27 21:12:05 2024 -0700

git add README.md

git commit -m "first commit"

git branch -M main

git remote add origin https://github.com/jugalNoob/PythonOne.git

git push -u origin main

1::git remote  -->check link your Hub

2::git remote -v -->
  
3::git pull -->You create a new File in github and then use command -->git pull

4::ls -->check File name information


  
  ::::::::::::::::::::git branch --> check branch      ---------------<><><>

...git branch: Lists all branches or checks which branch you're currently on.

1::git diff:

git diff: Shows the changes in the working directory compared to the last commit. Useful for checking which parts
  of your file have been modified.
You repeated it twice, but both usages are essentially the same.
    
2:::git show 14bc23426dc392c6682a5160fb22653041f10e75:py.py:

Displays the content of the py.py file at the specific commit 14bc23426dc392c6682a5160fb22653041f10e75.
This is useful when you want to check what a file looked like in a specific commit.
    
3:::git checkout 14bc23426dc392c6682a5160fb22653041f10e75 -- py.py:

Checks out (restores) the py.py file from the commit 14bc23426dc392c6682a5160fb22653041f10e75 into your working directory.
    
4:::git checkout 14bc23426dc392c6682a5160fb22653041f10e75 -- *:

Restores all files (*) from the commit 14bc23426dc392c6682a5160fb22653041f10e75 into your working directory. 
    Useful when you want to bring back all the files from a specific commit.
    
5::git checkout master -- *:

Checks out all files from the master branch to your current working directory, overwriting any local changes.
    
6::git checkout master -- index.py:

Checks out the index.py file from the master branch. If you want to see more changes or additions, you can run git diff master.


::::::::::::  check all Command Your GitHub ......................

    git log --graph --oneline --decorate --all: Show the commit graph in a visual format.
git log --author="name": Show commits by a specific author.

    
    Git Log Commands
1:::git log:

Shows the commit history, listing each commit's hash, author, date, and message. This is the most basic form of logging in Git.
    
2:::git log -p -2:

Displays the last two commits along with the patch (diff) for each commit. This shows you the exact code
    changes made in each of the last two commits.
    
3:::git log --stat:

Provides a summary of changes in each commit. It shows which files were changed and how many lines were added
or deleted. This is useful when you want a high-level overview of the modifications.
    
4:::git log --pretty=oneline:

Displays the commit history in a compact, one-line format, showing the commit hash and message in 
  a single line per commit. This is great for quickly scanning the history without too much detail.

    
5:::git log -S 'h1':

Searches for commits where the string 'h1' was added or removed in the project. This is useful for tracking down 
    where a specific string or code snippet was introduced or removed.
    
    
6:::git log --pretty=format:'%h - %an, %ar : %s':

  
Customizes the output of the log to show:
%h: The abbreviated commit hash.
%an: The author's name.
%ar: The relative date (e.g., 2 days ago).
%s: The commit message.

7::: Possible Extensions for git log --pretty=format:
%ad: To display the full commit date instead of the relative time.
%ae: To show the author’s email.
%cn: To show the committer’s name.
%cd: To show the committer’s full date.
%d: To show any ref names (e.g., branches or tags) that point to that commit.
%B: To include the full commit message.




1. Handling Merge Conflicts ::::::::::::::::::::::::::: Very important ::::::::::::::::::::::::

git branch <branch>: Create a new branch.
git checkout <branch>: Switch to a different branch.
git merge <branch>: Merge a branch into the current branch.
git push origin <branch>: Push branch changes to a remote repository.
    
    
When you encounter a merge conflict, Git will pause the merge process and ask you to resolve the conflicts.

git merge <branch_name>: Attempts to merge the branch into your current branch.
git status: Shows files with merge conflicts.
git diff <file>: Shows the differences in the file with conflicts.
Manually edit files: You'll need to manually edit the files to resolve the conflict. Conflicting sections will be marked with <<<<<<<, =======, and >>>>>>>.
git add <file>: Once resolved, add the file to stage it.
git merge --continue: Continue the merge after resolving conflicts.
git merge --abort: Abort the merge if you decide not to merge the branch.

    


8. Tagging ::::::::::::::::::::::::::::::::::::: Important 

    
Tags are used to mark specific points in the commit history as important, often used for releases.

git tag <tagname>: Create a lightweight tag.
git tag -a <tagname> -m "message": Create an annotated tag with a message.
git push origin <tagname>: Push a tag to the remote repository.
git tag -d <tagname>: Delete a local tag.
git push origin --delete <tagname>: Delete a remote tag.
    


  4. Git Cherry-Pick :::::::::::::::::::::::::::::::::::::::

Cherry-picking is a way to apply a specific commit from one branch to another branch.

git cherry-pick <commit_hash>: Apply a specific commit to the current branch.
If conflicts arise, resolve them and continue using git cherry-pick --continue.
  

3. Stashing Changes::::::::::::::::::::::::::::::::::::::::::::::::::
  
Sometimes you need to switch branches but don't want to commit your current changes. You can "stash" your changes and apply them later.

git stash: Stash your changes (saves them temporarily).
git stash list: List all stashed changes.
git stash apply: Apply the most recent stash to your current working directory.
git stash apply stash@{2}: Apply a specific stash from the list.
git stash drop: Drop the most recent stash.
git stash pop: Apply the most recent stash and remove it from the stash list.

  
  


Handling Mistakes in Git (Negative Cases)::::::::::::::::::::::::::::::::::::::::::::::

    
These commands help when changes are mistakenly made, staged, or even committed. Here's how to deal with each scenario:


 Case 1: Undo Unstaged Changes (Accidentally Modified and Saved Files)
    
git restore .
This command will remove all changes in your working directory, reverting files back to the last commit.


To discard changes in a specific file:
git restore py.py

Case 2: Undo Changes Staged with git add
    
  ...git restore --staged index.html
   This removes index.html from the staging area but keeps the changes in the working directory.
    
  git restore --staged .
This removes all staged files but keeps the changes in the working directory.

Case 3: Recover Staged Changes While Modifying Files Further

git restore --worktree index.html
This resets the working copy of index.html to match the version in the staging area (without affecting the index).

Case 4: Undo a Wrong Commit
git reset --soft HEAD^
This will uncommit the last commit (without removing the changes), keeping the changes in the staging area for further modification.

git reset --hard HEAD^
This will uncommit and discard all changes from the last commit. Use this with caution, as you will lose changes.

git reset --soft HEAD~2

 This uncommits the last two commits, but keeps the changes in the working directory.

    git revert <commit-hash>

This creates a new commit that reverses the effects of the specified commit, without modifying any other history.
    
Summary of Commands:
To undo all unstaged changes: git restore .
To undo unstaged changes for a specific file: git restore <file>
To unstage changes: git restore --staged <file>
To revert to the staged version: git restore --worktree <file>
To undo the last commit but keep the changes: git reset --soft HEAD^
To undo the last commit and discard the changes: git reset --hard HEAD^
    


 ::::::::::::::::::::::::::: Remote Repositories: ----------------------------<><><><>
   

1. git remote: Manage the Set of Tracked Repositories
   
...git remote   
   This will show a simple list of remote names (like origin).

   ..git remote -v
This will show a detailed list with the URLs for each remote (both fetch and push URLs).

  ....git remote add <name> <url>
    To add a new remote repository:
Example:
git remote add origin https://github.com/user/repo.git

    
  ...To remove a remote repository:
 git remote remove <name> example :: git remote remove origin   
    
2:::git fetch: Download Objects and References from Another Repository

...git fetch
This updates your remote tracking branches (e.g., origin/main), but it doesn’t affect your local branch.


....git fetch <remote_name>
Example:
git fetch origin
This fetches new data from the origin remote repository.

3. git remote add: Add a Remote Repository

 ....git remote add <name> <url> 
  exmpale:::git remote add upstream https://github.com/other-user/other-repo.git
   This adds a remote repository named upstream.

4. git remote -v: List Remote Repositories

This command displays the remote repositories along with their URLs.

.....git remote -v
perl
origin  https://github.com/user/repo.git (fetch)
origin  https://github.com/user/repo.git (push)
   
 5:::Other Useful Remote Commands
Push changes to a remote repository:

   ...git push <remote_name> <branch_name>
git push origin main

.....Pull changes from a remote repository and merge them:
   git pull <remote_name> <branch_name>
     
git pull origin main
This fetches the latest changes from the origin/main branch and merges them into your local main branch.

     
     Summary of Commands:
git remote -v: List remote repositories with URLs.
git fetch: Fetch changes from a remote without merging.
git remote add <name> <url>: Add a new remote repository.
git push <remote_name> <branch_name>: Push changes to a remote repository
   

   
    

2. Rebasing a Branch:::::::::::::::::::::::

  
Rebasing is an alternative to merging that integrates changes from one branch to another by moving 
  the base of the branch to the current commit of another.

git rebase <branch_name>: Rebase your current branch onto the specified branch.
git rebase --continue: Continue the rebase process after resolving conflicts.
git rebase --abort: Abort the rebase if conflicts are too complex or you want to stop.
  
    
    
    
    
||||||||||GitClone Folder |||||||||
git clone https://github.com/jugalNoob/PythonFile.git -->clone your website

git clone https://github.com/user/repo.git my-local-directory

ls -->check files

clear

git commit -m "PythonFile"


::::::::::::::Git .gitignore File Overview  ::::::::::::::::::::
# This is a comment, Git will ignore it

# Ignore the "demo" folder
demo/

# Ignore all .log files
*.log

# Ignore any file starting with "temp"
temp*

# Ignore files in all "node_modules" directories
node_modules/

git status --ignored  >>> Importanat

 1:: #: Lines starting with # are comments for readability.
2:::demo/: This line tells Git to ignore the entire demo/ folder and its contents.
3:::*.log: This pattern ignores all files with the .log extension, no matter where they are located.
4:::temp*: Any file starting with "temp" will be ignored (e.g., temp1.txt, tempfile.js).
5:::node_modules/: This will ignore all node_modules/ folders across the project, which is common for Node.js projects.



  Q how to add your email and name in github? ::::::::::::::::::::::::::::::::::

...git config --global user.name “[firstname lastname]”

...git config --global user.email “[valid-email]”

...git config --global color.ui auto
    
    

||||||||||||Renaming and Moving  Files in Git||||||||||||

git mv py.py jugal.py --chnages Your file file_name

git rm jugal.py --> remove files

git push origin <branch_name> -->Update 

git rm --cached jugal.py -->remove file 

touch newfile.txt --> linux command

echo.>newfile.txt

git push origin <branch_name>
  

3. Stashing Changes ::::::::::::::::::::::::::::::::::::::::::::::::
  
Sometimes you need to switch branches but don't want to commit your current changes. You can "stash" your changes and apply them later.
git stash: Stash your changes (saves them temporarily).
git stash list: List all stashed changes.
git stash apply: Apply the most recent stash to your current working directory.
git stash apply stash@{2}: Apply a specific stash from the list.
git stash drop: Drop the most recent stash.
git stash pop: Apply the most recent stash and remove it from the stash list.
  



  9. Cleaning Up Untracked Files ::::::::::::::::::::::::::::::::::::::::::
  
If you have untracked files and want to remove them:

git clean -n: Show which files will be removed.
git clean -f: Forcefully remove untracked files.
git clean -fd: Remove untracked files and directories
  

  
  10.Shallow Clone for Faster Downloads::::::::::::::::::::::::::::::::::::::
  
For large repositories, you can perform a shallow clone to save time and disk space.

git clone --depth 1 <repository_url>: Clone the repository with a depth of 1, which means only the most recent commit is downloaded
