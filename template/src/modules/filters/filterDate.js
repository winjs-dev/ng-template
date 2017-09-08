/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/1/1 22:34
 * @version $ IIFE
 */

/* name module */

import {formatDate} from 'utils';

export default function filterDate() {
  return (time, pattern) => {
    return formatDate(time, pattern);
  }
}
