import { PrismaClient } from "@prisma/client";
import { log } from "console";
const prisma = new PrismaClient();

async function main() {
	// ... you will write your Prisma Client queries here
	console.log("It works?");

    // Get all phones and log them to the console
	// SELECT * FROM phones
	// const phones = await prisma.phones.findMany();

	// Get all phones but only manufacturer and model columns
	// SELECT manufacturer, model FROM phones
	// const phones = await prisma.phones.findMany({
	// 	select: {
	// 		manufacturer: true,
	// 		model: true,
	// 	},
	// });

	// Get all phones and log them to the console
	// SELECT * FROM phones WHERE manufacturer = "Apple"
	// const phones = await prisma.phones.findMany({
	// 	where: {
	// 		manufacturer: "Apple",
	// 	},
	// });

	// console.log("Phones:", phones);

	// Get some of the users and log them to the console

    // const users = await prisma.users.findMany({
    //     // where: {
    //     //     name: {
    //     //         // contains: "An", //WHERE `name` LIKE "%An%"
    //     //         startsWith: "Th",
    //     //     },
    //     // }

    //     // orderBy: [
    //     //     {
    //     //         name: "asc",
    //     //     },
    //     //     {
    //     //         title: "asc",
    //     //     },
    //     // ],
    //     // take: 1,
    //     // skip: 2,
        
    // });

    // const first_user = await prisma.users.findFirst({
    //     where: {
    //         name: {
    //             startsWith: "Le",
    //         },
    //     },

    // });

    // try {
    //     const leeloo = await prisma.users.findUniqueOrThrow({
    //         where: {
    //         id: 123,
    //         }, 
        
    //     });
    //     console.log("Selecting Leeloo:", leeloo);
    // } catch(err) {
    //     console.log("probably didn't find user");
    // } 

    // Get the phone with ID 1
    const nokia_8110 = await prisma.phones.findUnique({
        where: {
            id: 1,
        },
        include: {
            user: true,
        }
    });
    // console.log(nokia_8110);

    const user_with_phone = await prisma.users.findUnique({
        where: {
            id: 5,
        },
        include: {
            phones: true,
        },
    });



    // console.log(user_with_phone);
    
    // Get the user with ID 4 
    const neo = await prisma.users.findUnique({
        where: {
            id:4,
        },
    });
    // console.log(neo);

    const all_phones_and_users = await prisma.users.findMany({
        include: {
            phones: true,
        },
    });

    console.dir(all_phones_and_users, { depth: Infinity });
    

   
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});