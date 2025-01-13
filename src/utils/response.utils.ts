/* eslint-disable @typescript-eslint/no-explicit-any */
import Response from 'src/models/response.model';
import { Notify } from 'quasar';
import StatusConstants from 'src/constants/status.constants';

export default class ResponseUtil {
  static minimal<Type>(response: Response<Type>): Response<void> {
    const minimalResponse = new Response<void>(
      response.status,
      response.message,
      null
    );

    return minimalResponse;
  }

  static async handleAxiosCall<T>(
    func: () => Promise<Response<T>>,
    config?: any
  ): Promise<Response<T>> {
    try {
      const result = await func();

      // if (
      //   config &&
      //   config.showSuccessNotification &&
      //   result.status === StatusConstants.SUCCESS
      // ) {
      //   Notify.create({
      //     color: 'positive',
      //     icon: 'done_all',
      //     message: result.message,
      //   });
      // }

      // if (result.status !== StatusConstants.SUCCESS) {
      //   Notify.create({
      //     type: 'red',
      //     icon: 'eva-alert-triangle-outline',
      //     message: result.message,
      //   });
      // }

      return result;
    } catch (error: any) {
      console.log('error!', error);
      let message = 'Could not complete this operation';
      let icon = 'warning';

      if (error.message === 'Network Error') {
        message =
          "You've lost connection to the server. Please check your network connection";
        icon = 'signal_wifi_statusbar_connected_no_internet_4';
      } else if (error.response) {
        switch (error.response.status) {
          default:
            message = error.response.data.message;

            break;
        }
      }

      Notify.create({
        message: message,
        icon: icon,
        type: 'warning',
      });

      console.log('error', error);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return new Response<any>('error', message, null);
    }
  }
  // static async handleAxiosCall<T>(
  //   func: () => Promise<Response<T>>,
  //   config?: any
  // ): Promise<Response<T>> {
  //   try {
  //     const result = await func();

  //     if (
  //       config &&
  //       config.showSuccessNotification &&
  //       result.status === StatusConstants.SUCCESS
  //     ) {
  //       Notify.create({
  //         color: 'positive',
  //         icon: 'done_all',
  //         message: result.message,
  //       });
  //     }

  //     if (result.status !== StatusConstants.SUCCESS) {
  //       Notify.create({
  //         type: 'red',
  //         icon: 'eva-alert-triangle-outline',
  //         message: result.message,
  //       });
  //     }

  //     return result;
  //   } catch (error: any) {
  //     console.log('error!', error);
  //     let message = 'Could not complete this operation';
  //     let icon = 'warning';

  //     if (error.message === 'Network Error') {
  //       message =
  //         "You've lost connection to the server. Please check your network connection";
  //       icon = 'signal_wifi_statusbar_connected_no_internet_4';
  //     } else if (error.response) {
  //       switch (error.response.status) {
  //         default:
  //           message = error.response.data.message;
  //           break;
  //       }
  //     }

  //     Notify.create({
  //       message: message,
  //       icon: icon,
  //       type: 'warning',
  //     });

  //     console.log('error', error);

  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     return new Response<any>('error', message, null);
  //   }
  // }
}
