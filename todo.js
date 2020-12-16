var list = document.getElementById("list");

firebase.database().ref('todo-items').on('child_added',function(data){
    // Create li tag with text node
    var li = document.createElement('li');
    var liText = document.createTextNode(data.val().value);
    li.appendChild(liText);

    // Create delete button
    var delBtn = document.createElement('button');
    var delText = document.createTextNode("DELETE");
    delBtn.setAttribute("class", "delete");
    delBtn.setAttribute("id", data.val().key);
    delBtn.setAttribute("onclick", "deleteItem(this)");
    delBtn.appendChild(delText);
    li.appendChild(delBtn);
    
    // Create edit button
    var editBtn = document.createElement('button');
    var editText = document.createTextNode("EDIT");
    editBtn.setAttribute("class", "edit");
    editBtn.setAttribute("id", data.val().key);
    editBtn.setAttribute("onclick", "editItem(this)");
    editBtn.appendChild(editText);
    li.appendChild(editBtn);
    
    list.appendChild(li);
})

function addItems(){
    var todo_item = document.getElementById("userInput");

    if (todo_item.value == "") {
        alert("Enter some text..");
    }

    else{

        var database = firebase.database().ref('todo-items');
        var key = database.push().key;
        var todo = {
            value: todo_item.value,
            key: key
        };
        database.child(key).set(todo);

        
        todo_item.value = "";
    }
} 
    
function deleteItem(e){
    firebase.database().ref('todo-items').child(e.id).remove();
    e.parentNode.remove();
}

function editItem(e){
    var editValue = prompt("Enter the edit value", e.parentNode.firstChild.nodeValue);
    var editTodos = {
        value: editValue,
        key: e.id
    }
    firebase.database().ref('todo-items').child(e.id).set(editTodos);
    e.parentNode.firstChild.nodeValue = editValue;
}
