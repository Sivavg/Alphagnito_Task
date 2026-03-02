const sequelize = require('./config/db');
const Agent = require('./models/Agent');

const dummyAgents = [
    {
        name: 'Michael',
        companyName: 'Bluenest reality',
        email: 'michael@bluenest.com',
        mobile: '+44 7911 234567',
        propertiesCount: 18,
        inspectionsCount: 42,
        status: 'Active'
    },
    {
        name: 'Olivia haris',
        companyName: 'Urbankey estates',
        email: 'olivia@urbankey.com',
        mobile: '+44 8911 234567',
        propertiesCount: 2,
        inspectionsCount: 10,
        status: 'Active'
    },
    {
        name: 'Daniel',
        companyName: 'Bluenest reality',
        email: 'daniel@primelet.com',
        mobile: '+44 7822 456789',
        propertiesCount: 18,
        inspectionsCount: 20,
        status: 'Inactive'
    },
    {
        name: 'Wilson',
        companyName: 'City homes',
        email: 'wilson@cityhomes.com',
        mobile: '+44 7822 456879',
        propertiesCount: 10,
        inspectionsCount: 10,
        status: 'Active'
    },
    {
        name: 'Sophie',
        companyName: 'City homes',
        email: 'sophie@cityhomes.com',
        mobile: '+44 7700 112233',
        propertiesCount: 12,
        inspectionsCount: 10,
        status: 'Suspended'
    },
    {
        name: 'Turner bruno',
        companyName: 'Primelet agents',
        email: 'turnes@horizon.com',
        mobile: '+44 7555 998877',
        propertiesCount: 20,
        inspectionsCount: 20,
        status: 'Active'
    }
];

const seedDB = async () => {
    try {
        await sequelize.sync({ alter: true });

        // Check if agents exist
        const count = await Agent.count();
        if (count === 0) {
            console.log('Inserting dummy data...');
            await Agent.bulkCreate(dummyAgents);
            console.log('Dummy data inserted successfully!');
        } else {
            console.log('Data already exists.');
            // Update existing ones if they don't have companyName just by recreating for testing (deleting old ones)
            await Agent.destroy({ where: {} });
            await Agent.bulkCreate(dummyAgents);
            console.log('Replaced with new dummy data!');
        }
    } catch (error) {
        console.error('Error seeding data: ', error);
    } finally {
        process.exit();
    }
};

seedDB();
