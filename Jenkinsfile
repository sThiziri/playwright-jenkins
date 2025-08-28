pipeline {
    agent any

    stages {
        stage('E2E Tests + Allure') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.54.2-jammy'
                    args '-u root'
                }
            }
            steps {
                script {
                    sh 'npm ci'
                    sh 'npx playwright install'

                    sh 'apt-get update && apt-get install -y default-jre'
                    sh 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64'
                    sh 'export PATH=$JAVA_HOME/bin:$PATH'

                    sh 'apt-get install -y unzip wget'
                    sh 'wget https://repo1.maven.org/maven2/io/qameta/allure/allure-commandline/2.34.1/allure-commandline-2.34.1.zip -O /tmp/allure.zip'
                    sh 'unzip /tmp/allure.zip -d /usr/local/'
                    sh 'ln -s /usr/local/allure-2.34.1/bin/allure /usr/bin/allure'

                    sh 'npx playwright test --reporter=line,allure-playwright'

                    sh 'chown -R 1000:1000 allure-results'
                    sh 'chmod -R 755 allure-results'

                    stash name: 'allure-results', includes: 'allure-results/**'
                }
            }

            post {
                always {
                    script {
                        unstash 'allure-results'

                        sh 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64'
                        sh 'export PATH=$JAVA_HOME/bin:$PATH'

                        sh 'allure generate allure-results -c -o allure-report'

                        archiveArtifacts artifacts: 'allure-report/**'
                    }
                }
            }
        }
    }
}
