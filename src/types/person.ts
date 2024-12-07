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
