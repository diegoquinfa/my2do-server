export const errorHandler = <T extends new (error: Error) => Error>(
  err: unknown,
  SpecificErrorClass?: T
): InstanceType<T> | unknown => {
  if (SpecificErrorClass && err instanceof Error) {
    return new SpecificErrorClass(err)
  }

  return err
}
