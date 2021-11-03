import * as moment from "moment";
import { IntervalsObject } from "./intervalsObject";

export interface CalendarDate {
  disable?: boolean;
  selected?: boolean;
  active?: boolean;
  today?: boolean;
  mDate?: moment.Moment;
  intervals: IntervalsObject[];
}
