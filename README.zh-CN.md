# Foldinto 便签排布引擎

[English](README.md)

这是从 [Foldinto](https://foldinto.com/) 提取的一个小型 JavaScript 排布模块。Foldinto 帮助你收藏并回看想保留的灵感、文章、视频等内容。

模块用于计算便签坐标、拖动边界、重叠和瀑布流排布。这个仓库**不是完整的 Foldinto 网站**：它不包含界面、账号、同步、后台或部署配置，也不能单独作为完整应用部署。

## 运行测试

```sh
node --test test-board.cjs
```

测试使用 Node.js 内置模块。本次已在 Node.js v24.15.0 下验证；其他版本尚未验证。

## 工作方式

模块在浏览器中提供 `LaterBoard` 全局对象，并支持 CommonJS 导出。`geometry`、`point`、`constrain` 和 `dragPoint` 用于计算位置；`groups` 用于识别重叠；`compact` 和 `masonry` 用于计算布局。`add`、`move` 和 `drift` 会修改调用方传入的位置对象。模块本身不负责保存位置或渲染界面，这些由应用处理。

## 参与共创

提交 Pull Request 前请阅读[贡献指南](CONTRIBUTING.md)。维护者会审核贡献并决定是否合并。产品讨论和反馈请访问 [Foldinto 社区](https://github.com/foldinto/community)。

## 许可证与署名

本仓库文件采用 [MIT 许可证](LICENSE)。MIT 允许商业使用和再分发；分发软件副本或其中实质部分时，需要保留版权和许可声明。MIT 不要求在产品首页展示署名；欢迎自愿附上项目链接。

软件许可证不授予 Foldinto 名称与视觉标识的商标使用权。
