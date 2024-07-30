#!/bin/bash
filename='bps-backend.jar'
echo started copying new $filename to server
scp -i "panauti.pem" -r "../jars/bps-backend.jar" root@103.69.126.109:/root/bps
ssh -i "panauti.pem" root@103.69.126.109 "bash /root/bps/deploy-bps.sh"