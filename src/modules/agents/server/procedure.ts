import { db } from "@/db";
import {z} from "zod"
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
// import { TRPCError } from "@trpc/server";
import { agentsInsertScehma } from "../scemas";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentRouter = createTRPCRouter({
    getOne: protectedProcedure.input(z.object({id : z.string() })).query(async({input}) => {
        const [existingData] = await db.select(
            {
                ...getTableColumns(agents),
                meetingCount : sql<number>`5`,
            }
        ).from(agents)
        .where(eq(agents.id , input.id));
        
        // await new Promise((resolve)=>setTimeout(resolve,5000));
        
        // throw new TRPCError({code : "BAD_REQUEST"});
        
        return existingData;
    }),
    getMany: protectedProcedure.query(async() => {
        const data = await db.select().from(agents);

        // await new Promise((resolve)=>setTimeout(resolve,5000));

        // throw new TRPCError({code : "BAD_REQUEST"});

        return data;
    }),
    create : protectedProcedure
    .input(agentsInsertScehma)
    .mutation(async({input , ctx}) =>{
        const [createdAgent] = await db
        .insert(agents)
        .values({
            ...input,
            userId : ctx.auth.user.id,
        })
        .returning();
        return createdAgent;
    }),
});