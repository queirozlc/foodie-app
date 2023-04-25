import { randomUUID } from 'crypto';

type CategoryProps = {
  name: string;
  description: string;
  alias: string;
  thumbnail?: string;
};

export class Category {
  private _id: string;
  private constructor(readonly props: CategoryProps) {
    this._id = this._id || randomUUID();
    this.props = props;
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

  updateThumbnail(thumbnail: string): void {
    this.props.thumbnail = thumbnail;
  }

  public static create(props: CategoryProps): Category {
    return new Category(props);
  }
}
