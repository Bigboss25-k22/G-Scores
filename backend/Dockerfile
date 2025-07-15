# Sử dụng Node.js image chính thức
FROM node:18

# Tạo thư mục app
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Expose port (giả sử backend chạy ở 3001)
EXPOSE 3001

# Lệnh chạy app
CMD ["npm", "run", "start"]