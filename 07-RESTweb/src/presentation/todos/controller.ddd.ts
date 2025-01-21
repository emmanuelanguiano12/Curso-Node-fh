import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class TodosControllers {

    // Inyección de dependencias
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = async(req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll()
        res.json(todos)
        
    }

    public getTodosById = async(req: Request, res: Response) => {

        const id = +req.params.id; // El + convierte a numero el string
        if(isNaN(id)) res.status(400).json({error: 'ID is not a number'})

        try {
            const todo = await this.todoRepository.findById(id)
            res.json(todo)
            
        } catch (error) {
            res.status(400).json({error})
        }
        

    }

    public createTodo = async(req: Request, res: Response) => {

        // Data Transfer Objects
        const [error, createTodoDto] = CreateTodoDto.create(req.body) // Saber si se tiene un error o no (createTodoDto recibe un texto y devuelve texto)
        if(error) res.status(400).json({error: 'Text propierty is required'})

        // Publicar a la bd
        const todo = await this.todoRepository.create(createTodoDto!)
        res.json(todo)

    }

    public updateTodo = async(req: Request, res: Response) => {

        const id = +req.params.id; // El + convierte a numero el string
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body, id //Usar el id que viene en el url
        })

        if(error) res.status(400).json({error})

        const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
        res.json(updatedTodo)
    }

    public deleteTodo = async(req: Request, res: Response) => {

        const id = +req.params.id; // El + convierte a numero el string
        if(isNaN(id)) res.status(400).json({error: 'ID is not a number'});

        try {
            const todoDeleted = await this.todoRepository.deleteById(id)
            res.json(todoDeleted)
            
        } catch (error) {
            res.status(400).json(error)
        }


    }
    
}