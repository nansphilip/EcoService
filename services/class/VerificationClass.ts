import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    VerificationCreateArgsSchema,
    VerificationDeleteArgsSchema,
    VerificationFindManyArgsSchema,
    VerificationFindUniqueArgsSchema,
    VerificationOrderByWithRelationInputSchema,
    VerificationSchema,
    VerificationUpdateArgsSchema,
    VerificationUpsertArgsSchema,
    VerificationWhereInputSchema,
    VerificationWhereUniqueInputSchema
} from "@services/schemas";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type VerificationModel = z.infer<typeof VerificationSchema>;
export type VerificationCount = number;

// ============== Schema Types ============== //

const createVerificationSchema: ZodType<Prisma.VerificationCreateArgs> = VerificationCreateArgsSchema;
const upsertVerificationSchema: ZodType<Prisma.VerificationUpsertArgs> = VerificationUpsertArgsSchema;
const updateVerificationSchema: ZodType<Prisma.VerificationUpdateArgs> = VerificationUpdateArgsSchema;
const deleteVerificationSchema: ZodType<Prisma.VerificationDeleteArgs> = VerificationDeleteArgsSchema;
const selectVerificationSchema: ZodType<Prisma.VerificationFindUniqueArgs> = VerificationFindUniqueArgsSchema;
const selectManyVerificationSchema: ZodType<Prisma.VerificationFindManyArgs> = VerificationFindManyArgsSchema;
const countVerificationSchema: ZodType<Prisma.VerificationCountArgs> = z.object({
    where: z.lazy(() => VerificationWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => VerificationOrderByWithRelationInputSchema),
        z.array(z.lazy(() => VerificationOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => VerificationWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateVerificationProps = z.infer<typeof createVerificationSchema>;
export type UpsertVerificationProps = z.infer<typeof upsertVerificationSchema>;
export type UpdateVerificationProps = z.infer<typeof updateVerificationSchema>;
export type DeleteVerificationProps = z.infer<typeof deleteVerificationSchema>;
export type FindUniqueVerificationProps = z.infer<typeof selectVerificationSchema>;
export type FindManyVerificationProps = z.infer<typeof selectManyVerificationSchema>;
export type CountVerificationProps = z.infer<typeof countVerificationSchema>;

// ============== CRUD Response Types ============== //

export type CreateVerificationResponse<T extends CreateVerificationProps> = Prisma.VerificationGetPayload<T>;
export type UpsertVerificationResponse<T extends UpsertVerificationProps> = Prisma.VerificationGetPayload<T>;
export type UpdateVerificationResponse<T extends UpdateVerificationProps> = Prisma.VerificationGetPayload<T>;
export type DeleteVerificationResponse<T extends DeleteVerificationProps> = Prisma.VerificationGetPayload<T>;
export type FindUniqueVerificationResponse<T extends FindUniqueVerificationProps> = Prisma.VerificationGetPayload<T> | null;
export type FindManyVerificationResponse<T extends FindManyVerificationProps> = Prisma.VerificationGetPayload<T>[];
export type CountVerificationResponse = VerificationCount;

// ============== Services ============== //

export class VerificationService {

    static async create<T extends CreateVerificationProps>(props: T): Promise<ResponseFormat<CreateVerificationResponse<T>>> {
        try {
            const { data, omit, select } = createVerificationSchema.parse(props);

            const verification = await PrismaInstance.verification.create({
                data,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification as CreateVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Create -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create verification..." };
        }
    }

    static async upsert<T extends UpsertVerificationProps>(props: T): Promise<ResponseFormat<UpsertVerificationResponse<T>>> {
        try {
            const { create, update, where, omit, select } = upsertVerificationSchema.parse(props);

            const verification = await PrismaInstance.verification.upsert({
                create,
                update,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification as UpsertVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert verification..." };
        }
    }

    static async update<T extends UpdateVerificationProps>(props: T): Promise<ResponseFormat<UpdateVerificationResponse<T>>> {
        try {
            const { data, where, omit, select } = updateVerificationSchema.parse(props);

            const verification = await PrismaInstance.verification.update({
                data,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification as UpdateVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Update -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update verification..." };
        }
    }

    static async delete<T extends DeleteVerificationProps>(props: T): Promise<ResponseFormat<DeleteVerificationResponse<T>>> {
        try {
            const { where, omit, select } = deleteVerificationSchema.parse(props);

            const verification = await PrismaInstance.verification.delete({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification as DeleteVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Delete -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete verification..." };
        }
    }

    static async findUnique<T extends FindUniqueVerificationProps>(props: T): Promise<ResponseFormat<FindUniqueVerificationResponse<T>>> {
        try {
            const { where, omit, select } = selectVerificationSchema.parse(props);

            const verification = await PrismaInstance.verification.findUnique({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: verification as FindUniqueVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find verification..." };
        }
    }

    static async findMany<T extends FindManyVerificationProps>(props: T): Promise<ResponseFormat<FindManyVerificationResponse<T>>> {
        try {
            const {
                cursor,
                distinct,
                
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyVerificationSchema.parse(props);

            const verificationList = await PrismaInstance.verification.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: verificationList as FindManyVerificationResponse<T> };
        } catch (error) {
            console.error("VerificationService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find verifications..." };
        }
    }

    static async count(props: CountVerificationProps): Promise<ResponseFormat<CountVerificationResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countVerificationSchema.parse(props);

            const verificationAmount: VerificationCount = await PrismaInstance.verification.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: verificationAmount };
        } catch (error) {
            console.error("VerificationService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("VerificationService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("VerificationService -> Count -> Prisma error -> " + error.message);
                throw new Error("VerificationService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count verifications..." };
        }
    }
}
