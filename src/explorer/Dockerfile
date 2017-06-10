FROM node:7.7.1
MAINTAINER wubm@cepave.com

# ENV VAR
ENV HOME=/root WORKDIR=/root/explorer

# Switch to /root
WORKDIR $HOME

# Setting time zone
RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime

# Prepare env
RUN git clone https://github.com/ethereumproject/explorer \
    && dpkg-divert --local --rename --add /sbin/initctl \
    && dpkg-divert --local --rename --add /etc/init.d/mongod \
    && ln -s /bin/true /etc/init.d/mongod \
    && apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6 \
    && echo "deb http://repo.mongodb.org/apt/debian jessie/mongodb-org/3.4 main" \
            >> /etc/apt/sources.list.d/mongodb-org-3.4.list \
    && apt-get update \
    && apt-get install -y mongodb-org vim

# Install package
RUN cd $WORKDIR \
    && git submodule update --init --recursive \
    && cd local_modules/solc/ \
    && npm install \
    && cd $WORKDIR \
    && npm install

COPY docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
