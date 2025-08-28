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
        stage('E2E Tests') {
            steps {
                //sh 'npx playwright test --reporter=html'
                sh 'npx playwright test'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            junit 'playwright-report/results.xml' // Jenkins lit les résultats JUnit
        }
    }
}
