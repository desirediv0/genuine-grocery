module.exports = {
  apps: [
    {
      name: 'grocery-client',
      cwd: '/root/genuine-grocery/client',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3010,
        NODE_ENV: 'production'
      },
      error_file: "/root/.pm2/logs/grocery-client-error.log",
      out_file: "/root/.pm2/logs/grocery-client-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      max_memory_restart: "500M"
    },
    {
      name: 'grocery-admin',
      cwd: '/root/genuine-grocery/front',
      script: 'npm',
      args: 'run preview',
      env: {
        PORT: 4183,
        NODE_ENV: 'production',
        HOST: '0.0.0.0'
      },
      error_file: "/root/.pm2/logs/grocery-admin-error.log",
      out_file: "/root/.pm2/logs/grocery-admin-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      max_memory_restart: "500M"
    },
    {
      name: 'grocery-server',
      cwd: '/root/genuine-grocery/server',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 4010,
        NODE_ENV: 'production'
      },
      error_file: "/root/.pm2/logs/grocery-server-error.log",
      out_file: "/root/.pm2/logs/grocery-server-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      max_memory_restart: "500M"
    },
  ]
};