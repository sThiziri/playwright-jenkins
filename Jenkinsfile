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
                sh 'npx playwright test --reporter=dot,junit'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
