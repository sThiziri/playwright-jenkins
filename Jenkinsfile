pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:latest' } }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'npm ci'
            sh 'npx playwright test'
         }
      }
   }
}