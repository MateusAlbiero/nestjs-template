import { Notification } from '../entities/entity';

export type FieldsError = { [field: string]: string[] } | string;

export interface IValidatorFields {
  validate(notification: Notification, data: any, fields: string[]): boolean;
}
