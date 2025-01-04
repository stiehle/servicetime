import { ServiceBlock } from "../types/person";

// function test(serviceBlock: ServiceBlock) {
//   const newServiceblock = { ...serviceBlock };
//   console.log(newServiceblock);

//   const selectServiceBlock2 = (({
//     action,
//     unit,
//     communication,
//     customer,
//     date_of_action,
//     location,
//     note,
//     priority,
//     technician,
//     time_of_action_end,
//     time_of_action_start,
//     time_period_of,
//     time_period_util,
//   }) => ({
//     action,
//     unit,
//     communication,
//     customer,
//     date_of_action,
//     location,
//     note,
//     priority,
//     technician,
//     time_of_action_end,
//     time_of_action_start,
//     time_period_of,
//     time_period_util,
//   }))(serviceBlock);

//   const check2: Array<keyof typeof selectServiceBlock2> = [
//     "action",
//     "unit",
//     "communication",
//     "customer",
//     "date_of_action",
//     "location",
//     "note",
//     "priority",
//     "technician",
//     "time_of_action_end",
//     "time_of_action_start",
//     "time_period_of",
//     "time_period_util",
//   ];

//   const block: [] = [];
//   const field: [] = [];

//   check2.map((key) => {
//     console.log("Hallo", key);
//     if (selectServiceBlock2[key] === "" || selectServiceBlock2[key] === 0) {
//       console.log("ok", key, newServiceblock[key]);
//       newServiceblock[key] = null;

//       // if (key !== "service_field") {
//       //   block.push(newServiceblock[key])
//       // } else {
//       //   field.push(newServiceblock[key])
//       // }
//     }
//   });
// }

export function spliceServiceBlock(serviceBlock: ServiceBlock) {
  const newServiceblock = { ...serviceBlock };
  // test(serviceBlock);

  // const key2: keyof typeof newServiceblock = newServiceblock;

  //   for (const check2 in newServiceblock) {
  //     console.log(check2);
  //     if (newServiceblock[check2] === "" || selectServiceBlock[key] === 0) {
  //         console.log("ok", key);
  //         selectServiceBlock[key] = null;
  //       }
  // console.log(key2, newServiceblock[key2 as keyof typeof newServiceblock])
  // console.log("Key=", key);
  // console.log(newServiceblock[key as keyof typeof newServiceblock]);
  // const x = newServiceblock[key2 as keyof typeof newServiceblock];
  // if (x === "" || x === 0) {
  //   console.log(x);
  //   newServiceblock[key2] = "";
  // }

  const selectServiceBlock = (({
    action,
    unit,
    communication,
    customer,
    date_of_action,
    location,
    note,
    priority,
    technician,
    time_of_action_end,
    time_of_action_start,
    time_period_of,
    time_period_util,
  }) => ({
    action,
    unit,
    communication,
    customer,
    date_of_action,
    location,
    note,
    priority,
    technician,
    time_of_action_end,
    time_of_action_start,
    time_period_of,
    time_period_util,
  }))(serviceBlock);

  const selectServiceField = (({ service_field }) => ({ service_field }))(serviceBlock);

  // const check = ["technician", "date_of_action", "time_of_action_end", "time_of_action_start", "time_period_of", "time_period_util"];
  // check.map((key) => {
  //   if (selectServiceBlock[key as keyof typeof selectServiceBlock] === "" || selectServiceBlock[key as keyof typeof selectServiceBlock] === 0) {
  //     console.log("ok", key);
  //     selectServiceBlock[key as keyof typeof selectServiceBlock] = null;
  //   }
  // });

  const check: Array<keyof typeof selectServiceBlock> = [
    "technician",
    "date_of_action",
    "time_of_action_end",
    "time_of_action_start",
    "time_period_of",
    "time_period_util",
  ];

  // const check: Array<keyof typeof selectServiceBlock> = [];

  check.map((key) => {
    if (selectServiceBlock[key] === "" || selectServiceBlock[key] === 0) {
      console.log("ok", key);
      selectServiceBlock[key] = null;
      newServiceblock[key] = null;
    }
  });

  return { selectServiceBlock, selectServiceField, newServiceblock };
}
