import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Query,
  Put,
  HttpCode,
} from '@nestjs/common';
import { StoreMockDto } from './dto/store-mock.dto';
import { UpdateMockDto } from './dto/update-mock.dto';
import { StoreMockUseCase } from '../../core/mock/application/use_case/store-mock.use-case';
import { UpdateMockUseCase } from '../../core/mock/application/use_case/update-mock.use-case';
import { MockPresenter, MockPresenterCollection } from './mock.presenter';
import { GetAllMockUseCase } from '../../core/mock/application/use_case/get-all-mock.use-case';
import { GetMockByIdUseCase } from '../../core/mock/application/use_case/get-mock-by-id.use-case';
import { DeleteMockUseCase } from '../../core/mock/application/use_case/delete-mock.use-case';
import { GetAllMockDto } from './dto/get-all-mock.dto';

@Controller('mock')
export class MockController {
  @Inject(GetAllMockUseCase)
  private getAllUseCase: GetAllMockUseCase;

  @Inject(StoreMockUseCase)
  private storeUseCase: StoreMockUseCase;

  @Inject(GetMockByIdUseCase)
  private getByIdUseCase: GetMockByIdUseCase;

  @Inject(UpdateMockUseCase)
  private updateUseCase: UpdateMockUseCase;

  @Inject(DeleteMockUseCase)
  private deleteUseCase: DeleteMockUseCase;

  @Get()
  async getAll(@Query() query: GetAllMockDto) {
    const result = await this.getAllUseCase.execute(query);

    return new MockPresenterCollection(result);
  }

  @Post()
  async store(@Body() storeMockDto: StoreMockDto) {
    const result = await this.storeUseCase.execute(storeMockDto);
    return new MockPresenter(result);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const result = await this.getByIdUseCase.execute({ id });

    return new MockPresenter(result);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMockDto: UpdateMockDto) {
    const result = await this.updateUseCase.execute({ ...updateMockDto, id });

    return new MockPresenter(result);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUseCase.execute({ id });
  }
}
