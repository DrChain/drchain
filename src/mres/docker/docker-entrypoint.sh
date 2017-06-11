#!/bin/bash
CONF_FILE="/etc/mres/configure.conf"
MRES_DIR="/root/mres"
source $CONF_FILE

change_config() {
    cd $MRES_DIR
    cp $MRES_DIR/env/config.json.default $MRES_DIR/env/config.json
    sed -i "s/<ethernet_host>/$ETHEREUM_HOST/g" $MRES_DIR/env/config.json
    sed -i "s/<ethernet_port>/$ETHEREUM_RPC_PORT/g" $MRES_DIR/env/config.json
    sed -i "s/<ipfs_host>/$IPFS_HOST/g" $MRES_DIR/env/config.json
    sed -i "s/<ipfs_port>/$IPFS_PORT/g" $MRES_DIR/env/config.json
    sed -i "s/<ipfs_protocol>/$IPFS_PROTOCOL/g" $MRES_DIR/env/config.json
    cp env/backend.js.example $MRES_DIR/env/backend.js
    sed -i "s/<backend_port>/$MRES_BACKEND_PORT/g" $MRES_DIR/env/backend.js
    sed -i "s/<ws_port>/$MRES_WEBSOCKET_PORT/g" $MRES_DIR/env/backend.js
}

main () {
    cd $MRES_DIR
    if [ -f /initialization ] && [ `cat /initialization` == "1" ] ; then
        pm2 start $MRES_DIR/bin/www
        pm2 start $MRES_DIR/routes/listener.js
        exec /sbin/init
    else
        change_config
        npm run build
        echo "1" > /initialization
    fi
}

main "$@"
