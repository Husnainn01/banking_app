import React from 'react'
import { FormField, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Form } from 'react-hook-form'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { AuthFormSchema } from '@/lib/utils'
import { FieldPath } from 'react-hook-form'

interface CustomeInput {
    control: Control<z.infer<typeof AuthFormSchema>>,
    name: FieldPath<z.infer<typeof AuthFormSchema>>,
    label: string,
    placeholder: string,
}

const CustomInput = ({control, name, label, placeholder}: CustomeInput) => {
  return (
        <FormField
          control={control}
            name={name}
              render={({ field }) => (
                <div className='form-item'>
                  <FormLabel className="form-label">
                    {label}
                  </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl >
                    <Input 
                        placeholder={placeholder}
                        className='input-class'
                        type={name === 'password' ? 'password' : 'text'}
                        {...field}
                     />
                  </FormControl>
                    <FormMessage
                        className='form-message mt-2'
                    />
                 </div>
             </div>
            )}  
        />
  )
}

export default CustomInput
