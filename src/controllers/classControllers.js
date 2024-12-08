import { dataBase } from "../db/db.js";

export const getClasses = async (req,res)=>{
    const classes = dataBase[0].classes
    const users = dataBase[0].users

    const classesCoach = classes.map ( _class => {
        const trainer = users.find( trainer => trainer.id === _class.coach_id)
        return { ..._class, coach_id: trainer ? trainer.id +' '+ `(${trainer.name}` + ' ' + `${trainer.lastname})` : 'Entrenador no Encontrado'}
    })
    res.json(classesCoach);
}

export const getClass = async (req, res) => {
    const { id } = req.params;
    const classes = dataBase[0].classes;
    const users = dataBase[0].users;

    const classs = classes.find(classs => classs.id == id);
    if (!classs) {
        return res.status(404).json({ message: 'Class  not found' });
    }
    const trainer = users.find( trainer => trainer.id === classs.coach_id)

    const classesCoach = {
    ...classs, 
    coach_id: trainer ? trainer.id +' '+ `(${trainer.name}` + ' ' + `${trainer.lastname})` : 'Entrenador no Encontrado'
    }

    res.json(classesCoach);
}


export const createClasses= async (req, res) => {
    try {
        const data = req.body;
        const classess = dataBase[0].classes;
        const users = dataBase[0].users;
        const roles = dataBase[0].roles ;

        const trainer = users.find(user => user.id === data.coach_id && user.role === "2");
        if (!trainer) {
            return res.status(400).json({ message: 'Error: Invalid coach ID. The coach must have role 2.' });
        }

        const existingClass = classess.find(_class => _class.class_time === data.class_time);
        if (existingClass) {
            return res.status(409).json({ message: 'Error: Class already exists' });
        }

        const newId = classess.length > 0 ? Math.max(...classess.map(_class => _class.id)) + 1 : 1;

        const newClass = {

            id: newId,
            name: data.name,
            capacity: data.capacity,
            coach_id: data.coach_id,
            class_time: data.class_time,
            status: data.status
        };

        classess.push(newClass);
        res.status(201).json(newClass);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}