'use client'

import { Button } from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from 'zod'
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  })
}

const AuthForm = ({type}: {type: FormType}) => {

  const router = useRouter()
  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: '',
      password: ''
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if(type === 'sign-up') {
        const { name, email, password } = data
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const result = signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        })

        if(!(await result).success) {
          toast.error((await result).message)

          return
        }

        toast.success('Conta criada com sucesso')
        router.push('/sign-in')
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("O login falhou. Tente novamente");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success(".");
        router.push("/");
        toast.success('Autorizado com sucesso')
        router.push('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(`Algo deu errado: ${error}`)
    }
  }

  const isSignIn = type === 'sign-in'

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image
            src='/logo.svg'
            alt="logo"
            height={32}
            width={38}
          />
          <h2 className="text-primary-100">IntVoice | AI</h2>
        </div>
        <h3>Pratique Entrevistas de Trabalho com IA</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {! isSignIn && (
              <FormField 
                control={form.control} 
                name='name' 
                label="Nome" 
                placeholder="Seu nome"
              />
            ) }
            <FormField 
                control={form.control} 
                name='email' 
                label="Email" 
                placeholder="Seu email"
              />
            <FormField 
                control={form.control} 
                name='password' 
                label="Senha" 
                placeholder="Senha"
              />
            <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Criar nova conta'}</Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? 'Ainda não tem Conta? |': 'Já possuo uma Conta |'}
          <Link 
            href={!isSignIn ? '/sign-in' : '/sign-up'}
            className="font-bold text-user-primary ml-1"  
          >
            {!isSignIn ? 'Entrar': 'Cadastrar'}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
