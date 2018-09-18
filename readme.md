# 验证码按钮
## 使用方式（Usage）
### 安装（Install）
``
npm install optimat-vue-verify-code-button -save
``

### 导入（Import）
#### *.js
```javascript
import VerifyCodeButton from 'optimat-vue-verify-code-button'
```
#### *.vue
```vue
<script>
    import VerifyCodeButton from 'optimat-vue-verify-code-button'
</script>
```
### 标签（Target）
#### *vue
```html
<VerifyCodeButton :options="verifyCodeButtonOptions"></VerifyCodeButton>
```

### 功能（Api）

| Options         | Type     | Description                 | Default | Result   |
|-----------------|:--------:|:---------------------------:|:--------:|:--------:|
| status  | number | 按钮状态，0 等待，1 倒数中，2 被锁 | 0 | |
| delay  | number | 倒计时长，最少60 | 60 | |
| hint  | string | 等待状态下显示的内容 | 获取验证码 | |
| autoChangeStatus  | boolean | 是否自动变更状态 | true | |
| backgroundColor  | string | 按钮背景颜色（HEX） | #00AAEE | |
| textColor  | string | 按钮文本颜色（HEX） | #FFFFFF | |
| onStatusChanged  | function | 状态变更时执行 | undefined | (status) |
| onSubmit  | function | 点击时执行 | undefined | (status, counting) |
| onStartCounting  | function | 开始倒数时执行 | undefined | |
| onStopCounting  | function | 停止倒数时执行 | undefined | |
| onCounting  | function | 倒数时执行 | undefined | (counting) |