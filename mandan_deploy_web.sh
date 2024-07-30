#!/bin/bash
scp -i "/home/lostintheway/ADDON/server/govVM/pemall/mandandeupur.pem" -r "build" root@103.69.126.44:/root/bps
ssh -i "/home/lostintheway/ADDON/server/govVM/pemall/mandandeupur.pem" root@103.69.126.44 "bash /root/bps/web/deploy_web.sh"