# Jenkins CI/CD Pipeline – Complete Guide (Node.js Example)

This project demonstrates how to **install Jenkins** and create a **fully automated Jenkins pipeline** that:

1. Fetches code from a Git repository  
2. Builds a web application  
3. Deploys the application to a server  
4. Automatically triggers on GitHub push  
5. Uses production best practices  

---

## 1. Architecture Overview

```text
Developer
   |
   |  git push
   v
GitHub Repository
   |
   |  Webhook
   v
Jenkins Pipeline
   |
   |  Checkout → Build → Deploy → Restart
   v
Application Server (EC2)
```
## 2. Prerequisites

### Server Requirements

- Linux server  
  - Amazon Linux  
  - Ubuntu  
  - RHEL  

- Open ports:

  - **22** – SSH  
  - **8080** – Jenkins  
  - **3000** – Application  

### Software Requirements

- Java **11+**
- Jenkins
- Git
- Node.js **18+**
- systemd (default on modern Linux)

---

## 3. Install Jenkins

### 3.1 Install Java

Jenkins requires Java to run. Install Java 11 or higher.

#### Amazon Linux / RHEL

```bash
sudo yum install java-11-amazon-corretto -y
```
## 3.2 Install Jenkins

Add the Jenkins repository and import the GPG key:

```bash
sudo wget -O /etc/yum.repos.d/jenkins.repo \
https://pkg.jenkins.io/redhat-stable/jenkins.repo

sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
sudo yum install jenkins -y
```
## 3.3 Start Jenkins
```bash sudo systemctl enable jenkins
sudo systemctl start jenkins
```

Access Jenkins:
```bash
http://<SERVER_IP>:8080
```

Unlock Jenkins:
```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
## 4. Install Required Jenkins Plugins

Go to:

**Manage Jenkins → Plugins**

Install the following plugins:

- **Git**
- **GitHub**
- **Pipeline**
- **Pipeline: SCM Step**
- **NodeJS** *(optional)*

After installing the plugins, **restart Jenkins**.

---

## 5. Application Code (Example)

### Project Structure
sojenkins-deploy
 |-- Jenkinsfile
 `-- node-app
     |-- server.js
     `-- package.json

