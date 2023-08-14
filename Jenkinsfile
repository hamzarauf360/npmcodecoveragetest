def COLOR_MAP = [
    'SUCCESS': 'Green', 
    'FAILURE': 'Red',
]
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

        stage('Npm Pack') {
        	steps {
        		sh 'npm pack'
        	}
        }

        stage('Sonar analysis') {
            environment{
                scannerHome = tool 'sonar4.7'
            }
            steps {
                withSonarQubeEnv('sonar') {
                    sh '''${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=npmcodecoverage \
                    -Dsonar.projectName=npmcodecoverage \
                    -Dsonar.projectVersion=1.0.1 \
                    -Dsonar.sources=src/ \
                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                    '''
                }
            }
        }

         stage("Quality Gate") {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                    // true = set pipeline to UNSTABLE, false = don't
                    waitForQualityGate abortPipeline: true
                }
            }
        }

       stage("UploadArtifact") {
          steps {
          	 sh 'npm publish'
           }
        }
    }

    post {
        always {
            echo 'Slack Notifications.'
            slackSend channel: '#jenkinsci',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
        }
    }
}
