import { date } from 'quasar';
import StringUtil from './string.util';

export default class DateUtil {
  static convertToIso8601Format(dateTimeString: string): string {
    // Parse the date and time string into a Date object
    const date = new Date(dateTimeString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }

    // Convert the Date object to ISO 8601 format string
    return date.toISOString();
  }

  static formatCustomDate(dateString: string): string {
    // Parse the input date string into a Date object
    const inputDate = new Date(dateString);

    // Check if the inputDate is valid
    if (isNaN(inputDate.getTime())) {
      return 'Invalid Date';
    }

    // Get the day, month, year, hours, and minutes
    const day = inputDate.getDate();
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Format the date string without seconds
    const formattedDate = `${day}th ${month}, ${year}, ${hours}:${minutes
      .toString()
      .padStart(2, '0')} ${ampm}`;

    return formattedDate;
  }

  static getTodayShortDate(): string {
    const timeStamp = Date.now();
    return date.formatDate(timeStamp, 'YYYY/MM/DD');
  }

  static getTodayIsoDate(): string {
    const timeStamp = Date.now();
    return date.formatDate(timeStamp, 'YYYY-MM-DD');
  }

  static getIsoDate(dateStr: string): string {
    return date.formatDate(dateStr, 'YYYY-MM-DD');
  }

  static getDotNetCompatibleDate(dateStr: string | null): string | null {
    if (dateStr) {
      const date = new Date(dateStr);
      const year = StringUtil.padLeft(date.getFullYear().toString(), '0', 4);
      const month = StringUtil.padLeft(
        (date.getMonth() + 1).toString(),
        '0',
        2
      );
      const day = StringUtil.padLeft(date.getDate().toString(), '0', 2);

      return `${year}-${month}-${day}`;
    }
    return null;
  }
}
