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
        let sql = `SELECT COUNT(id) AS cnt FROM user WHERE email = '${email}';`;
        const [userCount, _] = await db.execute(sql);
        // Learning notes: through console.log to check how the sql result is returned to node server
        console.log(userCount[0].cnt);

        if (userCount[0].cnt > 0 ) {
            return true;
        }
        else {
            return false;
        }
    }

    // TODO: Need to refactor this method to return a consumable object (User)
    static async findById(id) {
        return user;
    }
}

module.exports = User;
