pipeline {
    agent any
    tools {
        nodejs 'node'
    }

    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'main', url: 'https: //github.com/hamzarauf360/npmcodecoveragetest.git'
            }
        }

        stage('install') {
            steps {
                sh 'npm install'
            }

            post {
                success {
                    echo 'Code was installed sucessfully!'
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }

            post {
                success {
                    echo 'Code was built sucessfully!'
                }
            }
        }

        stage('Run Test') {
            steps {
                sh 'npm run test'
            }

            post {
                success {
                    echo 'Running tests!'
                }
            }
        }

    }
}
