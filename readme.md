# pm2-connect

## 想法
遠端監控PM2

由被監控端使用pm2-connect來建立一個Socket Client Server，與Socket Host Server進行連線後，定期的傳送伺服器 & PM2資訊到Host Server上。

~~主要是因為我沒錢租用`keymetrics`，乖乖土砲了~~

Host Server用處：
- 接收各端伺服器的資訊，以及監控Socket連線狀態(`主要是遠端的Socket斷線應傳送要警報資訊`)
- 提供GUI介面顯示伺服器的狀況


## Cli Example (構思)

```

$ pm2-connect link [hostServerUrl]
$ pm2-connect server -p [port]

```

## API

> 暫不做，先把CLI搞好在說

## TODO
- [X] Cli Command Line Generate
- [X] Client Connect Socket Send Data
- [ ] Web Site
  - [ ] Server Generate
  - [ ] GUI Design
- [X] OS Status
- [X] PM2 Status
- [ ] PM2 Log Stream
