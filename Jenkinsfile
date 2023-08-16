pipeline {
    agent any
    
    tools {
        nodejs 'node'
    }
    
	environment {
        registryCredential = 'ecr:us-east-1:awscreds'
        appRegistry = "483620405894.dkr.ecr.us-east-1.amazonaws.com/nodeprojectimage"
        nodeRegistry = "https://483620405894.dkr.ecr.us-east-1.amazonaws.com"
    }
	
    stages {

        stage('install') {
            steps {
                sh 'npm install'
            }

            post {
                success {
                    echo 'pakcages were installed sucessfully!'
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


        stage('Sonar analysis') {
            environment{
                scannerHome = tool 'sonar4.7'
            }
            steps {
                withSonarQubeEnv('sonar') {
                    sh '''${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=npmcodecoverage \
                    -Dsonar.projectName=npmcodecoverage \
                    -Dsonar.projectVersion=1.0.2 \
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
		
		stage('Build App Image') {
			steps {
				script {
					dockerImage = docker.build( appRegistry + ":$BUILD_NUMBER", "./Docker/")
				}
			}
    
		}
		
		stage('Upload App Image') {
          steps{
            script {
              docker.withRegistry( nodeRegistry, registryCredential ) {
                dockerImage.push("$BUILD_NUMBER")
                dockerImage.push('latest')
              }
            }
          }
     }

    }
}
