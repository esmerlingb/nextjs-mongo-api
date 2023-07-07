export default function promiseResolver<T> (
  controller: (args: any) => T
) {
  // @ts-expect-error
  return async (obj, args) => {
    return await controller({
      ...args,
      currentObjectId: obj?.id,
    })

  } 
}
