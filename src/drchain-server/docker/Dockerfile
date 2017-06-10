FROM node:7.7.1
MAINTAINER wubm@cepave.com

# ENV VAR
ENV HOME=/root WORKDIR=/root/explorer

# Switch to /root
WORKDIR $HOME

# Setting time zone
RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime

# Prepare env
RUN git clone https://github.com/carsenk/explorer

# Install package
RUN cd $WORKDIR \
    && npm install \
    && bower install

COPY docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
