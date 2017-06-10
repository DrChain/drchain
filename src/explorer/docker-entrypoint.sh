#!/bin/bash
CONF_FILE="/etc/explorer/configure.conf"
source $CONF_FILE
EXPLORER_DIR="/root/explorer"
LOG_DIR="/var/log/explorer"

change_config() {
    cd $EXPLORER_DIR
    sed -i "s/localhost/$ETHEREUM_HOST/g" $EXPLORER_DIR/tools/grabber.js
    sed -i "s/8545/$ETHEREUM_RPC_PORT/g" $EXPLORER_DIR/tools/config.json
    sed -i "s/2000000/0/g" $EXPLORER_DIR/tools/config.json
    sed -i "s/localhost:8545/$ETHEREUM_HOST:$ETHEREUM_RPC_PORT/g" $EXPLORER_DIR/routes/web3relay.js
}

main () {
    cd $EXPLORER_DIR
    if [ -f /initialization ] && [ `cat /initialization` == "1" ] ; then
        mongod 1>>$LOG_DIR/mongo.log 2>>$LOG_DIR/mongo.err.log &
        cd $EXPLORER_DIR/tools
        echo "Waitting ethereun ready." >> $LOG_DIR/explorer.log
        until curl $ETHEREUM_HOST:$ETHEREUM_RPC_PORT 1>>/dev/null 2>>/dev/null ; do
            sleep 1
            printf "." >> $LOG_DIR/explorer.log
        done
        sleep 10
        echo "Start explorer" $LOG_DIR/explorer.log
        node grabber.js 1>>$LOG_DIR/grabber.log 2>>$LOG_DIR/grabber.err.log &
        cd $EXPLORER_DIR
        node app.js 1>>$LOG_DIR/explorer.log 2>>$LOG_DIR/explorer.err.log &
        exec /sbin/init
    else
        change_config
        echo "1" > /initialization
    fi
}

main "$@"
