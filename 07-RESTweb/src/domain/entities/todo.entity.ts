//* Todo dentro de domain son reglas de la aplicación

export class TodoEntity {
    constructor(

        public id: number,
        public text: string,
        public completedAt?: Date|null

    ){}

    get isCompleted() {
        return !!this.completedAt; // Regresar un true
    }

    public static fromObject(object: {[key: string]: any}): TodoEntity{ // key de tipo string y los valores tipo any

        const {id, text, completedAt} = object;
        if(!id) throw 'Id is required';
        if(!text) throw 'Text is required';

        let newCompletedAt;
        if(completedAt) {
            newCompletedAt = new Date(completedAt);
            if(isNaN(newCompletedAt.getTime())){ // Verificar si es una fecha valida
                throw 'completedAt is not a valid date'
            }
        }

        return new TodoEntity(id, text, completedAt)

    }

}
