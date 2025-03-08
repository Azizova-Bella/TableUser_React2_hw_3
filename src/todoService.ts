import { json, text } from "stream/consumers";
import TodoTypes from "./todo";

const LOCAL_STORAGE_KEY = "todos"

const TodoService = {
getTodos:():TodoTypes[]=>{
    const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY)
    return todoStr? JSON.parse(todoStr):[]
},

// !Add task

addTodos:(text:string):TodoTypes=>{
    const todos = TodoService.getTodos()
    const newTodo:TodoTypes = {id:todos.length +1,text,complated:false}
    const updateTodos =[...todos, newTodo]
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(updateTodos))
    return newTodo

},

//! update task
updateTodo: (todo:TodoTypes): TodoTypes=>{
    const todos = TodoService.getTodos();
    const updateTodos = todos.map((t)=>(t.id === todo.id? todo:t))
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(updateTodos))
    return todo;

},

// ! delete task

deleteTodo : (id:number):void =>{
    const todos = TodoService.getTodos()
    const update = todos.filter((todo)=>todo.id !== id)
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(update))
}

}
export default TodoService




































































