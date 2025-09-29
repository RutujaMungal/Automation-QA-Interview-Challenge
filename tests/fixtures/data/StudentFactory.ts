import { faker } from '@faker-js/faker';

// AI-assisted: Generated test data factory for students
export class StudentFactory {
static generateAdult(overrides: any = {}) {
const firstName = overrides.firstName || faker.name.firstName();
const lastName = overrides.lastName || faker.name.lastName();
const email = overrides.email || faker.internet.email(firstName, lastName).toLowerCase();
const phone = overrides.phone || faker.phone.number('+91 9#########');
return {
firstName,
lastName,
email,
phone,
dob: overrides.dob || '1990-01-01',
...overrides,
};
}


static generateChild(overrides: any = {}) {
const firstName = overrides.firstName || faker.name.firstName();
const lastName = overrides.lastName || faker.name.lastName();
const email = overrides.email || faker.internet.email(firstName, lastName).toLowerCase();
const phone = overrides.phone || faker.phone.number('+91 9#########');
return {
firstName,
lastName,
email,
phone,
dob: overrides.dob || '2015-01-01',
...overrides,
};
}
}
