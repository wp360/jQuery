## 项目开发

1. 初始化 `npm init`
2. jquery安装 `npm install jquery --save`
3. 整体布局
4. 样式调整
5. base.js 操作dom
```js
;(function(){
    'use strict';
    // alert('111');
})();
```
6. store.js的使用
[参考文档：https://github.com/marcuswestin/store.js](https://github.com/marcuswestin/store.js)

7. 详情
```html
<!-- 任务详情 -->
<div class="content">
    <!-- 任务标题 -->
    下午记得买菜
</div>
<!-- 任务标题结束 -->
<div>
    <div class="desc">
        <!-- 任务描述开始-->
        <textarea name="" id=""></textarea>
    </div>
    <!-- 任务描述结束 -->
</div>
<div class="remind">
    <!-- 任务定时提醒开始 -->
    <input type="date">
    <!--<button type="submit">submit</button>-->
</div>
<!-- 任务定时提醒结束 -->
```

## 备注
[参考代码：https://github.com/auven/jqTodo](https://github.com/auven/jqTodo)