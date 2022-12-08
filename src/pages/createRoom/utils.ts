// TO-DO поменять хардкод ip на переменную
import { CreateRoomFormFields } from "./types";
import { isNumber, uniqueArray } from "../../utils/validation";
import { FormikErrors } from "formik";

export const createRoomLink = (roomId: string) =>
  `http://82.146.57.74/room/${roomId}`;

export const validateCreateRoomFrom = (formValues: CreateRoomFormFields) => {
  const errors: FormikErrors<CreateRoomFormFields> = {};

  if (uniqueArray(formValues.names))
    errors.names = "Имена должны быть уникальными";
  if (formValues.cost && isNumber(formValues.cost))
    errors.cost = "Введите корректную сумму";

  return errors;
};
