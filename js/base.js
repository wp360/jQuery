;(function(){
    'use strict';
    // alert('111');
    // store.set('user','bob');
    // var user = store.get('user');
    // console.log(user);
    var $form_add_task = $('.add-task');
    var task_list = [];
    var $task_delete;
    var $task_detail = $('.task-detail');
    var $task_detail_trigger;
    var $task_detail_mask = $('.task-detail-mask');
    var current_index;
    var $update_form;
    var $task_detail_content;
    var $task_detail_content_input;

    init();

    $form_add_task.on('submit', on_add_task_form_submit);
    $task_detail_mask.on('click', hide_task_detail);

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

    // 渲染单条task模板
    function render_task_item(data, index) {
        // !data || !index
        if (!data) return;
        // console.log(index)
        // 任务模板
        var list_item_tpl =
            '<div class="task-item" data-index="' + index + '">' +
            '<span><input type="checkbox" name="" id=""></span>' +
            '<span class="task-content">' + data.content + '</span>' +
            '<span class="fr">' +
            '<span class="action delete">删除</span>' +
            '<span class="action detail">详情</span>' +
            '</span>' +
            '</div>';
        return $(list_item_tpl);
    }

    // 渲染任务列表
    function render_task_list(){
        // console.log('1',1);
        var $task_list = $('.task-list');
        // 清空
        $task_list.html('');
        for(var i=0;i<task_list.length;i++){
            var $task = render_task_item(task_list[i],i);
            // $task_list.prepend($task);
            $task_list.append($task);
        }
        $task_delete = $('.action.delete');
        $task_detail_trigger = $('.action.detail');
        listen_task_detele();
        listen_task_detail();
    }

    // 删除任务
    function task_delete(index){
        // 如果没有index 或者index不存在 则直接返回
        if (index===undefined || !task_list[index]) return;
        delete task_list[index];
        // 更新localStorage
        refresh_task_list();
    }

    // 监听点击删除按钮操作
    function listen_task_detele(){
        $task_delete.on('click', function () {
            var $this = $(this);
            // 找到删除按钮所在的task元素
            var $item = $this.parent().parent();
            var index = $item.data('index');
            task_delete(index);
            // 确认删除
            var tmp = confirm('确定删除？');
            tmp ? task_delete(index) : null;
            // console.log('index', $item.data('index'));
        });
    }

    // 任务详情
    function listen_task_detail(){
        $task_detail_trigger.on('click', function () {
            var $this = $(this);
            // 找到详情按钮所在的task元素
            var $item = $this.parent().parent();
            var index = $item.data('index');
            // console.log('index',index);
            show_task_detail(index);
        });
    }

    // 显示详情
    function show_task_detail(index){
        render_task_detail(index);
        current_index = index;
        $task_detail.show();
        $task_detail_mask.show();
    }

    // 隐藏详情
    function hide_task_detail() {
        $task_detail.hide();
        $task_detail_mask.hide();
    }

    // 渲染指定Task的详细信息
    function render_task_detail(index){
        if(index === undefined || !task_list[index]) return;
        var item = task_list[index];
        var tpl = '<form>' +
            '<div class="content">'+
            item.content +
            '</div>' +
            '<div class="input-item"><input type="text" class="hide" name="content" value="' + (item.content || '') + '"></div>' +
            '<div>' +
            '<div class="desc input-item"">' +
            '<textarea name="desc">' + (item.desc || '') + '</textarea>' +
            '</div>' +
            '</div>' +
            '<div class="remind input-item"">' +
            '<input name="remind_date" type="date" value="' + item.remind_date + '">' +
            '</div>' +
            '<div class="input-item"><button type="submit">更新</button></div>' +
            '</form>';
        $task_detail.html(null);
        $task_detail.html(tpl);
        $update_form = $task_detail.find('form');
        // console.log($update_form);
        $task_detail_content = $update_form.find('.content');
        $task_detail_content_input = $update_form.find('[name=content]');

        // 双击标题显示input框编辑
        $task_detail_content.on('dblclick',function(){
            $task_detail_content_input.show();
            $task_detail_content.hide();
        });

        $update_form.on('submit',function(e){
            e.preventDefault();
            var data = {};
            data.content = $(this).find('[name=content]').val();
            data.desc = $(this).find('[name=desc]').val();
            data.remind_date = $(this).find('[name=remind_date]').val();
            // console.log(data);
            update_task(index,data);
            hide_task_detail();
        });
    }

    // 更新任务
    function update_task(index,data){
        // !index || !task_list[index]
        if(!task_list[index]) return;
        task_list[index] = data;
        // task_list[index] = $.merge({},task_list[index],data);
        // console.log(store.get('task_list'));
        refresh_task_list();
    }

    // 初始化
    function init(){
        task_list = store.get('task_list') || [];
        if(task_list.length) {
            render_task_list();
        }
    }
})();