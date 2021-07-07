$(()=>{
    console.log("Welcome to TodoList");
    
    let todoList = $('#todo-list');
    let addbtn = $('#addbutton');
    let inputText = $('#input');

    getData();

    addbtn.click(()=>{
        let text = inputText.val().trim();
        if(text!==""){
            $.ajax({
                method:'POST',
                url:'/todos',
                data:{title:text}
            }).done(getData);
        }
    });

});



function getData(){
    let todos = $.ajax({
        method:'GET',
        url: "/todos"

    }).done(showTodos);
}

function showTodos(todos){
    console.log(todos);
    $('#todo-list').empty();
    for(let task of todos){
        let item;
        if(task.done===false)
            item = $(`<li class="item" ><span class="text" onclick="updateDone('${task._id}','${task.done}')"> ${task.title}</span> <span class="textedit" onclick="updateText('${task._id}','${task.title}')" > &#9998;</span> <span class="delete" onclick="remove('${task._id}')" > &#128465; </span></li>`);
        else
            item = $(`<li class="item" ><span class="textdone" onclick="updateDone('${task._id}','${task.done}')" > ${task.title}</span> <span class="textedit" onclick="updateText('${task._id}','${task.title}')" > &#9998;</span> <span class="delete" onclick="remove('${task._id}')"> &#128465; </span></li>`);
        $('#todo-list').append(item);
    }
}

function updateDone(id,done){
    console.log(id);
    let change;
    if(done=='false')
        done = true;
    else 
        done = false;
    $.ajax({
        method:"PUT",
        url: 'todos/'+id,
        data:{done:done}
    }).done(()=>{
        console.log("Updated");
        getData();
    });
}

function updateText(id,title){
    let text = prompt("Enter the updated title",title);
    console.log(text);
    if(text.length!==0){
        $.ajax({
            method:'PUT',
            url:'/todos/'+id,
            data:{title:text}
        }).done(getData);
    }
    else{
        console.log("String not entered");
    }
}

function remove(id){
    $.ajax({
        method:"DELETE",
        url: 'todos/'+id
    }).done(()=>{
        console.log("Deleted");
        getData();
    });
}

