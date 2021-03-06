import db from '../lib/db.js';

class User {
    constructor(data){   
        this.userId = data.user_id;
        this.discordId = data.discord_id;
        this.twitterId = data.twitter_id;
        this.botToken = data.bottoken;

    }

    static async createUser(discordId){
        const text = 'INSERT INTO users(discord_id) VALUES($1) RETURNING *';
        const values = [discordId || null];
        
        let response = await db.query(text, values);
        response = response[0];
        return new User(response);
    }

    static async getById(userId){
        const text = 'SELECT * FROM users WHERE user_id = $1';
        const values = [userId];
        let response = await db.query(text, values);
        response = response[0];
        return new User(response);
    }
    
    static async getByDiscordId(discordId) {
    try {
      const text = "SELECT discord_id FROM users WHERE discord_id = $1";
      const values = [discordId];
      let response = await db.query(text, values);
      response = response[0];
       if (response)
	      	return response.discord_id ;
      	
      	return 0;
     
       
    } catch (err) {
      console.error(err);
    }
  }

    async save(){
        const text = 'UPDATE users SET discord_id = $2 WHERE user_id = $1';
        const values = [this.userId, this.discordId];
        let response = await db.query(text,values);
    }
}

export default User;
