const dotenv = require('dotenv');
import { MongoHelper } from '../infra/db/mongodb/mongo-helper';
        
dotenv.config();
MongoHelper.connect(process.env.MONGO_URL)
    .then(async () => {
        const app = (await import('./config/app')).default;
        
        dotenv.config();

        MongoHelper.setLoadedMatchesCollection('Loaded_Matches');
        app.listen(process.env.SERVERPORT, () => {
            console.log(`server running at http://localhost:${process.env.SERVERPORT}`);
        });
    })
    .catch(console.error);