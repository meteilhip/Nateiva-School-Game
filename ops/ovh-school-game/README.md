# Nateiva School Game on the OVH VPS

The GitHub Actions workflow deploys this static arcade to `/opt/nateiva-school-game`. It runs as a dedicated Docker Compose project with a unique container and private bridge network. Its only host port is bound to `127.0.0.1:8091`; Caddy routes `/school-game/` on the VPS hostname to that private upstream.

## GitHub Actions configuration

Add these repository secrets to `meteilhip/Nateiva-School-Game`:

- `OVH_SSH_HOST`: `15.204.82.200`
- `OVH_SSH_USER`: `ubuntu`
- `OVH_SSH_PRIVATE_KEY`: a dedicated private deployment key authorized for the `ubuntu` account
- `OVH_SSH_KNOWN_HOSTS`: the verified `15.204.82.200 ssh-ed25519 ...` host-key line

Set the repository variable `OVH_DEPLOY_ENABLED` to `true` to enable deployment on pushes to `main`. Keep the private key out of Git and out of this folder. The workflow uses strict host-key checking.

## Server environment

The workflow creates `/opt/nateiva-school-game/ops/ovh-school-game/.env.production` on first deploy if it is missing. It contains only the site port and production mode; it is excluded from sync so server-local settings survive later deployments.

The Caddy route is installed from `nateiva-school-game.caddy` and imported into the existing `vps-6964d2a4.vps.ovh.us` site block. Existing apps keep their own containers and routes. Do not bind this game's container to public ports 80 or 443.
