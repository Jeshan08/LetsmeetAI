import { z } from "zod";

export const meetingsInsertScehma = z.object({
  name : z.string().min(1,{message : "Name is required"}),
  agentId : z.string().min(1,{message : "Agent Id is required"}), 
});

export const meetingsUpdateSchema = meetingsInsertScehma.extend({
  id: z.string().min(1,{message: "Id is required"})
});

