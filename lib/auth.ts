import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";
import { SendEmail } from "./plunk";
import PrismaInstance from "@lib/prisma";
import { customSession } from "better-auth/plugins";
import { SelectUser } from "@actions/database/User";

const baseUrl = process.env.BASE_URL;

export const auth = betterAuth({
    database: prismaAdapter(PrismaInstance, {
        provider: "mysql",
    }),
    trustedOrigins: [`${baseUrl}/auth`],
    emailAndPassword: {
        enabled: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            const callbackURL = "/profile";
            const urlToken =
                baseUrl + "/api/auth/verify-email?token=" + token + "&callbackURL=" + baseUrl + callbackURL;

            // Send email template
            await SendEmail({
                subject: "Welcome! Let's verify your email.",
                email: user.email,
                url: urlToken,
            });
        },
    },
    user: {
        changeEmail: {
            enabled: true,
            sendChangeEmailVerification: async ({ newEmail, token }) => {
                const callbackURL = "/profile";
                const urlToken =
                    baseUrl + "/api/auth/verify-email?token=" + token + "&callbackURL=" + baseUrl + callbackURL;

                // Send email template
                await SendEmail({
                    subject: "Hey! Let's verify your new email.",
                    email: newEmail,
                    url: urlToken,
                });
            },
        },
    },
    session: {
        expiresIn: 60 * 30, // 30 minutes
        updateAge: 60 * 5, // 5 minutes
        // cookieCache: {
        //     enabled: true,
        //     maxAge: 60 * 5
        // }
    },
    plugins: [
        customSession(async ({ session, user }) => {
            const userData = await SelectUser({ where: { id: user.id } });
            if (!userData) {
                throw new Error("User not found");
            }
            return {
                user: {
                    ...user,
                    role: userData.role,
                },
                session,
            };
        }),
    ],
});

/**
 * Get the session from server side
 */
export const GetSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
};

/**
 * Type for the session data
 */
export type BetterSessionServer = Awaited<ReturnType<typeof GetSession>>;
