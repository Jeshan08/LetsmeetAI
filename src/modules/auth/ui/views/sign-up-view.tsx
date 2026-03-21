"use client"

import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {FaGithub, FaGoogle} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import {Form, FormControl, FormField, FormItem, FormLabel,FormMessage} from "@/components/ui/form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


// ao the refine method here just shows the error if passwrods are not equal and path mean it will show error under confirm pass
// because we use name same as confirmpassword
    const formSchema = z.object({
        name : z.string().min(1,{message : "Name is required"}),
        email:z.string().email(),
        password : z.string().min(1,{message : "Password is required"}),
        confirmPassword : z.string().min(1,{message : "Password is required"}),
    }).refine( (data) => data.password === data.confirmPassword, {
        message : "Password's donot Match",
        path:["confirmPassword"]
    })

export const SignUpView = () =>{
    const router = useRouter();
     // use state used for live interaction woth form and usein ghr values in code 
    const [error,setError] = useState<string | null>(null);
    const [pending, isPending] = useState(false);


    // using useform to use all methods like values... and then we strictly telling
    // useform that the scehema is the zod which is described above
    //  zod resolver is the one which checks the form when user types and tells if anything is missing from zod schema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            name:"",
            email:"",
            password:"",
            confirmPassword : ""
        }
    });

    const onSubmit = (data:z.infer<typeof formSchema>) =>{
        setError(null);
        isPending(true);
        //  calling the server authclient for email verifcation with the better auth and the neon postgress
        authClient.signUp.email(
            {
                name: data.name,
                email : data.email,
                password : data.password,
                callbackURL:"/"
            },
            {
               onSuccess: ()=>{
                isPending(false);
                router.push("/");
               },
               onError: ({error})=>{
                setError(error.message)
               }  
            },
        )
    }
    const onSocial = (provider: "github" | "google") =>{
        setError(null);
        isPending(false);
        authClient.signIn.social(
            {
                provider: provider,
                callbackURL:"/"
            },
            {
               onSuccess: ()=>{
                isPending(false);
               },
               onError: ({error})=>{
                setError(error.message)
               }  
            },
        )
    }
    // the client side code which renders on browser
    return(
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
             <CardContent className="grid p-0 md:grid-cols-2">
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">
                        Let&apos;s get started
                    </h1>
                    <p className="text-muted-foreground text-balance">
                        Create your account
                    </p>
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="text"
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}  
                        />

                    </div>
                    <div className="grid gap-3">
                        {/* formfield is the actual field we using here its input */}
                        <FormField
                            control={form.control} // passing the control to the form
                            name="email"
                            render={({field}) =>( // this reders the ui, so field here have all the values like name,value whatever the input needs so it basically saves time of writing all the things
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="email"
                                            placeholder="m@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    {/*this formMessage is for the error messages if any by zod  */}
                                    <FormMessage/>
                                </FormItem>
                            )}  
                        />

                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}  
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}  
                        />
                    </div>
                    {/* this double !! is basically doing 2 things. first its changing to boolean lets say it there error ir will make it false and the seond will change back to true. why we need 2 becuse we have to change returned object to boolean */}
                    {!!error && (
                        <Alert className="bg-destructive/10">
                            {/* and this alert is for the server sider erro from database */}
                            <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    )}
                    <Button
                        disabled = {pending}
                        type="submit"
                        className="w-full"
                    >
                        Sign Up
                    </Button>
                    <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                            Or continue with
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            disabled={pending}
                            onClick={()=>onSocial("google")} 
                            variant="outline"
                            type="button"
                            className="w-full"
                        >
                        <FaGoogle/>
                        </Button>
                        <Button
                            disabled={pending}
                            onClick={()=>onSocial("github")} 
                            variant="outline"
                            type="button"
                            className="w-full"
                        >
                        <FaGithub/>
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                       Already have an account? 
                       <Link
                          href="/sign-in"
                          className="underline underline-offset-4"  
                        >
                       Sign In
                       </Link>
                    </div>
                </div>
                </form>
            </Form>

             <div className="bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                <img src="/logo.svg" alt="image" className="h-[92px] w-[92px]"/>
                <p className="text-2xl font-semibold text-white">LetsMeetAi</p>
             </div>
             </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 ">
                    By clicking continue you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>
        </div>
    )
}