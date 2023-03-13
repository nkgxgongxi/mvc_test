const db = require('../config/db')

class User {
    constructor(name, email, password, location) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.location = location;
    }

    async save() {
        let temp_date = new Date();
        let yyyy = temp_date.getFullYear();
        let mm = temp_date.getMonth() + 1;
        let dd = temp_date.getDate();

        let registerDate = `${yyyy}-${mm}-${dd}`;

        let sql = `
        INSERT INTO user (
            name,
            email,
            password,
            location,
            date
        )
        VALUES (
            '${this.name}',
            '${this.email}',
            '${this.password}',
            '${this.location}',
            '${registerDate}'
        )
        `;
        const [newUser, _] = await db.execute(sql);

        return newUser;

    }
    // TODO: Need to refactor this method to return a consumable object (User)
    static async findOne(email) {
        let sql = `SELECT DISTINCT name, email FROM user WHERE email = '${email}';`;
        const [queryRes, _] = await db.execute(sql);
        // Learning notes: through console.log to check how the sql result is returned to node server
        console.log('Query Result:' + queryRes);
        console.log(queryRes.name);

        if (queryRes !== undefined) {
            return new User(queryRes.name, queryRes.email);
        }
        else {
            return null;
        }
    }

    // TODO: Need to refactor this method to return a consumable object (User)
    static async findById(id) {
        let sql = `SELECT DISTINCT name, email FROM user WHERE id = ${id};`;
        const [queryRes, _] = await db.execute(sql);
        // Learning notes: through console.log to check how the sql result is returned to node server
        console.log('Query Result:' + queryRes);

        if (queryRes) {
            return new User(queryRes.name, queryRes.email);
        }
        else {
            return null;
        }
    }
}

module.exports = User;
