export default class FetchDataResponse<Type> {
  public total = 0;
  public summary = {};
  public records: Type[] = [];
}
