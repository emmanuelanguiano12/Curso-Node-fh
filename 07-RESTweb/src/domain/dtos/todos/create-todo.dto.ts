
export class CreateTodoDto {

    private constructor(
        public readonly text: string
    ){}

    static create(props: {[key: string]: any}): [string?, CreateTodoDto?]{ //Devuelve un texto o la instancia de la clase

        const {text} = props;
        if(!text) return ['Text is required', undefined]

        return [undefined, new CreateTodoDto(text)]

    }

}
