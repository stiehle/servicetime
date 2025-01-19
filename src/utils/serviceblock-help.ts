import { ServiceBlock } from "../types/person";

export function spliceServiceBlock(serviceBlock: ServiceBlock) {
  const newServiceblock = { ...serviceBlock };

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

  const check: Array<keyof typeof selectServiceBlock> = [
    "technician",
    "date_of_action",
    "time_of_action_end",
    "time_of_action_start",
    "time_period_of",
    "time_period_util",
  ];

  check.map((key) => {
    if (selectServiceBlock[key] === "" || selectServiceBlock[key] === 0) {
      selectServiceBlock[key] = null;
      newServiceblock[key] = null;
    }
  });

  return { selectServiceBlock, selectServiceField, newServiceblock };
}
