export type ServicePerson = {
  id: number;
  personal_nr: number;
  first_name: string;
  last_name: string;
  tech_field: {
    field_of_app: number;
    note: string | null;
    technician: number;
  }[];
};

export type TechField = {
  field_of_app: number;
  note: string | null;
  technician: number;
};

export type ServiceBlock = {
  action: string | null;
  appendix_no: string | null;
  communication: string | null;
  created_at: string;
  customer: string | null;
  date_of_action: string | null;
  duration: number | null;
  id: number;
  location: string | null;
  note: string | null;
  priority: number | null;
  technician: number | null;
  time_of_action_end: string | null;
  time_of_action_start: string | null;
  time_period_of: string | null;
  time_period_util: string | null;
};

// export type ServicePersons = {
//   id: number;
//   personal_nr: number;
//   first_name: string;
//   last_name: string;
//   technician_field_of_app: {
//     field_of_app: number;
//     note: string | null;
//     technician: number;
//   }[];
//   field_of_application: {
//     id: number;
//     type: string | null;
//   }[];
// }[];
