import {z} from "zod";
import { useTRPC } from "@/trpc/client";

import {useForm} from "react-hook-form";
import { AgentGetOne } from "../../types";
// import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agentsInsertScehma } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner";


interface AgentFormProps {
  onSuccess? : ()=> void;
  onCancel? : ()=> void;
  initialValues?: AgentGetOne;
};

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: AgentFormProps) => {
  const trpc = useTRPC();
  // const router = useRouter();
  const queryClient = useQueryClient();
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess:()=>{
        // this is just basically making a refresh to load the newly added on success
        queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions()
        );

        if(initialValues?.id){
          queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({id : initialValues.id})
          )
        }
        onSuccess?.();
      },
      onError:(error)=>{
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsertScehma>>({
    resolver : zodResolver(agentsInsertScehma),
    defaultValues :{
      name: initialValues?.name ?? "",
      instructions : initialValues?.instructions ?? "",
    }
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;
  const onSubmit = (values : z.infer<typeof agentsInsertScehma>) =>{
    if(isEdit){
      console.log("TODO: UPDATE AGENT");
    }
    else{
      createAgent.mutate(values);
    }
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar 
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />
        <FormField
          name="name"
          control={form.control}
          render={({field}) =>(
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field}
                  placeholder="Name of agent"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({field}) =>(
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Your personal math assistant  that can answer questions and hel assignments." />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              onClick={()=>onCancel()}
              variant="ghost"
              disabled={isPending}
              type="button"
            >
            Cancel
            </Button>
          )}
          <Button
            disabled={isPending}
            type="submit"

          >
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

