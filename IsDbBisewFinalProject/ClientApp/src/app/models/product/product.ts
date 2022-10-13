export class Product {
  constructor(
    public id?: number,
    public categoryId?: number,
    public subCategoryId?: number,
    public brandId?: number,
    public productTitle?: string,
    public description?:string
  ) { }
}
