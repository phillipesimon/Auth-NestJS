import { Body, Controller, Post, Put } from '@nestjs/common';
import type { UpdateUserAddRoleDTO, UserCreateDTO } from './user.dto';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UpdateAddRoleUserUseCase } from './use-cases/update-add-role-user.usecase';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: CreateUserUseCase,
    private updateRolesUseCase: UpdateAddRoleUserUseCase,
  ) {}

  @Post('/')
  async create(@Body() data: UserCreateDTO) {
    const result = await this.usersService.execute(data);
    return result;
  }

  @Put('/roles')
  async updateRoles(@Body() data: UpdateUserAddRoleDTO) {
    const result = await this.updateRolesUseCase.execute(data);
    return result;
  }
}
