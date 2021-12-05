OmegaConsumer



- yarn install

  - make .env file 
    - need property
    ```
        JWT_SECRET = ""
        DATABASE_ID = ""
        DATABASE_PASSWORD = ""
        DATABASE_NAME = ""

  - make server/confg.ts
    - need property
    ```
        export default {
            "mailConfig": {
                host: 'smtp.gmail.com',
                port: 123,
                auth: {
                    user: 'test@gmail.com',
                    pass: 'test'
                },
                tls: {
                    rejectUnauthorized: false
                }
            }
        }
}

- yarn dev

- yarn pro

- yarn dockerDev
    - docker build 
  
- yarn dockerRun
    - after yarn dockerDev 

- yarn test
  - test use jest