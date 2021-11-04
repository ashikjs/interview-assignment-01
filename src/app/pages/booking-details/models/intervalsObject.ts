import * as moment from "moment";

export interface IntervalsObject {
  start: moment.Moment;
  end: moment.Moment;
}

export interface IntervalsObjectByDateType {
  start: Date;
  end: Date;
}
