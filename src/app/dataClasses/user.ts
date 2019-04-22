export class User {
    constructor(
        public username: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public roles: Array<string>,
        public _id: string
    ) { }
}
