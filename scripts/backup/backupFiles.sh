#!/bin/bash
echo "syncing backup to s3"
sudo aws s3 sync /naksapass/ s3://butwal-backup/
sudo aws s3 sync /digi/ s3://bagmati-sarlahi-backup/
sudo aws s3 sync /home/projects/bps/files/dataentry s3://mandandeupur-dataentry/
echo "syncing complete"
aws s3 sync s3://digi-panauti-backup/ /home/projects/bps/files/dataentry