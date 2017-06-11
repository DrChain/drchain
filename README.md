# Dr. Chain

Healthcare Hackathon

- [note](https://hackmd.io/GYRgzAnApsEEwFoQA4BGUEBYIEMBsCyArGAOwKpHBFTJkDGm9UQA)

# Pre-install
+ Docker version 17.05.0-ce
+ Docker-compose version 1.13.0
+ Git

# Dr.Chain
### prepare environment
1. Execute ```bash install.sh``` to prepare environment.

### Execute
1. ```docker-compose up -d``` to start container(mres, ethereum, explorer, ipfs)

### Port mapping
| container_name     | service       | port        |
| :----------------- |:------------- | :---------- |
| mres               | mres          | 80          |
| mres               | websocket     | 4000        |
| ethereum           | p2p           | 8740        |
| ethereum           | rpc           | 1987        |
| explorer           | explorer      | 3000        |
| ipfs               | api           | 5001        |
