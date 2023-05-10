const Entrada = document.querySelector(".entrada");
const Botao = document.querySelector(".botao");
const todolist = document.querySelector(".to-do-list");
const Filtro = document.querySelector(".filtro-tarefas");

document.addEventListener("DOMContentLoaded", getLocalTodos);
Botao.addEventListener("click", adicionar);
todolist.addEventListener("click", deleteCheck);
Filtro.addEventListener("change", filtroToDo);

function adicionar(event){
    event.preventDefault();
    const ToDoDiv = document.createElement("div");
    ToDoDiv.classList.add("to-do");
    const novoToDo = document.createElement("li");
    novoToDo.innerText = Entrada.value;
    novoToDo.classList.add("to-do-item");
    ToDoDiv.appendChild(novoToDo);

    savedLocalTodos(Entrada.value);

    const BotaoCompleto = document.createElement("button");
    BotaoCompleto.innerHTML = '<i class="fa fa-check-circle"></i>';
    BotaoCompleto.classList.add("completar-botao");
    ToDoDiv.appendChild(BotaoCompleto);

    const EditarBotao = document.createElement("button");
    EditarBotao.innerHTML = '<i class="fa fa-pencil-square-o"</i>';
    EditarBotao.classList.add("editar-botao");
    ToDoDiv.appendChild(EditarBotao);

    const ExcluirBotao = document.createElement("button");
    ExcluirBotao.innerHTML = '<i class="fa fa-trash"></i>';
    ExcluirBotao.classList.add("excluir-botao");
    ToDoDiv.appendChild(ExcluirBotao);

    todolist.appendChild(ToDoDiv);
    Entrada.value = "";
}

function deleteCheck(ev){
    const item = ev.target;

    if(item.classList[0] === "excluir-botao"){
        const todo = item.parentElement;
        todo.classList.add("slide");
        removeLocalTodos(todo);
        todo.addEventListener("transitioned", function(){
            todo.remove();
        });
    }

    if(item.classList[0] === "completar-botao"){
        const todo = item.parentElement;
        todo.classList.toggle("finalizada");
    }
}

function filtroToDo(e){
    const toDos = todolist.childNodes;
    toDos.forEach(function(toDo){
        switch(e.target.value){
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

function savedLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        const ToDoDiv = document.createElement("div");
        ToDoDiv.classList.add("to-do");
        const novoToDo = document.createElement("li");
        novoToDo.innerText = todo;
        novoToDo.classList.add("to-do-item");
        ToDoDiv.appendChild(novoToDo);

        const BotaoCompleto = document.createElement("button");
        BotaoCompleto.innerHTML = '<i class="fa fa-check-circle"></i>';
        BotaoCompleto.classList.add("completar-botao");
        ToDoDiv.appendChild(BotaoCompleto);

        const EditarBotao = document.createElement("button");
        EditarBotao.innerHTML = '<i class="fa fa-pencil-square-o"</i>';
        EditarBotao.classList.add("editar-botao");
        ToDoDiv.appendChild(EditarBotao);

        const ExcluirBotao = document.createElement("button");
        ExcluirBotao.innerHTML = '<i class="fa fa-trash"></i>';
        ExcluirBotao.classList.add("excluir-botao");
        ToDoDiv.appendChild(ExcluirBotao);
        todolist.appendChild(ToDoDiv);
    });
}
    
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}