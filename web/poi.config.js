module.exports = options => ({
  entry: './src/index.js',
  staticFolder: 'public',
  html: {
    template: './src/index.html'
  },
  env: {
    API_URL: options.mode === 'production' ? 'https://hongbao.xxooweb.com' : 'http://localhost:3007'
  }
})
