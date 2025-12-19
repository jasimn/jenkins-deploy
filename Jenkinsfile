pipeline {
    agent any

    environment {
        APP_DIR = "/opt/node-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Application') {
            steps {
                sh '''
                  cd node-app
                  npm install --production
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

        stage('Restart Service') {
            steps {
                sh '''
                   sudo /usr/bin/systemctl restart node-app
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Application deployed via systemd (production-ready)"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}
