/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/1/1 22:34
 * @version $ IIFE
 */

/* name module */

import func from 'utils';

export default function formatDate() {
  return (time, pattern) => {
    return func.formatDate(time, pattern);
  }
}
