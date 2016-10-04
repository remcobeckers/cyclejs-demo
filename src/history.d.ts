declare module "history" {
  import { History, HistoryDriverOptions } from '@cycle/history/lib/interfaces';

  export function createHistory(options? : HistoryDriverOptions): History;
}
