#!/bin/bash
scp -i "/home/lostintheway/ADDON/server/govVM/pemall/panauti.pem" -r "build" root@103.69.125.137:/root/bps
ssh -i "/home/lostintheway/ADDON/server/govVM/pemall/panauti.pem" root@103.69.125.137 "bash /root/bps/web/deploy_web.sh"