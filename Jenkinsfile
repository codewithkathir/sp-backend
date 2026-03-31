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
                git branch: 'main', url: 'https://github.com/codewithkathir/sp-backend.git'
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
                pm2 delete sp-backend || true
                pm2 start npm --name "sp-backend" -- run dev
                '''
            }
        }
    }
}
