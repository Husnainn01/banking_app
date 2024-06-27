'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AuthFormSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { signUp } from '@/lib/actions/user.actions'
import { signIn } from '@/lib/actions/user.actions'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'

const AuthForm = ({type}: {type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formSchema = AuthFormSchema(type);

    // 1. Define your form.
const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async(data: z.infer<typeof formSchema>) => 
    {
    setIsLoading(true);
    try{
      //Signup appwrite & Create Plain link Token 
      if(type === 'sign-up'){
       const newUser = await signUp(data);
       setUser(newUser);
      }
      if(type === 'sign-in'){
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
        if(response){
          router.push('/');
        }
      }
    }catch (error){
      console.log(error);
    }finally {
        setIsLoading(false);
      }
  }
  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='cursor-pointer items-center flex gap-1'>
          <Image src="/icons/logo.svg" width={34} height={34} alt='Horizon Logo' 
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
            Horizan
          </h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3 font-semibold text-gray-900'>
            <h1 className='text-24 lg:text-36'>
                {user ? 'Link Account'
                : type === 'sign-in'
                ? 'Sign In'
                : 'Sign Up'
                }
                <p className='text-16 font-normal text-gray-600'>
                    {user
                        ? 'Link Your to Account to Get Started'
                        : 'Please Enter Your Details'
                    }
                </p>
            </h1>
        </div>
      </header>
       {user ? (
        <div className='flex flex-col gap-4'>
            {/* PlaidLINK */}
        </div>
       ):(
        <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === 'sign-up' && (
              <>
              <div className='flex gap-4'>
                <CustomInput 
                control={form.control} 
                name={'firstName'} 
                label={'First Name'} 
                placeholder={'Enter Your First Name'}
                />
                <CustomInput 
                control={form.control} 
                name={'lastName'} 
                label={'Last Name'} 
                placeholder={'Enter Your Last Name'}
                />
              </div>
                <CustomInput 
                control={form.control} 
                name={'address1'} 
                label={'Address'} 
                placeholder={'Enter Your Specific Address'}
                />
                <CustomInput 
                control={form.control} 
                name={'city'} 
                label={'Ciyt'} 
                placeholder={'Enter Your City'}
                />
                <div className='flex gap-4'>
                <CustomInput 
                control={form.control} 
                name={'state'} 
                label={'State'} 
                placeholder={'Example Tokyo'}
                />
                <CustomInput 
                control={form.control} 
                name={'postalCode'} 
                label={'Postal Code'} 
                placeholder={'Enter Your Email'}
                />
                </div>
                <div className='flex gap-4'>
                <CustomInput 
                control={form.control} 
                name={'dateOfBirth'} 
                label={'Date of Birth'} 
                placeholder={'YYYY-MM-DD'}
                />
                <CustomInput 
                control={form.control} 
                name={'ssn'} 
                label={'SSN'} 
                placeholder={'Example: 1234'}
                />
                </div>
              </>   
            )}
                <CustomInput 
                control={form.control} 
                name={'email'} 
                label={'Email'} 
                placeholder={'Enter Your Email'}
                />
                <CustomInput 
                control={form.control} 
                name={'password'} 
                label={'Password'} 
                placeholder={'Enter Your Password'}
                />
                <div className='flex flex-col gap-4'>
                    <Button type="submit" disabled={isLoading} className='form-btn'>{
                    isLoading ? (
                       <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                      </>
                    ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                  }</Button>
                </div>
            </form>
        </Form>

        <footer className='flex justify-center gap-1'>
          <p className='text-14 font-normal text-gray-600'>
            {type === 'sign-in' 
            ? "Dont Have An Account?" 
            : "Already Have An Account"}
            </p>
            <Link href={type === 'sign-in' 
            ? '/sign-up'
            : '/sign-in'} className='form-link'>
              {type === 'sign-in' 
            ? 'Sign Up'
            : 'Sign In'}
            </Link>
        </footer>
        </>
       )}
    </section>
  )
}

export default AuthForm
