/**
 * Returns a promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms Number of milliseconds to wait.
 * @return {Promise} Promise that resolves after the specified number of milliseconds.
 */
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
