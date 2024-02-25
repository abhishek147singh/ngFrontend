FROM node:18.18.1-alpine as build
WORKDIR /app
COPY . .
RUN npm install --force
COPY . /app
ARG configuration=production
RUN npm run build --production

# Stage 2, use the compiled app, ready for production with Nginx
FROM nginx:alpine
Expose 80
Expose 443
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/ng-frontend/browser /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html