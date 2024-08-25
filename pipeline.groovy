pipeline {
    agent any

    triggers {
        // ใช้ GitHub webhook แทน polling
        githubPush()
    }

    stages {
        stage('Continuous Deployment') {
            steps {
                script {
                    try {
                        // Checkout Code
                        git branch: 'master', url: 'https://github.com/kasidit-wansudon/Nest-Backend-POS.git'
                        bat 'git branch --set-upstream-to=origin/master master'
                        bat 'git pull'

                        // Build and deploy application
                        echo "Building and starting the application..."
                        bat 'pnpm install'
                        bat 'pnpm run build'  // สร้างโปรเจกต์ก่อนรัน production

                        // Stop any existing pm2 process with the same name
                        bat 'pm2 stop my-app || exit 0'
                        bat 'pm2 delete my-app || exit 0'

                        // Start the application using pm2 in background
                        bat 'pm2 start dist/main.js --name "my-app"'

                    } catch (Exception e) {
                        echo "Error during deployment: ${e.message}"
                        try {
                            // Redeploy in case of error
                            bat 'git reset --hard HEAD^'
                            bat 'git pull'
                            bat 'pm2 stop my-app || exit 0'
                            bat 'pm2 delete my-app || exit 0'
                            bat 'pnpm install'
                            bat 'pnpm run build'
                            bat 'pm2 start dist/main.js --name "my-app"'
                        } catch (Exception ex) {
                            echo "Reverting to previous commit due to error: ${ex.message}"
                            bat 'git reset --hard HEAD^'
                            bat 'pnpm run build'
                            bat 'pm2 start dist/main.js --name "my-app"'
                        }
                    }
                }
            }
        }
    }
}
