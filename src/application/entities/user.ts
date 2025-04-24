export interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User {
  private _id: string;
  private props: UserProps;
  private _createdAt: string;
  private _updatedAt: string;
  constructor(props: UserProps) {
    this.props = {
      ...props,
    };
  }

  public get id() {
    return this._id;
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
  public get createdAt(): string {
    return this._createdAt;
  }

  public get updatedAt(): string {
    return this._createdAt;
  }
}
