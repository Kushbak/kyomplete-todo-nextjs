import { SelectOption } from "@/types";
import { DATE_PICKER_STATE_FORMAT, REQUEST_DATE_FORMAT } from "./const";
import dayjs, { Dayjs } from "./dayjs";

export const hasValue = (val: any) => {
  // need this to check empty value of mui components
  return val !== "" && String(val) !== "undefined" && String(val) !== "null";
};

export const objectToSearchParams = (obj: Record<string, any>) => {
  const params = new URLSearchParams();
  for (const key in obj) {
    const val = obj[key];
    if (obj.hasOwnProperty(key) && hasValue(val)) {
      params.append(key, val);
    }
  }
  return params;
};

export const searchParamsToObject = (searchParams: URLSearchParams) => {
  const obj: Record<string, any> = {};
  for (const [key, value] of searchParams.entries()) {
    obj[key] = value;
  }
  return obj;
};

export const toRequestDateFormat = (
  date: Dayjs | string | null,
  isEndOfDay: boolean = false
) => {
  let d = dayjs(date);
  if (isEndOfDay) {
    d = d.endOf("day");
  }
  return d.format(REQUEST_DATE_FORMAT);
};

export const toDatePickerStateFormat = (date: string | Dayjs) => {
  return dayjs(date).format(DATE_PICKER_STATE_FORMAT)
}

export const getToday = () => dayjs(new Date());

export const convertToSelect = (
  data: Record<string, any>[],
  labelKey: string,
  valueKey = "id"
): SelectOption[] => {
  return data.map((item) => ({
    id: String(item['id'] || item[valueKey]),
    label: item[labelKey],
    value: item[valueKey],
  }));
};
