#!/bin/bash
CONF_FILE="/etc/mres/configure.conf"
MRES_DIR="/root/mres"

change_config() {
    cd $MRES_DIR
    cp config.json.default config.json
    sed -i "s/<ethernet_host>/$ETHEREUM_HOST/g" config.json
    sed -i "s/<ethernet_port>/$ETHEREUM_RPC_PORT/g" config.json
    sed -i "s/<ipfs_host>/$IPFS_HOST/g" config.json
    sed -i "s/<ipfs_port>/$IPFS_PORT/g" config.json
    sed -i "s/<ipfs_protocol>/$IPFS_PROTOCOL/g" config.json
}

main () {
    cd $MRES_DIR
    if [ -f /initialization ] && [ `cat /initialization` == "1" ] ; then
        npm start
        exec /sbin/init
    else
        change_config
        npm run build
        echo "1" > /initialization
    fi
}

main "$@"
