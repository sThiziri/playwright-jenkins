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
                    // Installer Node.js dependencies et Playwright
                    sh 'npm ci'
                    sh 'npx playwright install'

                    // Installer Java (nécessaire pour Allure)
                    sh 'apt-get update && apt-get install -y default-jre'
                    sh 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64'
                    sh 'export PATH=$JAVA_HOME/bin:$PATH'

                    // Installer Allure CLI
                    sh 'apt-get install -y unzip wget'
                    sh 'wget https://repo1.maven.org/maven2/io/qameta/allure/allure-commandline/2.34.1/allure-commandline-2.34.1.zip -O /tmp/allure.zip'
                    sh 'unzip /tmp/allure.zip -d /usr/local/'
                    sh 'ln -s /usr/local/allure-2.34.1/bin/allure /usr/bin/allure'

                    // Lancer les tests avec le reporter Allure
                    sh 'npx playwright test --reporter=line,allure-playwright'

                    // Fixer les permissions pour que Jenkins puisse unstash
                    sh 'chown -R 1000:1000 allure-results'
                    sh 'chmod -R 755 allure-results'

                    sh 'chown -R 1000:1000 allure-report'
                    sh 'chmod -R 755 allure-report'

                    // Stash les résultats pour le post
                    stash name: 'allure-results', includes: 'allure-results/**'
                }
            }

            post {
                always {
                    script {
                        // Unstash les résultats Allure
                        unstash 'allure-results'

                        // Assurer que Java est disponible dans le post
                        sh 'export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64'
                        sh 'export PATH=$JAVA_HOME/bin:$PATH'

                        // Générer le rapport Allure
                        sh 'allure generate allure-results -c -o allure-report'

                        // Archiver le rapport pour Jenkins
                        archiveArtifacts artifacts: 'allure-report/**'
                    }
                }
            }
        }
    }
}
