module.exports = {
  apps : [{
    name: "todolist",
    script: './backend-api/server.js',
    watch: false,
    force: true,
    env: {
      PORT: 3001,
      NODE_ENV: "production",
      MONGODB_URL: "mongodb+srv://nodejs_user:nodePassw0rd@cluster0.bt5up.mongodb.net/todolistDB",
      REACT_APP_API_ENDPOINT: "/"
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
