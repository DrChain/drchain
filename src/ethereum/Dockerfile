FROM ubuntu:14.04
MAINTAINER wubm <wubm@cepave.com>

# ENV VAR
ENV HOME /root
ENV TERM xterm

# Switch to /root
WORKDIR $HOME

# Setting time zone
RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime

# Update and install package
RUN apt-get update -y \
    && apt-get install -y software-properties-common curl \
    && add-apt-repository -y ppa:ethereum/ethereum \
    && apt-get update -y \
    && curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - \
    && apt-get install -y ethereum solc nodejs

# Prepare chain folder
RUN mkdir -p /root/ethereum/node

# Copy files to container
ADD files /tmp/files

# Copy genesis.json
RUN cp /tmp/files/genesis.json /root/ethereum/genesis.json

## Initiate ethereum
#RUN geth --datadir /root/ethereum/node init /root/ethereum/genesis.json

EXPOSE 1987 8740

COPY docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
