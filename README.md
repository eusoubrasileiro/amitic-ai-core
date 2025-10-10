1. Install dependencies:

   ```bash
   npm install
   ```

### Running the Application

To run the application locally:

```bash
npm run dev
# or
npm run start
```

### Running with Docker (Swarm only)

Copy amiticia-site.yml to your server and use Docker to deploy the application:

```bash
docker stack deploy -c amiticia-site.yml amiticia-site
```

Then `curl http://localhost:3000` works on the VPS

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

