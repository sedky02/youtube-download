FROM node:22

# Install dependencies for yt-dlp and ffmpeg
RUN set -xe \
    && apt-get update -y \
    && apt-get install -y pipx \
    && apt-get install -y ffmpeg
RUN pipx install yt-dlp

# Set working directory
WORKDIR /app

# Copy files and install dependencies
COPY . .
RUN npm install

# Expose API port
EXPOSE 3000

CMD ["npm", "run", "start"]
