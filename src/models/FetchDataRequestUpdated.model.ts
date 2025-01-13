export default class FetchDataRequestUpdated<Type> {
  constructor(search: string, filter: Type, draw = 10) {
    this.search = search;
    this.filter = filter;
    this.draw = draw;
  }

  public index = 0;
  public draw = 0;
  public search!: string;
  public filter!: Type;
}
