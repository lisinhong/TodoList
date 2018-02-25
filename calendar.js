Vue.component('day', {
	template: '#day',
	props: ['day', 'i', 'todo', 'todo_list'],
	mounted() {
		vm.trigger_month();
		this.current_date();
	},
	methods: {
		new_todo(id) {
			$('.add_todo').css('display','none');
			$('#todo_'+id).css('display','block');
		},
		close_add_todo(id) {
			$('#todo_'+id).css('display','none');
		},
		add_todo(id) {	
			vm.todo_list.push({
				'title': this.todo,
				'day': id
			})
			$('#todo_'+id).css('display','none');
		},
		todo_flag(todo, id) {
			return todo.day==id && todo.title!=null;
		},
		check(d_id, t_id) {
			$('#check_'+d_id+'_'+t_id+' .fa-check').fadeToggle('fast');
		},
		delete_todo(id) {
			console.log(vm.todo_list[id]['title']);
			vm.todo_list[id]['title'] = null;
		},
		current_date() {
			var one_day = 24*60*60*1000; // hours*minutes*seconds*milliseconds
			var first_date = new Date(2017,0,1);
			var now = new Date();
			var diff_days = Math.round(Math.abs((first_date.getTime() - now.getTime())/(one_day))) - 1;
			$('#day_'+ diff_days).css('background-color', '#FEDFC2');
		}
	}
});

var vm = new Vue({
	el: '#app',
	data: {
		weekdays: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
		days: [],
		todo_list: [],
		todo: '',
		current_month: 6,
		month: {
		1:{
			'start_week': 1,
			'end_week': 5,
			'days': 31,
			'start_day': 0
		},
		2:{
			'start_week': 5,
			'end_week': 9,
			'days': 28,
			'start_day': 31
		},
		3:{
			'start_week': 9,
			'end_week': 13,
			'days': 31,
			'start_day': 59
		},
		4:{
			'start_week': 13,
			'end_week': 18,
			'days': 30,
			'start_day': 90
		},
		5:{
			'start_week': 18,
			'end_week': 22,
			'days': 31,
			'start_day': 120
		},
		6:{
			'start_week': 22,
			'end_week': 26,
			'days': 30,
			'start_day': 151
		},
		7:{
			'start_week': 26,
			'end_week': 31,
			'days': 31,
			'start_day': 181
		},
		8:{
			'start_week': 31,
			'end_week': 35,
			'days': 31,
			'start_day': 212
		},
		9:{
			'start_week': 35,
			'end_week': 39,
			'days': 30,
			'start_day': 243
		},
		10:{
			'start_week': 40,
			'end_week': 44,
			'days': 31,
			'start_day': 273
		},
		11:{
			'start_week': 44,
			'end_week': 48,
			'days': 30,
			'start_day': 304
		},
		12:{
			'start_week': 48,
			'end_week': 53,
			'days': 31,
			'start_day': 334
		},
		13:{
			'start_week': 53,
			'end_week': 53,
			'days': 6,
			'start_day': 365
		}
		}
	},
	mounted() {
		for(var j=1; j<=13; j++) {
			for(var i=1; i<=this.month[j].days; i++) {
				if(i==1) {
					if(j==13) this.days.push('2018年1月'+i);
					else this.days.push(j+'月'+i);
				}
				else this.days.push(i);
			}
		}
	},
	methods: {
		trigger_month() {
			var cm = this.current_month;
			var m = this.month;
			$('.day').addClass('hide');
			$('.day h5').css('color', '#B6B6B6');

			for(var i=m[cm].start_week; i<=m[cm].end_week; i++) {
				$('.week_'+i).removeClass('hide');
			}
			for(var i=m[cm].start_day; i<m[cm+1].start_day; i++) {
				$('#day_'+i+' h5').css('color', '#333');
			}
		},
		prev_month() {
			this.current_month --;
		},
		next_month() {
			this.current_month ++;
		}
	},
	watch: {
		current_month: function() {
			if(this.current_month>12) this.current_month=12;
			else if(this.current_month<1) this.current_month=1;
			this.trigger_month();
		}
	}
});