export type service_person = {
  id: number;
  personal_nr: number;
  first_name: string;
  last_name: string;
  technician_field_of_app: {
    field_of_app: number;
    note: string | null;
    technician: number;
  }[];
};

export type service_persons = {
  id: number;
  personal_nr: number;
  first_name: string;
  last_name: string;
  technician_field_of_app: {
    field_of_app: number;
    note: string | null;
    technician: number;
  }[];
}[];
