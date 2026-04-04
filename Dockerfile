FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

# RUN chmod 755 /usr/share/nginx/html/posts/ && \
#     find /usr/share/nginx/html/posts/ -name "*.html" -exec chmod 644 {} \;

