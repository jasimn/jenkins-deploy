pipeline {
    agent any

    environment {
        APP_DIR  = "/opt/node-app"
        APP_PORT = "3000"
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
                  npm install
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
                  sudo pkill -9 node || true
                  nohup node /opt/node-app/server.js > /opt/node-app/app.log 2>&1 &
                  sleep 5
                '''
            }
        }
    }
}
