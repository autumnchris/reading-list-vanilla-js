import getLocalStorage from './getLocalStorage';
import setToLocalStorage from './setToLocalStorage';

export default function getReadingList(value) {
  if (value) setToLocalStorage('readingList', value);
  return getLocalStorage('readingList') || [];
}