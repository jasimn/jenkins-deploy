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

        stage('Start Application') {
            steps {
                echo "Starting Node.js application"
                sh '''
                  PID=$(lsof -t -i:$APP_PORT || true)
                  if [ -n "$PID" ]; then
                    kill -9 $PID
                  fi

                  nohup node $APP_DIR/server.js > $APP_DIR/app.log 2>&1 &
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline executed successfully"
        }
        failure {
            echo "❌ Pipeline execution failed"
        }
    }
}
