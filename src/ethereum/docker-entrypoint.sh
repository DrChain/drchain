#!/bin/bash

CONF_FILE="/etc/ethereum/configure.conf"
source $CONF_FILE
RULE="$1"

cd $NOTIFIER_DIR
if [ -f /initialization ] && [ `cat /initialization` == "1" ]; then
    echo "$(date +'[%d/%b/%Y %T]') Start Ethereum" >> $LOG_DIR/ethereum.log
    geth --datadir /root/ethereum/node --networkid 9487 --port 8740 \
         --rpc --rpcaddr 0.0.0.0 --rpcport 1987 --rpcapi "web3,eth" \
         1>/$LOG_DIR/ethereum.log 2>$LOG_DIR/ethereum.err.log &
    sleep 3
    echo "$(date +'[%d/%b/%Y %T]') Set miner" >> $LOG_DIR/ethereum.log
    address=$(cat /root/address.txt)
    bash /tmp/files/set_miner.sh $address
    if [ "$RULE" != "--firstnode" -o "$RULE" != "-f" ] ; then
        echo "$(date +'[%d/%b/%Y %T]') Join to pool" >> $LOG_DIR/ethereum.log
        bash /tmp/files/join_pool.sh
    fi
    exec /sbin/init

else
    echo "$(date +'[%d/%b/%Y %T]') Start Init Ethereum" >> $LOG_DIR/ethereum.log
    geth --datadir /root/ethereum/node init /root/ethereum/genesis.json
    address=$(bash /tmp/files/create_account.sh \
              | awk -F"{" '{ print $2 }' | sed "s/}//g" )
    echo $address >> /root/address.txt
    echo "$(date +'[%d/%b/%Y %T]') Finished Init Ethereum" >> $LOG_DIR/ethereum.log

    if [ ! -f /initialization ]; then
        touch /initialization
    else
        sed -i '1,$d' /initialization
    fi
    echo "1" > /initialization
fi
