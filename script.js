function getcom() {
    var todos1 = new Array;
    var str = localStorage.getItem('comp');
    if (str !== null) {
        todos1 = JSON.parse(str); 
    }
    return todos1;
}


function comlist(x) {
    var id = x.currentTarget.id;
    var todos1 = get();
    var list=todos1.splice(id, 1);
    var todos_str = localStorage.getItem('comp');
    if (todos_str !== null) {
       var lli = JSON.parse(todos_str); 
    }
    else{
        var lli=[];
    }
   list[0].checked="done";
   var date = new Date();
   var timestamp = date.getTime();
   list[0].finished=timestamp;
    lli.push(list);
    localStorage.setItem('comp', JSON.stringify(lli));

    var todos = get();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();
 
    return false;
}

function get() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos;
}


function add() {
    if(JSON.parse(localStorage.getItem('comp'))!=null){
        var id=JSON.parse(localStorage.getItem('comp')).length;}
        else{
            var id=0;
        }
    var task={};
     task['name'] = document.getElementById('todo1').value;
     task['id']=id;
     id++;
     var date = new Date();
     var timestamp = date.getTime();
     task['checked']="to do";
     task['created']=timestamp;
     task['finished']=0;
    var todos = get();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));
    document.getElementById('todo1').value="";
    show();
 
    return false;
}
 
function remove(x) {
    var id = x.currentTarget.id;
    var todos = get();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
 
    show();
 
    return false;
}
var source;
function dragStarted(evt){
    source=evt.target;
    evt.dataTransfer.setData("text/plain", evt.target.innerHTML);
    evt.dataTransfer.effectAllowed = "move";
    }

    function draggingOver(evt){
        evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
        }

    function dropped(evt){
        
        evt.preventDefault();
        evt.stopPropagation();
        source.innerHTML = evt.target.innerHTML;
        evt.target.innerHTML = evt.dataTransfer.getData("text/plain");
        }
function show() {
    var todos = get();

    var comlist1=getcom();
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li draggable="true" ondragover="draggingOver(event)" ondrop="dropped(event)" ondragstart="dragStarted(event)"  style="list-style-type:none;background-color:rgb(255, 218, 6);">' + todos[i].name + '<button class="remove" onClick="remove(event)" style="background-color: rgb(99, 216, 103);margin-left:140px" id="' + i  + '">clear</button>';
        html += '<button class="done" onClick="comlist(event)" style="background-color:#fa3e4e;" id="' + i  + '">done</button></li>'
    };
    html += '</ul>';
 
     
  var html1 = '<ul>';
  for(i=0; i<comlist1.length; i++) {
      html1 += '<li style="list-style-type:none;"> <strike>' + comlist1[i][0].name + '</strike></li>';
      };
  html1 += '</ul>';

  document.getElementById('todos').innerHTML = html;
  document.getElementById('done12').innerHTML = html1;

   
     
}
 
document.getElementById('add').addEventListener('click', add);
show();