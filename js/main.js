$(function(){
	var $list = $('#todo-list');
	var tmp = ''
	for(content in window.localStorage) {
		var check = window.localStorage[content] == 'completed' ? 'checked' : '';
		tmp += '<li class="' + window.localStorage[content] +'"><div class="view"><input class="toggle" type="checkbox" ' + check  + '><label>' + content + '</label><input class="edit" value=""><button class="destroy"></button></div>';
	}
	$list.html(tmp+$list.html());
	
	update();
});

function update() { 
	var lists = document.getElementById('todo-list');
	var list = lists.getElementsByTagName('li');
	var count = 0;
	for(var i = 0; i < list.length; i++){
		if (list[i].className != 'completed' && list[i].innerHTML.indexOf('div') > 0){
			count++;
		}
	}
　　document.getElementById('count').innerText = count;
};

$('#new-todo').bind('keydown', function(event) {
	if (event.keyCode == "13") {
		add();
	}
});

$(document).on('keydown', '.edit', function(e){
	if (event.keyCode == "13") {
		$(e.target).css('display','none');
		$(e.target).prev()[0].innerText = $(e.target)[0].value;
		$(e.target).prev().css('display','block');
	}
})

$(document).on('dblclick', 'li', function(e){
	$(e.target).css('display','none');
	$(e.target).next().css('display','block');
	$(e.target).next().val($(e.target)[0].innerText);
	$(e.target).next().focus();
})

$(document).on('blur', '.edit', function(e){
	$(e.target).css('display','none');
	$(e.target).prev().css('display','block');
})

$(document).on('click', '.destroy', function(e){
	$(e.target).parent().remove();
	$(e.target).parent().parent().addClass('completed');
	update();
	window.localStorage.removeItem($(e.target).prev().prev()[0].innerText);
})

$(document).on('click', '.toggle', function(e){
	if(e.target.checked) {
		$(e.target).parent().css('text-decoration', 'line-through');
		$(e.target).parent().parent().addClass('completed');
		window.localStorage.setItem($(e.target).next()[0].innerText, 'completed');
	} else {
		$(e.target).parent().css('text-decoration', '');
		$(e.target).parent().parent().removeClass('completed');
		window.localStorage.setItem($(e.target).next()[0].innerText, 'active');
	}
	update();
})

$(document).on('click', '#all', function(e){
	set_filter_active('all');
	var lists = document.getElementById('todo-list');
	var list = lists.getElementsByTagName('li');
	for(var i = 0; i < list.length; i++){
		list[i].style.display = 'list-item';
	}
})

$(document).on('click', '#active', function(e){
	set_filter_active('active');
	var lists = document.getElementById('todo-list');
	var list = lists.getElementsByTagName('li');
	for(var i = 0; i < list.length; i++){
		if (list[i].className != 'completed'){
			list[i].style.display = 'list-item';
		} else {
			list[i].style.display = 'none';
		}
	}
})

$(document).on('click', '#completed', function(e){
	set_filter_active('completed');
	var lists = document.getElementById('todo-list');
	var list = lists.getElementsByTagName('li');
	for(var i = 0; i < list.length; i++){
		if (list[i].className == 'completed'){
			list[i].style.display = 'list-item';
		} else {
			list[i].style.display = 'none';
		}
	}
})

function set_filter_active(id) {
	var tmp = document.getElementsByClassName('filters')[0].children;
	for(var i =0; i < tmp.length; i++) {
		if(tmp[i].firstElementChild.id == id){
			tmp[i].firstElementChild.className = 'selected';
		} else {
			tmp[i].firstElementChild.className = '';
		}
	}
}

function clearCompleted() {
	var lists = document.getElementById('todo-list');
	var list = lists.getElementsByTagName('li');
	for(var i = 0; i < list.length; i++){
		if (list[i].className == 'completed'){
			window.localStorage.removeItem(list[i].children[0].children[1].innerText);
			list[i].remove();
			i--;
		}
	}
}

function add() {
	update();
	var $list = $('#todo-list');
	var value = $('#new-todo').val();
	$list.html('<li><div class="view"><input class="toggle" type="checkbox"><label>' + value + '</label><input class="edit" value=""><button class="destroy"></button></div>' + $list.html());
	window.localStorage.setItem(value,'active');
}
