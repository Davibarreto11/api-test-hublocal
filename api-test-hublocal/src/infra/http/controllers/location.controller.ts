import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
} from "@nestjs/common";

import { CreateLocationBody, UpdateLocationBody } from "../dtos";
import {
  CreateLocationCase,
  DeleteLocationCase,
  GetLocationUseCase,
  GetManyLocationByCompanyIdCase,
  UpdateLocationCase,
} from "@application/location/uses-cases";
import { Public } from "@application/auth/decorators/is-public";
import { LocationViewModel } from "../view-models/location-view-model";

@Controller("locations")
export class LocationController {
  constructor(
    private createLocation: CreateLocationCase,
    private getLocation: GetLocationUseCase,
    private deleteLocation: DeleteLocationCase,
    private getManyLocationsByCompanyId: GetManyLocationByCompanyIdCase,
    private updateLocation: UpdateLocationCase
  ) {}

  @Post()
  @Public()
  async create(@Body() body: CreateLocationBody) {
    const { name, cep, state, neighborhood, street, city, number, companyId } =
      body;

    const { location } = await this.createLocation.execute({
      name,
      cep,
      state,
      neighborhood,
      street,
      city,
      number,
      companyId,
    });

    return { location: LocationViewModel.toHTTP(location) };
  }

  @Get("/:companyId")
  async getAll(@Param("companyId") companyId: string) {
    const locations = await this.getManyLocationsByCompanyId.execute(companyId);

    return locations.map((location) => LocationViewModel.toHTTP(location));
  }

  @Patch("/:id")
  async getById(@Param("id") id: string) {
    const location = await this.getLocation.execute(id);

    return { location: LocationViewModel.toHTTP(location) };
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() body: UpdateLocationBody) {
    const { name, cep, state, neighborhood, street, city, number } = body;

    const { location } = await this.updateLocation.execute({
      id,
      name,
      cep,
      state,
      neighborhood,
      street,
      city,
      number,
    });

    return { location: LocationViewModel.toHTTP(location) };
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    await this.deleteLocation.execute(id);
  }
}
