FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Thêm dòng này sau khi copy code vào image
RUN npx prisma generate

RUN npm run build

# Nếu muốn tối ưu, có thể xóa devDependencies sau khi build:
RUN npm prune --production

EXPOSE 3001

CMD ["npm", "run", "start"]