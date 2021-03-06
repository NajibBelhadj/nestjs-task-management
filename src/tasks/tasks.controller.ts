import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { TaskStatuts } from './task-status.enum';
import { Task } from './task.entity';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if(Object.keys(filterDto).length){
  //     return this.tasksService.getTasksWithFilters(filterDto)
  //   }
  //   return this.tasksService.getAllTAsks();
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // deleteTaskByID(@Param('id') id: string): void {
  //   return this.tasksService.delteTaskById(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string, 
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatuts
  //   ): Task {
  //   return this.tasksService.updateTaskStatus(id, status)
  // }



  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise <Task> {
     return this.tasksService.getTaskById(id);
  }


  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }


  @Delete('/:id')
  deleteTaskByID(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number, 
    @Body('status', TaskStatusValidationPipe) status: TaskStatuts
    ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status)
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getAllTasks(filterDto);
  }



}
