#!/bin/bash
scp -i "/home/lostintheway/ADDON/server/govVM/pemall/nagarjung.pem" -r "build" root@103.69.127.16:/root/bps
ssh -i "/home/lostintheway/ADDON/server/govVM/pemall/nagarjung.pem" root@103.69.127.16 "bash /root/bps/web/deploy_web.sh"