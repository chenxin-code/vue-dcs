module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    // 检测当前的组件名称是否使用驼峰或多单词命名
    'vue/multi-word-component-names': 'off',
    // 强制执行一致的缩进
    'indent': ['off', 'tab'],
    // 强制执行一致的换行样式
    'linebreak-style': ['warn', 'windows'],
    // 强制一致使用反引号、双引号或单引号
    'quotes': ['warn', 'single'],
    // 强制执行最大行长度
    'max-len': ['warn', { 'code': 120 }],
    // 要求使用 === 和 !==
    'eqeqeq': ['warn', 'allow-null'],
    // 在逗号前后强制执行一致的间距
    'comma-spacing': ['warn', { 'before': false, 'after': true }],
    // 禁止未使用的变量
    'no-unused-vars': 'off',
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 'warn',
    // 禁止不必要的分号
    'no-extra-semi': 'warn',
    // 要求或禁止使用分号而不是 ASI
    'semi': ['warn', 'always'],
    // 禁止在条件中使用常量表达式
    'no-constant-condition': 'warn',
    // 禁止使用 debugger
    'no-debugger': 'off',
    // 在注释中的 // 或 /* 之后强制执行一致的间距
    'spaced-comment': ['warn', 'always'],
    // 在大括号内强制执行一致的间距
    'object-curly-spacing': ['warn', 'never', {objectsInObjects: true}],
    // 在数组括号内强制执行一致的间距
    'array-bracket-spacing': ['warn', 'never'],
    // 为块强制执行一致的大括号样式
    'brace-style': ['warn', '1tbs', {allowSingleLine: true}],
  }
}
