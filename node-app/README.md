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
