import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
    // log: ["query", "error", "info", "warn"],
});


async function main() {
    const modern_library = await prisma.publisher.upsert({
        where: { id: 1 },
        update: {},
        create: { id: 1, name: "Penguin Books" },
    });

}

main()
    .then(async ()=>{
        await prisma.$disconnect();
    })
    .catch( async(e)=>{
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })