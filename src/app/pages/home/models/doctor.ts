export interface Doctor {
  id: string,
  name: string,
  speciality?: string,
  org: string,
  availabilities: { [key: string]: string },
  visitDurationInMin: number,
}
