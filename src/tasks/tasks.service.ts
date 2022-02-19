import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatuts } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ){}

  // getAllTAsks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const {status, search }= filterDto
  //   let tasks = this.getAllTAsks();
  //   if(status){
  //     tasks = tasks.filter(task => task.status === status)
  //   }

  //   if(search) {
  //     tasks = tasks.filter(task => 
  //       task.title.includes(search) || 
  //       task.description.includes(search),
  //       )
  //   };

  //   return tasks

  // }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if(!found) {
  //    throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return found;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatuts.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  // delteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks == this.tasks.filter((task) => task.id !== found.id);
  // }

  // updateTaskStatus(id: string, status: TaskStatuts): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status
  //   return task;
  // }

  async getTaskById(id: number): Promise<Task> {
     const found = await this.taskRepository.findOne(id);
      if(!found) {
        throw new NotFoundException(`Task with ID ${id} not found`);
        }
      return found;
   }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async delteTaskById(id: number): Promise<void> {
    const found =await this.taskRepository.findOne(id);
    if(!found){
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await found.remove()
  }
  async updateTaskStatus(id: number, status: TaskStatuts): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save()
    return task;
  }

}
