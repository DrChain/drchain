#!/bin/bash
CONF_FILE="/etc/vchain/configure.conf"
ARG="$1"

change_config() {
    cd $EXPLORER_DIR
}

main () {
    cd $EXPLORER_DIR
    if [ -f /initialization ] && [ `cat /initialization` == "1" ] ; then
        npm start
        exec /sbin/init
    else
        
        echo "1" > /initialization
    fi
}

main "$@"
