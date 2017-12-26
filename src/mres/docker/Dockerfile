FROM node:7.7.1
MAINTAINER bingmu@gmail.com

# ENV VAR
ENV HOME=/root WORKDIR=/root/mres

# Switch to /root
WORKDIR $HOME

# Setting time zone
RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime

# Prepare env
RUN mkdir -p $WORKDIR
COPY . $WORKDIR

# Install package
RUN cd $WORKDIR \
    && npm install -g pm2 \
    && yarn install \
    && apt-get update \
    && apt-get install -y vim

COPY docker/docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
