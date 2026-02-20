# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
# 1. Match the name "builder" 
# 2. Point to the "/browser" subfolder for static hosting
COPY --from=builder /app/dist/dispute-portal/browser /usr/share/nginx/html

# 3. Add routing fix (prevents 404s on refresh)
RUN sed -i 's|index  index.html index.htm;|index  index.html index.htm; try_files $uri $uri/ /index.html;|g' /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
