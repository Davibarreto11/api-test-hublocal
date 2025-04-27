export interface LocationProps {
  id?: string;
  name: string;
  cep: string;
  state: string;
  neighborhood: string;
  street: string;
  city: string;
  number: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  companyId: string;
}

export class Location {
  private props: LocationProps;

  constructor(props: LocationProps) {
    this.props = {
      ...props,
    };
  }

  public get id(): string | undefined {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get cep(): string {
    return this.props.cep;
  }

  public set cep(cep: string) {
    this.props.cep = cep;
  }

  public get state(): string {
    return this.props.state;
  }

  public set state(state: string) {
    this.props.state = state;
  }

  public get neighborhood(): string {
    return this.props.neighborhood;
  }

  public set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood;
  }

  public get street(): string {
    return this.props.street;
  }

  public set street(street: string) {
    this.props.street = street;
  }

  public get city(): string {
    return this.props.city;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get number(): string {
    return this.props.number;
  }

  public set number(number: string) {
    this.props.number = number;
  }

  public get companyId(): string {
    return this.props.companyId;
  }

  public set companyId(companyId: string) {
    this.props.companyId = companyId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }
}
