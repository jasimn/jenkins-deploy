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
3.3 Start Jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins


Access Jenkins:

http://<SERVER_IP>:8080


Unlock Jenkins:

sudo cat /var/lib/jenkins/secrets/initialAdminPassword

4. Install Required Jenkins Plugins

Install from Manage Jenkins → Plugins:

Git

GitHub

Pipeline

Pipeline: SCM Step

NodeJS (optional)

Restart Jenkins after installation.

5. Application Code (Example)
Project Structure
jenkins-deploy/
├── Jenkinsfile
└── node-app/
    ├── server.js
    └── package.json

node-app/server.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Node.js App Deployed via Jenkins CI/CD');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

node-app/package.json
{
  "name": "jenkins-node-app",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}

6. Application Deployment Directory
sudo mkdir -p /opt/node-app
sudo chown -R jenkins:ec2-user /opt/node-app
sudo chmod -R 775 /opt/node-app

7. systemd Service (Production Best Practice)
/etc/systemd/system/node-app.service
[Unit]
Description=Node.js Application Managed by Jenkins
After=network.target

[Service]
Type=simple
User=jenkins
WorkingDirectory=/opt/node-app
ExecStart=/usr/bin/node /opt/node-app/server.js
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target


Enable service:

sudo systemctl daemon-reload
sudo systemctl enable node-app

8. Jenkins Pipeline (Jenkinsfile)
pipeline {
    agent any

    environment {
        APP_DIR = "/opt/node-app"
    }

    stages {

        stage('Fetch Code from Git') {
            steps {
                checkout scm
            }
        }

        stage('Build Application') {
            steps {
                sh '''
                  cd node-app
                  npm install --omit=dev
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                  rm -rf $APP_DIR/*
                  cp -r node-app/* $APP_DIR/
                '''
            }
        }

        stage('Restart Application') {
            steps {
                sh '''
                  sudo /usr/bin/systemctl restart node-app
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Application deployed successfully"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}

9. Allow Jenkins to Restart Service (Important)

Jenkins cannot enter sudo passwords.

sudo visudo


Add:

jenkins ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart node-app


Verify:

sudo su - jenkins
sudo systemctl restart node-app
exit

10. Create Jenkins Pipeline Job

Jenkins Dashboard → New Item

Select Pipeline

Pipeline Definition: Pipeline script from SCM

SCM: Git

Repository URL: GitHub repo URL

Branch: main

Save

11. Configure GitHub Webhook (Auto Trigger)
GitHub → Repo → Settings → Webhooks

Payload URL:

http://<SERVER_IP>:8080/github-webhook/


Content type:

application/json


Event:

Push


