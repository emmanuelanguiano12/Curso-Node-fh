import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "../../domain";

export class TodosControllers {

    // Inyección de dependencias
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json(error))
    }

    public getTodosById = (req: Request, res: Response) => {
        const id = +req.body.id
        
        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).status(error))

    }

    public createTodo = (req: Request, res: Response) => {

        // Data Transfer Objects
        const [error, createTodoDto] = CreateTodoDto.create(req.body) // Saber si se tiene un error o no (createTodoDto recibe un texto y devuelve texto)
        if(error) res.status(400).json({error: 'Text propierty is required'})

        // Publicar a la bd
        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).status(error))

    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id; // El + convierte a numero el string
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id //Usar el id que viene en el url
        })

        if(error) res.status(400).json({error})

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).status(error))

    }

    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id; // El + convierte a numero el string
        if(isNaN(id)) res.status(400).json({error: 'ID is not a number'});

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).status(error))

    }
    
}