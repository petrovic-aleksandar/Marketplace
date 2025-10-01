FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --configuration=production

FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/Marketplace/browser /usr/share/nginx/html
EXPOSE 80

#Build and run commands
#docker build -t marketplace .
#docker run -d -p 4200:80 marketplace
