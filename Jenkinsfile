pipeline {
    agent any

    environment {
        APP_DIR  = "/opt/node-app"
        APP_PORT = "3000"
    }

    stages {

        stage('Fetch Code from Git') {
            steps {
                echo "Code fetched from GitHub"
            }
        }

        stage('Build Application') {
            steps {
                echo "Installing Node.js dependencies"
                sh '''
                  cd node-app
                  npm install
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                echo "Deploying application"
                sh '''
                  rm -rf $APP_DIR/*
                  cp -r node-app/* $APP_DIR/
                '''
            }
        }

        stage('Restart Application') {
            steps {
                echo "Restarting Node.js application"
                sh '''
                  # Stop old app if running
                  pkill -f server.js || true

                  # Start new app with updated code
                  nohup node /opt/node-app/server.js > /opt/node-app/app.log 2>&1 &

                  # Give app time to start
                  sleep 5
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Application deployed and restarted successfully"
        }
        failure {
            echo "❌ Pipeline failed"
        }
    }
}
