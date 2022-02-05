FROM nginx:1.18.0-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM node:10.24.1-alpine AS build
# WORKDIR /usr/src/app
# COPY package.json .
# COPY package-lock.json .
# RUN npm install
# COPY . .
# RUN npm run build --prod --base-href
# FROM nginx:1.18.0-alpine
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=build /usr/src/app/dist/project-final /usr/share/nginx/html
# CMD ["nginx","-g","daemon off;"]