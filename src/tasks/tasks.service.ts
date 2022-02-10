import { Injectable } from '@nestjs/common';
import { Task, TaskStatuts } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
    private tasks: Task[] =[];

    getAllTAsks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            id: uuid(),
            title: title,
            description: description,
            status: TaskStatuts.OPEN,
        }
        this.tasks.push(task);
        return task;
    }
}
