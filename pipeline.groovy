pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Get Git') {
            steps {
                script {
                    // Checkout Code
                    git branch: 'master', url: 'https://github.com/kasidit-wansudon/Nest-Backend-POS.git'
                    bat 'git branch --set-upstream-to=origin/master master'
                    bat 'git pull'
                }
            }
        }
        stage('Continuous Deployment') {
            steps {
                script {
                    def attempt = 0
                    def maxAttempts = 2
                    def deploymentSuccess = false

                    while (attempt < maxAttempts && !deploymentSuccess) {
                        try {
                            // Build and deploy application
                            echo "Building and starting the application..."
                            bat 'pnpm install'
                            bat 'pnpm run build'  // สร้างโปรเจกต์ก่อนรัน production

                            // Stop any existing pm2 process with the same name
                            bat 'pm2 stop my-app || exit 0'
                            bat 'pm2 delete my-app || exit 0'

                            // Start the application using pm2 in background
                            bat 'pm2 start dist/main.js --name "my-app"'

                            // Wait for the application to start up
                            sleep(time: 5, unit: 'SECONDS')

                            // Perform HTTP health check
                            def response = bat(script: 'powershell -Command "(Invoke-WebRequest -Uri http://localhost:3000/ -UseBasicParsing).StatusCode"', returnStdout: true).trim()
                            echo "HTTP Status Code: ${response}"

                            if (response.contains('200')) {
                                echo "Application is healthy. Deployment successful."
                                deploymentSuccess = true
                            } else {
                                error "Application health check failed."
                            }
                        } catch (Exception e) {
                            bat 'pm2 stop my-app || exit 0'
                            bat 'pm2 delete my-app || exit 0'
                            echo "Error during deployment: ${e.message}"
                            bat 'pm2 status'
                            attempt++
                            if (attempt < maxAttempts) {
                                echo "Reverting to previous commit and retrying..."
                                bat 'git reset --hard HEAD~1'
                            } else {
                                echo "Final attempt failed. Reverting again and finishing process."
                                bat 'git reset --hard HEAD~1'
                                
                                bat 'pnpm install'
                                bat 'pnpm run build'
                                bat 'pm2 start dist/main.js --name "my-app"'
                            }
                        }
                    }

                    if (!deploymentSuccess) {
                        error "Deployment failed after ${maxAttempts} attempts."
                    }
                }
            }
        }
    }
}
