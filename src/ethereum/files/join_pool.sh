#!/bin/bash
CONF_FILE="/etc/ethereum/configure.conf"
source $CONF_FILE

if [ -z "$POOL_NODEINFO" ] ; then
    exit
fi

geth attach ipc://root/ethereum/node/geth.ipc << EOF
admin.addPeer('$POOL_NODEINFO')

exit

EOF
