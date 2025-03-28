import PrismaInstance from "@lib/prisma";
import { articleData, categoryData, doItYourselfData, fruitData, productData, userData } from "./data";

export const fixtures = async () => {
    try {
        // User table
        for (const { name, email, emailVerified, role, password } of userData) {
            const createdUser = await PrismaInstance.user.create({
                data: {
                    name,
                    email,
                    emailVerified,
                    role,
                    Account: {
                        create: {
                            providerId: "credential",
                            accountId: "user-id",
                            password,
                        },
                    },
                },
                include: {
                    Account: true,
                },
            });

            await PrismaInstance.account.update({
                where: {
                    id: createdUser.Account[0].id,
                },
                data: {
                    providerId: createdUser.Account[0].providerId,
                    accountId: createdUser.id,
                    password: createdUser.Account[0].password,
                },
            });
        }

        for (const { name, description, image } of fruitData) {
            await PrismaInstance.fruit.create({
                data: {
                    name,
                    description,
                    image,
                },
            });
        }

        for (const { name, description } of categoryData) {
            await PrismaInstance.category.create({
                data: {
                    name,
                    description,
                },
            });
        }

        // Create products
        const vendor = await PrismaInstance.user.findFirst({
            where: { role: "VENDOR" },
        });

        if (!vendor) {
            throw new Error("No vendor found");
        }

        for (const { name, description, image, price, stock, category } of productData) {
            const categoryRecord = await PrismaInstance.category.findFirst({
                where: { name: category },
            });

            if (!categoryRecord) {
                throw new Error(`Category ${category} not found`);
            }

            await PrismaInstance.product.create({
                data: {
                    name,
                    description,
                    image,
                    price,
                    stock,
                    vendorId: vendor.id,
                    categoryId: categoryRecord.id,
                },
            });
        }

        // Articles and Contents
        for (const { title, authorEmail, contents } of articleData) {
            // Find the author by email
            const author = await PrismaInstance.user.findUnique({
                where: { email: authorEmail },
            });

            if (!author) {
                console.error(`Author with email ${authorEmail} not found`);
                continue;
            }

            // Create article first
            const article = await PrismaInstance.article.create({
                data: {
                    title,
                    authorId: author.id,
                }
            });

            // Create contents linked to this article
            for (const contentData of contents) {
                await PrismaInstance.content.create({
                    data: {
                        content: contentData.content,
                        image: contentData.image,
                        articleId: article.id,
                    },
                });
            }
        }

        // DoItYourself and Contents
        for (const { title, authorEmail, contents } of doItYourselfData) {
            // Find the author by email
            const author = await PrismaInstance.user.findUnique({
                where: { email: authorEmail },
            });

            if (!author) {
                console.error(`Author with email ${authorEmail} not found`);
                continue;
            }

            // Create DoItYourself first
            const diy = await PrismaInstance.doItYourself.create({
                data: {
                    title,
                    authorId: author.id,
                }
            });

            // Create contents linked to this DoItYourself
            for (const contentData of contents) {
                await PrismaInstance.content.create({
                    data: {
                        content: contentData.content,
                        image: contentData.image,
                        doItYourselfId: diy.id,
                    },
                });
            }
        }

        console.log("Fixtures loaded successfully");
        return true;
    } catch (error) {
        console.error("Error loading fixtures:", error);
        return false;
    }
};

export const reset = async () => {
    try {
        await PrismaInstance.verification.deleteMany({});
        await PrismaInstance.session.deleteMany({});
        await PrismaInstance.account.deleteMany({});
        await PrismaInstance.user.deleteMany({});
        await PrismaInstance.fruit.deleteMany({});
        await PrismaInstance.category.deleteMany({});

        return true;
    } catch (error) {
        console.error("An error occurred ->", error);
        return false;
    }
};

const reload = async () => {
    try {
        const resultReset = await reset();
        if (!resultReset) {
            throw new Error("Reset failed...");
        }

        const resultFixtures = await fixtures();
        if (!resultFixtures) {
            throw new Error("Fixtures failed...");
        }

        console.log("Fixtures reloaded with success");
        return true;
    } catch (error) {
        console.error("An error occurred ->", error);
        return false;
    }
};

// Command handler
const command = process.argv[2];

switch (command) {
    case "setup":
        fixtures().then((success) => {
            if (success) {
                console.log("Fixtures created with success");
            }
            process.exit(success ? 0 : 1);
        });
        break;
    case "reset":
        reset().then((success) => {
            if (success) {
                console.log("Database reset with success");
            }
            process.exit(success ? 0 : 1);
        });
        break;
    case "reload":
        reload().then((success) => {
            process.exit(success ? 0 : 1);
        });
        break;
    default:
        console.error("Invalid command. Use 'setup', 'reset', or 'reload'");
        process.exit(1);
}
