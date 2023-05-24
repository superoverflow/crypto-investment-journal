## getting started
- make `.env.local`
```
GOOGLE_CLIENT_EMAIL=<service-account-name>@<your gcp project>.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n......\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=<google sheet id>
ALPHAVANTAGE_API_KEY=<https://www.alphavantage.co/ api key>
BINANCE_API_SECRET=
BINANCE_API_KEY=
```
- run 
```
npm run dev
```

## Credits
- [shadcn](https://ui.shadcn.com/)


## APIs
- [Binance](http://localhost:3000/api/binance)
- [Alphavantage](http://localhost:3000/api/alphavantage)