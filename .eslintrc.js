module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  rules: {
    'vue/multi-word-component-names': 'off', //关闭多层组件名
    'vue/comment-directive': 'off'
  }
}
