Vue.component('todo-list', {
    template: '#todo-list',
    props: ['todo', 'index'],
    methods: {
        isDone: function(todo) {
            todo.status = !todo.status;
        },
        editTodo: function(index) {
            $('#' + index + '.edit_todo').css('display', 'block');
            $('#' + index + '.show_todo').css('display', 'none');
        },
        finishEdit: function(index) {
            $('#' + index + '.edit_todo').css('display', 'none');
            $('#' + index + '.show_todo').css('display', 'block');
        },
        deleteTodo: function(index) {
            vm.deleteTodo(index);
        }
    }
});

var vm = new Vue({
    el: '#app',
    data: {
        todoList: [],
        title: '',
        content: '',
        status: false,
    },
    methods: {
        newTodo: function() {
            this.todoList.push({
                'title': this.title,
                'content': this.content,
                'status': this.status,
            });
            this.title = '';
            this.content = '';
        },
        clearDone: function() {
            this.todoList = this.todoList.filter(function(todo, index, output) {
                if (todo.status == false) return true;
                else return false;
            })
        },
        showAll: function() {
            $('.all').css('display', 'block').siblings().css('display', 'none');
            $('.show_all').addClass('active').siblings().removeClass('active');
        },
        showDone: function() {
            $('.done').css('display', 'block').siblings().css('display', 'none');
            $('.show_done').addClass('active').siblings().removeClass('active');
        },
        showUndone: function() {
            $('.undone').css('display', 'block').siblings().css('display', 'none');
            $('.show_undone').addClass('active').siblings().removeClass('active');
        },
        deleteTodo: function(index) {
            this.todoList.splice(index, 1);
        },
    }
})
