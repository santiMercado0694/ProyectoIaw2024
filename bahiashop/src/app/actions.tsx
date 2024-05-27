'use server'
 
import { cookies } from 'next/headers'

export async function SetCookie(key:string, value:string) {
    cookies().set(key, value, { httpOnly: true, path: '/' });
}

export async function GetCookie(key:string) {
  return cookies().get(key)?.value;
}