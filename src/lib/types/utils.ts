export type FieldsExcludeMethod<T> = {
  [P in FieldNamesExcludeMethods<T>]: T[P];
};

export type FieldNamesExcludeMethods<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? never : P;
}[keyof T];
