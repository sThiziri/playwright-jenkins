pipeline {
   agent {
     docker {
       image 'mcr.microsoft.com/playwright:latest'
       args '-u root'
     }
   }
   stages {
      stage('Install') {
         steps {
            sh 'npm ci'
         }
      }
      stage('E2E Tests') {
         steps {
            sh 'npx playwright test --reporter=html'
         }
      }
   }
   post {
      always {
         archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      }
   }
}
