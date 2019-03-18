export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

// @ts-ignore
export function receiveItems(items) {
  return {
    type: RECEIVE_ITEMS,
    items,
  };
}
