pipeline {
    agent any

    environment {
        APP_DIR = "/opt/node-app"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout Code') {
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
                    sudo mkdir -p $APP_DIR
                    sudo rm -rf $APP_DIR/*
                    sudo cp -r node-app/* $APP_DIR/
                    sudo chown -R jenkins:jenkins $APP_DIR
                '''
            }
        }

        stage('Restart Service') {
            steps {
                sh '''
                    sudo systemctl restart node-app
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Application deployed and started via systemd (production-ready)"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}
