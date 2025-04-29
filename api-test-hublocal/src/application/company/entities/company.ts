export interface CompanyProps {
  id?: string;
  name: string;
  url: string;
  cnpj: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  userId: string;
  _count?: number;
}

export class Company {
  private props: CompanyProps;

  constructor(props: CompanyProps) {
    this.props = {
      ...props,
      deletedAt: props.deletedAt ?? null,
    };
  }
  public get count(): number | undefined {
    return this.props._count;
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

  public get url(): string {
    return this.props.url;
  }

  public set url(url: string) {
    this.props.url = url;
  }

  public get cnpj(): string {
    return this.props.cnpj;
  }

  public set cnpj(cnpj: string) {
    this.props.cnpj = cnpj;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public set userId(userId: string) {
    this.props.userId = userId;
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
