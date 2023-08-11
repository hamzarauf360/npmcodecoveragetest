pipeline {
    agent any
    tools {
        nodejs 'node'
    }

    stages {

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

        stage('Run Code Coverage') {
            steps {
                sh 'npm run test:cover'
            }

            post {
                success {
                    echo 'Code coverage done!'
                }
            }
        }


        stage('Run Code Coverage and generate lcov info file') {
            steps {
                sh 'npm run cover'
            }

            post {
                success {
                    echo 'lcov info file generated!'
                }
            }
        }


    }
}
