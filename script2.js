const Entrada = document.querySelector(".entrada");
const Botao = document.querySelector(".botao");
const todolist = document.querySelector(".to-do-list-facul");
const Filtro = document.querySelector(".filtro-tarefas");

document.addEventListener("DOMContentLoaded", getLocalTodos);
Botao.addEventListener("click", adicionar);
todolist.addEventListener("click", deleteCheck);
Filtro.addEventListener("change", filtroToDo);

function adicionar(event2){
    event2.preventDefault();
    const ToDoDiv = document.createElement("div");
    ToDoDiv.classList.add("to-do-facul");
    const novoToDo = document.createElement("li");
    novoToDo.innerText = Entrada.value;
    novoToDo.classList.add("to-do-item-facul");
    ToDoDiv.appendChild(novoToDo);

    savedLocalTodos(Entrada.value);

    const BotaoCompleto = document.createElement("button");
    BotaoCompleto.innerHTML = '<i class="fa fa-check-circle"></i>';
    BotaoCompleto.classList.add("completar-botao-facul");
    ToDoDiv.appendChild(BotaoCompleto);

    const EditarBotao = document.createElement("button");
    EditarBotao.innerHTML = '<i class="fa fa-pencil-square-o"</i>';
    EditarBotao.classList.add("editar-botao-facul");
    ToDoDiv.appendChild(EditarBotao);

    const ExcluirBotao = document.createElement("button");
    ExcluirBotao.innerHTML = '<i class="fa fa-trash"></i>';
    ExcluirBotao.classList.add("excluir-botao-facul");
    ToDoDiv.appendChild(ExcluirBotao);

    todolist.appendChild(ToDoDiv);
    Entrada.value = "";
}

function deleteCheck(event2){
    const item = event2.target;

    if(item.classList[0] === "excluir-botao-facul"){
        const todo = item.parentElement;
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitioned", function(){
            todo.remove();
        });
    }

    if(item.classList[0] === "completar-botao-facul"){
        const todo = item.parentElement;
        todo.classList.toggle("finalizada");
    }
}

function filtroToDo(event2){
    const toDos = todolist.childNodes;
    toDos.forEach(function(toDo){
        switch(event2.target.value){
            case "todos":
                toDo.style.display = "flex";
                break;
            case "finalizada":
                if(toDo.classList.contains("finalizada")){
                    toDo.style.display = "flex";
                } else{
                    toDo.style.display = "none";
                }
                break;
            case "incompletas":
                if(!toDo.classList.contains("finalizada")){
                    toDo.style.display = "flex";
                } else{
                    toDo.style.display = "none";
                }
                break;
        }
    });
}

function savedLocalTodos(Todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(Todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos(){
    let Todos;
    if(localStorage.getItem("todos") === null){
        Todos = [];
    } else{
        Todos = JSON.parse(localStorage.getItem("todos"));
    }

    Todos.forEach(function(Todo) {
        const ToDoDiv = document.createElement("div");
        ToDoDiv.classList.add("to-do-facul");
        const novoToDo = document.createElement("li");
        novoToDo.innerText = Todo;
        novoToDo.classList.add("to-do-item-facul");
        ToDoDiv.appendChild(novoToDo);

        const BotaoCompleto = document.createElement("button");
        BotaoCompleto.innerHTML = '<i class="fa fa-check-circle"></i>';
        BotaoCompleto.classList.add("completar-botao-facul");
        ToDoDiv.appendChild(BotaoCompleto);

        const EditarBotao = document.createElement("button");
        EditarBotao.innerHTML = '<i class="fa fa-pencil-square-o"</i>';
        EditarBotao.classList.add("editar-botao-facul");
        ToDoDiv.appendChild(EditarBotao);

        const ExcluirBotao = document.createElement("button");
        ExcluirBotao.innerHTML = '<i class="fa fa-trash"></i>';
        ExcluirBotao.classList.add("excluir-botao-facul");
        ToDoDiv.appendChild(ExcluirBotao);
        todolist.appendChild(ToDoDiv);
    });
}

function removeLocalTodos(Todo){
    let Todos;
    if(localStorage.getItem("todos") === null){
        Todos = [];
    } else{
        Todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = Todo.children[0].innerText;
    Todos.splice(Todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(Todos));
}