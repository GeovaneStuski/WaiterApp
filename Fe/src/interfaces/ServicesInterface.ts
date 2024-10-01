export interface ServicesInterface {
  index: () => Promise<object[]>
  create: (body: object) => Promise<object>
  update: (itemID: string, body: object) => Promise<object>
  delete: (itemID: string) => Promise<void>
}
