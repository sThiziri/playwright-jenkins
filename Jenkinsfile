pipeline {
    agent any

    stages {
        stage('E2E Tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.54.2-jammy'
                    args '-u root'
                }
            }
            steps {
                script {
                    // Installer les dépendances Node et Playwright
                    sh 'npm ci'
                    sh 'npx playwright install'

                    // Installer Allure
                    sh 'apt-get update && apt-get install -y unzip wget'
                    sh 'wget https://repo1.maven.org/maven2/io/qameta/allure/allure-commandline/2.34.1/allure-commandline-2.34.1.zip -O allure.zip'
                    sh 'unzip allure.zip -d /usr/local/'
                    sh 'ln -s /usr/local/allure-2.34.1/bin/allure /usr/bin/allure'

                    // Lancer les tests avec le reporter Allure
                    sh 'npx playwright test --reporter=line,allure-playwright'
                    
                    // Stash les résultats pour le post
                    stash name: 'allure-results', includes: 'allure-results/**'
                }
            }
        }
    }

    post {
        always {
            script {
                // Unstash les résultats Allure
                unstash 'allure-results'

                // Générer le rapport Allure
                sh 'allure generate allure-results -c -o allure-report'

                // Archiver le rapport
                archiveArtifacts artifacts: 'allure-report/**'
            }
        }
    }
}
