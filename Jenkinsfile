pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.54.2-jammy'
            args '-u root'
        }
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install' 
            }
        }
        stage('Install Allure') {
            steps {
                sh 'apt-get update && apt-get install -y unzip wget'
                sh 'wget https://repo1.maven.org/maven2/io/qameta/allure/allure-commandline/2.34.1/allure-commandline-2.34.1.zip -O allure.zip'
                sh 'unzip allure.zip -d /usr/local/'
                sh 'ln -s /usr/local/allure-2.34.1/bin/allure /usr/bin/allure'
            }
        }
        stage('E2E Tests') {
            steps {
                //sh 'npx playwright test --reporter=html'
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }
    }
    post {
        always {
            sh 'allure generate allure-results -c -o allure-report'
            archiveArtifacts artifacts: 'allure-report/**'
            //junit 'playwright-report/results.xml' // Jenkins lit les résultats JUnit
        }
    }
}
