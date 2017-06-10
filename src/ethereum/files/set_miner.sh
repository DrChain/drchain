#!/bin/bash
ADDR=$1

geth attach ipc://root/ethereum/node/geth.ipc << EOF
miner.setEtherbase('0x$ADDR')

miner.start()

exit

EOF
