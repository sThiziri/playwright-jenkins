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

                    sh 'apt-get update && apt-get install -y unzip wget'
                    sh 'wget https://repo1.maven.org/maven2/io/qameta/allure/allure-commandline/2.34.1/allure-commandline-2.34.1.zip -O allure.zip'
                    sh 'unzip allure.zip -d /usr/local/'
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
                        sh 'allure generate allure-results -c -o allure-report'
                        archiveArtifacts artifacts: 'allure-report/**'
                    }
                }
            }
        }
    }
}
