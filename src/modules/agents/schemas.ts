import { z } from "zod";

export const agentsInsertScehma = z.object({
  name : z.string().min(1,{message : "Name is required"}),
  instructions : z.string().min(1,{message : "Instructions are required"}), 
});



export const agentsUpdateSchema = agentsInsertScehma.extend({
  id: z.string().min(1,{message: "Id is required"})
});

