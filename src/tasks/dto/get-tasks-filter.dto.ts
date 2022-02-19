import { TaskStatuts } from "../task.model";

export class GetTasksFilterDto{
    status: TaskStatuts;
    search: string;
}