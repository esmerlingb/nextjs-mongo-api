declare module 'abind' {
  interface AbindOptions {
    proto?: object
    excludes?: string[]
  }

  export default function abind (obj: object, options?: AbindOptions): void
}
