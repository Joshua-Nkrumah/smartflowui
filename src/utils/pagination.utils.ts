/* eslint-disable @typescript-eslint/no-explicit-any */
import StatusConstants from 'src/constants/status.constants';
import FetchData from 'src/models/FetchDataRequest.model';
import FetchDataResponse from 'src/models/FetchDataResponse.model';
import Response from 'src/models/response.model';
export enum PaginationSide {
  client,
  server,
}
export default class PaginationUtil {
  constructor(side: PaginationSide = PaginationSide.server) {
    this.side = side;
  }
  public loading = false;
  public pagination: any = {};
  public side;
  async initiate<T, T1>(
    func: (param: FetchData<T>) => Promise<Response<void>>,
    fetchData: FetchData<T>,
    dataFunc?: () => FetchDataResponse<T1>
  ): Promise<Response<void>> {
    this.loading = true;
    this.pagination = {
      sortBy: 'desc',
      descending: false,
      page: fetchData.index + 1,
      rowsPerPage: fetchData.draw,
    };
    const result = await func(fetchData);
    if (result.status === StatusConstants.SUCCESS) {
      this.pagination = {
        sortBy: 'desc',
        descending: false,
        page: fetchData.index + 1,
        rowsPerPage: fetchData.draw,
      };
      if (dataFunc) {
        this.pagination.rowsNumber = dataFunc().total;
      }
    }
    this.loading = false;
    return result;
  }
  async fetch<T, T1>(
    func: (param: FetchData<T>) => Promise<Response<void>>,
    fetchData: FetchData<T>,
    dataFunc?: () => FetchDataResponse<T1>
  ): Promise<Response<void>> {
    this.loading = true;
    fetchData.index = 0;
    fetchData.draw = this.pagination.rowsPerPage;
    const result = await func(fetchData);
    if (result.status === StatusConstants.SUCCESS) {
      this.pagination.page = 1;
      if (dataFunc) {
        this.pagination.rowsNumber = dataFunc().total;
      }
    }
    this.loading = false;
    return result;
  }
  async paginate<T>(
    func: (param: FetchData<T>) => Promise<Response<void>>,
    fetchData: FetchData<T>,
    props: any
  ): Promise<Response<void>> {
    this.loading = true;
    if (this.pagination.rowsPerPage === props.pagination.rowsPerPage) {
      fetchData.index = props.pagination.page - 1;
      fetchData.draw = props.pagination.rowsPerPage;
    } else {
      fetchData.index = 0;
      fetchData.draw = props.pagination.rowsPerPage;
    }
    const result = await func(fetchData);
    if (result.status === StatusConstants.SUCCESS) {
      this.pagination.page = fetchData.index + 1;
      this.pagination.rowsPerPage = fetchData.draw;
    }
    this.loading = false;
    return result;
  }
  static getRecords<T, T1>(
    data: FetchDataResponse<T>,
    filterData: FetchData<T1>
  ): FetchDataResponse<T> {
    const info = new FetchDataResponse<T>();
    info.records = data.records.slice(0, filterData.draw);
    info.total = data.total;
    return data;
  }

  update<T>(data: FetchDataResponse<T>) {
    this.pagination.rowsNumber = data.total;

    return data;
  }
}
