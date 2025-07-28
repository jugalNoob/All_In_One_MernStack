🔧 GitLab CLI & Git Commands – All-in-One Guide
✅ GitLab primarily uses Git for version control. You also interact with GitLab via:

Git CLI (standard Git commands)

GitLab UI (web interface)

GitLab CLI Tool like glab

🧰 1. 🔹 Git Basics (Common Git Commands used with GitLab)
🔹 git init
Initializes a new Git repository.

bash
Copy
Edit
git init
🔹 git clone <repo_url>
Clones a repository from GitLab to your local system.

bash
Copy
Edit
git clone https://gitlab.com/username/project.git
🔹 git status
Shows the status of modified files.

bash
Copy
Edit
git status
🔹 git add
Adds files to staging.

bash
Copy
Edit
git add file.txt        # Add a file
git add .               # Add all changes
🔹 git commit -m "message"
Creates a commit.

bash
Copy
Edit
git commit -m "Initial commit"
🔹 git push
Pushes code to GitLab.

bash
Copy
Edit
git push origin main
🔹 git pull
Fetch and merge remote changes.

bash
Copy
Edit
git pull origin main
🚀 2. 🔸 Working with Branches
🔹 git branch
List all branches.

bash
Copy
Edit
git branch
🔹 git checkout -b new-feature
Create and switch to a new branch.

bash
Copy
Edit
git checkout -b feature/login-page
🔹 git merge
Merge another branch into the current branch.

bash
Copy
Edit
git merge feature/login-page
🔧 3. 🔸 GitLab-Specific with glab CLI
Install glab:

bash
Copy
Edit
brew install glab       # For macOS
choco install glab      # For Windows
🔹 glab auth login
Authenticate to GitLab.

bash
Copy
Edit
glab auth login
🔹 glab repo clone
Clone using GitLab CLI.

bash
Copy
Edit
glab repo clone username/project
🔹 glab issue list
List GitLab issues.

bash
Copy
Edit
glab issue list
🔹 glab mr create
Create a merge request (pull request).

bash
Copy
Edit
glab mr create
🔐 4. 🔸 Using SSH with GitLab
Generate SSH Key
bash
Copy
Edit
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
Add SSH Key to GitLab
Go to:
GitLab > Settings > SSH Keys → paste your public key.

🧪 5. 🔸 CI/CD Basics in GitLab
Create a .gitlab-ci.yml file:

yaml
Copy
Edit
stages:
  - build
  - test

build-job:
  stage: build
  script:
    - echo "Building project"

test-job:
  stage: test
  script:
    - echo "Running tests"
🛡️ 6. 🔸 GitLab Security & Permissions
Protected branches: Prevent direct push to main/master

2FA (Two-factor authentication)

Access levels:

Guest, Reporter, Developer, Maintainer, Owner

🧠 7. 🔸 Advanced Git Commands
Git stash (temporary store changes)
bash
Copy
Edit
git stash
git stash pop
Rebase (reapply commits on top of another base tip)
bash
Copy
Edit
git rebase main
Amend last commit
bash
Copy
Edit
git commit --amend
Reset changes
bash
Copy
Edit
git reset --hard HEAD~1   # Delete last commit



🏢 8. 🏆 GitLab Real-World Usage


| Company                     | Use Case                                           |
| --------------------------- | -------------------------------------------------- |
| **NASA JPL**                | Version control for spacecraft simulations & code  |
| **Sony**                    | Internal development and CI/CD pipelines           |
| **Goldman Sachs**           | Used for private repositories and audit compliance |
| **OpenAI (internal tools)** | Secure GitOps pipelines                            |


