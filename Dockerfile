FROM node:20

# Install Python, pip, ffmpeg, yt-dlp
RUN apt update && apt install -y python3 python3-pip ffmpeg
RUN pip3 install yt-dlp --break-system-packages

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
