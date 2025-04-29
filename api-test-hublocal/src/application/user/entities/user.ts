export interface UserProps {
  name: string;
  email: string;
  password: string;
  id?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = {
      ...props,
      deletedAt: props.deletedAt ?? null,
    };
  }

  public get id() {
    return this.props.id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  public get deletedAt(): Date | undefined | null {
    return this.props.deletedAt;
  }
}
