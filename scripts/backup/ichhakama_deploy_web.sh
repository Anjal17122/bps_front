#!/bin/bash
scp -i "/home/lostintheway/ADDON/server/govVM/pemall/ichhakamana.pem" -r "build" root@103.69.126.25:/root/bps
ssh -i "/home/lostintheway/ADDON/server/govVM/pemall/ichhakamana.pem" root@103.69.126.25 "bash /root/bps/web/deploy_web.sh"