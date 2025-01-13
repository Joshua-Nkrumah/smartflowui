export default class FetchDataRequest<Type> {
  constructor(search: string, filter: Type) {
    this.search = search;
    this.filter = filter;
  }

  public index = 0;
  public draw = 10;
  public search!: string;
  public filter!: Type;
}
