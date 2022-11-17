import React, { FC } from 'react'
import { Control, Controller } from 'react-hook-form';
import { Input } from 'rsuite';
import { CreateRoomFormPops } from './types';

type NameInputProps = {
  control: Control<CreateRoomFormPops, any>,
  idx: number,
}

const NameInput: FC<NameInputProps> = ({ control, idx }) => {
  return <Controller
    render={({ field }) => <Input
      {...field}
      value={field.value.value}
      placeholder="Иван Иванов"
    />}
    name={`names.${idx}`}
    control={control}
    rules={{
      required: true,
      validate: (value) => value.value !== ""
    }}
  />
}

export default NameInput;
