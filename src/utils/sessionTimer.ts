// utils/sessionTimer.ts

// let timeoutId: NodeJS.Timeout | null = null;
// const timeoutInMS = 180000; // 3 minutes -> 3 * 60 * 1000

// export function startSessionTimer(logoutCallback: () => void) {
//   timeoutId = setTimeout(logoutCallback, timeoutInMS);
// }

// export function clearSessionTimer() {
//   if (timeoutId) {
//     clearTimeout(timeoutId);
//     timeoutId = null;
//   }
// }

let timeoutId: NodeJS.Timeout | null = null;
// const timeoutInMS = 10000; // 10 seconds
const timeoutInMS = 1800000; // 30 minutes -> 30 * 60 * 1000

export function startSessionTimer(logoutCallback: () => void) {
  timeoutId = setTimeout(logoutCallback, timeoutInMS);
}

export function clearSessionTimer() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
}
