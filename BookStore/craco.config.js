const path = require('path')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    plugins: [
      {
        plugin: cracoAlias,
        option: {
          source: 'tsconfig',
          baseUrl: '.',
          tsConfigPath: 'tsconfig.paths.json',
          debug: false
        }
      },
      new AntdDayjsWebpackPlugin()
    ]
  }
}
