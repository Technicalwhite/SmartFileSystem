export default function buildName(firstName: string, lastName?: string) {
    console.log('firstName:', firstName, 'lastName:',lastName,'打印')
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}