const express = require('express')
const cors = require('cors')

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'
        this.userRoutes = require('../routes/user.routes')

        //Middlewares
        this.middlewares();
        
        this.routes();
    }

    middlewares() {
        //Directorio publico
        this.app.use(express.static('public'));

        //Read and parse of body
        this.app.use(express.json());
        
        //CORS
        this.app.use(cors());
    }
    
    routes() {
        this.app.use(this.usersPath, this.userRoutes)
    }

    listen() {
        this.app.listen(this.port , () => {
            console.log('Example app listening on port: ', this.port)
        });
    }

}

module.exports = Server;