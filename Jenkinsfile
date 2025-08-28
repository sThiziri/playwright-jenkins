pipeline {
    agent any

    stages {
        stage('E2E Tests + Allure') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.54.2-jammy'
                    args '-u root' // root pour installer tout ce dont on a besoin
                }
            }
            steps {
                script {
                    // Installer Node.js dependencies et Playwright
                    sh 'npm ci'
                    sh 'npx playwright install'

                    // Installer Java (nécessaire pour Allure)
                    sh 'apt-get update && apt-get install -y default-jre unzip wget'

                    // Définir JAVA_HOME pour la session en cours
                    env.JAVA_HOME = '/usr/lib/jvm/java-11-openjdk-amd64'
                    env.PATH = "${env.JAVA_HOME}/bin:${env.PATH}"

                    // Installer Allure CLI
                    sh '''
                        wget https://repo1.maven.org/maven2/io/qameta/allure/allure-commandline/2.34.1/allure-commandline-2.34.1.zip -O /tmp/allure.zip
                        unzip /tmp/allure.zip -d /usr/local/
                        ln -s /usr/local/allure-2.34.1/bin/allure /usr/bin/allure
                    '''

                    // Supprimer d'éventuels anciens résultats
                    sh 'rm -rf allure-results'

                    // Lancer les tests avec le reporter Allure
                    sh 'npx playwright test --reporter=line,allure-playwright'

                    // Fixer les permissions pour Jenkins
                    sh 'chown -R 1000:1000 allure-results || true'
                    sh 'chmod -R 755 allure-results || true'

                    // Stash les résultats pour le post
                    stash name: 'allure-results', includes: 'allure-results/**'
                }
            }

            post {
                always {
                    script {
                        // Unstash les résultats Allure
                        unstash 'allure-results'

                        // Générer le rapport Allure dans un dossier temporaire
                        sh '''
                            export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
                            export PATH=$JAVA_HOME/bin:$PATH
                            rm -rf /tmp/allure-report
                            allure generate allure-results -c -o /tmp/allure-report
                        '''

                        // Archiver le rapport pour Jenkins
                        archiveArtifacts artifacts: '/tmp/allure-report/**'
                    }
                }
            }
        }
    }
}
