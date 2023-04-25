import { randomUUID } from 'crypto';

type CategoryProps = {
  name: string;
  description: string;
  alias: string;
  thumbnail?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Category {
  private _id: string;
  private _props: CategoryProps;

  private constructor(private readonly props: CategoryProps) {
    this._id = this._id || randomUUID();
    this._props = props;
    this._props.createdAt = this.props.createdAt || new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get alias(): string {
    return this.props.alias;
  }

  get thumbnail(): string {
    return this.props.thumbnail;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateThumbnail(thumbnail: string): void {
    this.props.thumbnail = thumbnail;
    this.props.updatedAt = new Date();
  }

  public static create(props: CategoryProps): Category {
    return new Category(props);
  }
}
