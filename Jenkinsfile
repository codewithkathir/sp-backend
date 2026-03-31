pipeline {
    agent any

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Clone Backend') {
            steps {
                git branch: 'dev', url: 'https://github.com/codewithkathir/sp-backend.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Backend') {
            steps {
                sh '''
                # Stop old process if exists
                pm2 delete sp-backend || true

                # Start backend
                pm2 start server.js --name sp-backend
                '''
            }
        }
    }
}
