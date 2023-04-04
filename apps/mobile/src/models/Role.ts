export enum RoleName {
  ADMIN = 'ADMIN',
  COSTUMER = 'COSTUMER ',
  RESTAURANT = 'RESTAURANT',
  DELIVERYMAN = 'DELIVERYMAN',
}

export interface Role {
  id?: string
  name: RoleName
}
