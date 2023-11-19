ARG VARIANT="20-buster"

FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

RUN ENABLE_NONROOT_DOCKER=true \
  USERNAME=node \
  /bin/bash \
  -c "$(curl -fsSL https://raw.githubusercontent.com/devcontainers/features/main/src/docker-outside-of-docker/install.sh)"

RUN apt-get update && apt-get install gnupg2 -y

RUN su node -c "npm install -g yarn"

RUN usermod -aG docker node