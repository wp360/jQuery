;(function(){
    'use strict';
    // alert('111');
    // store.set('user','bob');
    // var user = store.get('user');
    // console.log(user);
    var $form_add_task = $('.add-task');
    var task_list = [];
    var $delete_task;

    init();

    $form_add_task.on('submit', on_add_task_form_submit);

    // 提交按钮事件
    function on_add_task_form_submit(e){
        // 禁用默认行为
        e.preventDefault();
        // 获取新task的值
        var new_task = {};
        var $input = $(this).find('input[name=content]');
        new_task.content = $input.val();
        // 如果新task的值为空 则直接返回 否则继续执行
        if (!new_task.content) return;
        // 存入新task
        if (add_task(new_task)) {
            // render_task_list();
            $input.val(null);
        }
        // console.log('new_task',new_task);
    }

    function add_task(new_task) {
        // 将新task推入task_list
        task_list.push(new_task);
        // 更新localStorage
        // store.set('task_list',task_list);
        refresh_task_list();
        return true;
        // console.log('task_list', task_list);
    }

    // 刷新localStorage数据并渲染模板
    function refresh_task_list(){
        store.set('task_list', task_list);
        render_task_list();
    }

    // 渲染任务列表
    function render_task_list(){
        // console.log('1',1);
        var $task_list = $('.task-list');
        // 清空
        $task_list.html('');
        for(var i=0;i<task_list.length;i++){
            var $task = render_task_item(task_list[i],i);
            $task_list.append($task);
        }
        $delete_task = $('.action.delete');
        listen_task_detele();
    }

    // 渲染单条task模板
    function render_task_item(data,index){
        if(!data || !index) return;
        // 任务模板
        var list_item_tpl =
            '<div class="task-item" data-index="' + index + '">' +
            '<span><input type="checkbox" name="" id=""></span>' +
            '<span class="task-content">' + data.content + '</span>' +
            '<span class="fr">' +
            '<span class="action delete">删除</span>' +
            '<span class="action">详情</span>' +
            '</span>' +
            '</div>';
        return $(list_item_tpl);
    }

    // 删除任务
    function delete_task(index){
        // 如果没有index 或者index不存在 则直接返回
        if (index===undefined || !task_list[index]) return;
        delete task_list[index];
        // 更新localStorage
        refresh_task_list();
    }

    // 监听点击删除按钮操作
    function listen_task_detele(){
        $delete_task.on('click', function () {
            var $this = $(this);
            // 找到删除按钮所在的task元素
            var $item = $this.parent().parent();
            var index = $item.data('index');
            delete_task(index);
            // 确认删除
            var tmp = confirm('确定删除？');
            tmp ? delete_task(index) : null;
            // console.log('index', $item.data('index'));
        });
    }

    // 初始化
    function init(){
        task_list = store.get('task_list') || [];
        if(task_list.length) {
            render_task_list();
        }
    }
})();