# Dokploy Deployment Instructions for PetCare Frontend

## Problem
The deployment failed because port 80 on the Dokploy host is already in use by another service (`front-front-0s3ssj`).

## Solution
We've updated the Dockerfile to use an environment variable for the port, allowing Dokploy to configure it dynamically.

### Updated Dockerfile Changes
- Added `ENV PORT=80` (default port 80, but can be overridden)
- Changed CMD to use `"serve", "-s", "dist", "-l", "$PORT"`

### Deployment Steps
1. **Set Environment Variable in Dokploy:**
   - In your Dokploy service settings for `front-front-cqp52f`, add/set the environment variable:
     - `PORT=8080` (or any free port on the host)
   - *Note:* Choose a port that is not currently in use by other services on your Dokploy host.

2. **Configure Dokploy Port Mapping:**
   - In the Dokploy service configuration, ensure the **Host Port** matches the container port (or set up appropriate mapping):
     - If you set `PORT=8080` in the environment, set the Host Port to `8080` (or map Host Port 8080 → Container Port 8080)
   - Make sure the chosen Host Port is free (not used by other services).

3. **Redeploy:**
   - Trigger a redeploy of the service in Dokploy.
   - The build should succeed and the container will start listening on the configured port.

### Alternative: Free Port 80
If you prefer to use port 80:
1. Stop or remove the conflicting service `front-front-0s3ssj` in Dokploy (if it's not needed).
2. Ensure no other service is using port 80.
3. Deploy without changing the PORT environment variable (it will default to 80).
4. Ensure Dokploy Host Port is set to 80.

### Verification
After successful deployment, your service should be accessible at:
- `http://your-dokploy-host:8080` (if using PORT=8080)
- `http://your-dokploy-host` (if using PORT=80 and freed the port)

### Notes
- The Dockerfile now supports dynamic port configuration via the `PORT` environment variable.
- Always verify the chosen port is free on the Dokploy host before deploying.
- If you encounter further port conflicts, repeat the process with a different port number.