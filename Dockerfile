# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the public content to the Nginx html directory
COPY public /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
