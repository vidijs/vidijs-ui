FROM nginx
COPY build /usr/share/nginx/html
COPY proxy.template /etc/nginx/conf.d/proxy.template
ENV VIDISPINE_URL=http://localhost:8080
CMD ["/bin/bash", "-c", "envsubst < /etc/nginx/conf.d/proxy.template > /etc/nginx/conf.d/default.conf && envsubst < /usr/share/nginx/html/index.html > /tmp/_index.html && mv -f /tmp/_index.html /usr/share/nginx/html/index.html && nginx -g 'daemon off;'"]
