module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        chrome: '70',
      },
    }],
    ['@babel/preset-typescript'],
  ],
}
