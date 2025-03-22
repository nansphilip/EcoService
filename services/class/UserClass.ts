import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    UserCreateArgsSchema,
    UserDeleteArgsSchema,
    UserFindManyArgsSchema,
    UserFindUniqueArgsSchema,
    UserOrderByWithRelationInputSchema,
    UserSchema,
    UserUpdateArgsSchema,
    UserUpsertArgsSchema,
    UserWhereInputSchema,
    UserWhereUniqueInputSchema,
    UserWithRelationsSchema
} from "@services/schemas";
import { UserIncludeSchema } from "@services/schemas/inputTypeSchemas/UserIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type UserModel = z.infer<typeof UserSchema>;
export type UserRelationsOptional = z.infer<typeof UserSchema> & z.infer<typeof UserIncludeSchema>;
export type UserRelationsComplete = z.infer<typeof UserWithRelationsSchema>;
export type UserCount = number;

// ============== Schema Types ============== //

const createUserSchema: ZodType<Prisma.UserCreateArgs> = UserCreateArgsSchema;
const upsertUserSchema: ZodType<Prisma.UserUpsertArgs> = UserUpsertArgsSchema;
const updateUserSchema: ZodType<Prisma.UserUpdateArgs> = UserUpdateArgsSchema;
const deleteUserSchema: ZodType<Prisma.UserDeleteArgs> = UserDeleteArgsSchema;
const selectUserSchema: ZodType<Prisma.UserFindUniqueArgs> = UserFindUniqueArgsSchema;
const selectManyUserSchema: ZodType<Prisma.UserFindManyArgs> = UserFindManyArgsSchema;
const countUserSchema: ZodType<Prisma.UserCountArgs> = z.object({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => UserOrderByWithRelationInputSchema),
        z.array(z.lazy(() => UserOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateUserProps = z.infer<typeof createUserSchema>;
export type UpsertUserProps = z.infer<typeof upsertUserSchema>;
export type UpdateUserProps = z.infer<typeof updateUserSchema>;
export type DeleteUserProps = z.infer<typeof deleteUserSchema>;
export type FindUniqueUserProps = z.infer<typeof selectUserSchema>;
export type FindManyUserProps = z.infer<typeof selectManyUserSchema>;
export type CountUserProps = z.infer<typeof countUserSchema>;

// ============== CRUD Response Types ============== //

export type CreateUserResponse<T extends CreateUserProps> = Prisma.UserGetPayload<T>;
export type UpsertUserResponse<T extends UpsertUserProps> = Prisma.UserGetPayload<T>;
export type UpdateUserResponse<T extends UpdateUserProps> = Prisma.UserGetPayload<T>;
export type DeleteUserResponse<T extends DeleteUserProps> = Prisma.UserGetPayload<T>;
export type FindUniqueUserResponse<T extends FindUniqueUserProps> = Prisma.UserGetPayload<T> | null;
export type FindManyUserResponse<T extends FindManyUserProps> = Prisma.UserGetPayload<T>[];
export type CountUserResponse = UserCount;

// ============== Services ============== //

export class UserService {

    static async create<T extends CreateUserProps>(props: T): Promise<ResponseFormat<CreateUserResponse<T>>> {
        try {
            const { data, include, omit, select } = createUserSchema.parse(props);

            const user = await PrismaInstance.user.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user as CreateUserResponse<T> };
        } catch (error) {
            console.error("UserService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Create -> Prisma error -> " + error.message);
                throw new Error("UserService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create user..." };
        }
    }

    static async upsert<T extends UpsertUserProps>(props: T): Promise<ResponseFormat<UpsertUserResponse<T>>> {
        try {
            const { create, update, where, include, omit, select } = upsertUserSchema.parse(props);

            const user = await PrismaInstance.user.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user as UpsertUserResponse<T> };
        } catch (error) {
            console.error("UserService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("UserService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert user..." };
        }
    }

    static async update<T extends UpdateUserProps>(props: T): Promise<ResponseFormat<UpdateUserResponse<T>>> {
        try {
            const { data, where, include, omit, select } = updateUserSchema.parse(props);

            const user = await PrismaInstance.user.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user as UpdateUserResponse<T> };
        } catch (error) {
            console.error("UserService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Update -> Prisma error -> " + error.message);
                throw new Error("UserService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update user..." };
        }
    }

    static async delete<T extends DeleteUserProps>(props: T): Promise<ResponseFormat<DeleteUserResponse<T>>> {
        try {
            const { where, include, omit, select } = deleteUserSchema.parse(props);

            const user = await PrismaInstance.user.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user as DeleteUserResponse<T> };
        } catch (error) {
            console.error("UserService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Delete -> Prisma error -> " + error.message);
                throw new Error("UserService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete user..." };
        }
    }

    static async findUnique<T extends FindUniqueUserProps>(props: T): Promise<ResponseFormat<FindUniqueUserResponse<T>>> {
        try {
            const { where, include, omit, select } = selectUserSchema.parse(props);

            const user = await PrismaInstance.user.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: user as FindUniqueUserResponse<T> };
        } catch (error) {
            console.error("UserService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("UserService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find user..." };
        }
    }

    static async findMany<T extends FindManyUserProps>(props: T): Promise<ResponseFormat<FindManyUserResponse<T>>> {
        try {
            const {
                cursor,
                distinct,
                include,
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyUserSchema.parse(props);

            const userList = await PrismaInstance.user.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                ...(include && { include }),
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: userList as FindManyUserResponse<T> };
        } catch (error) {
            console.error("UserService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("UserService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find users..." };
        }
    }

    static async count(props: CountUserProps): Promise<ResponseFormat<CountUserResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countUserSchema.parse(props);

            const userAmount: UserCount = await PrismaInstance.user.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: userAmount };
        } catch (error) {
            console.error("UserService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("UserService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("UserService -> Count -> Prisma error -> " + error.message);
                throw new Error("UserService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count users..." };
        }
    }
}
