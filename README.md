## Prayer time tracking app

This is a nextjs, typescript PWA app to help track the 5 daily muslim prayers. Prayer times vary from place to place, this app's data is based on the times in london.

<img src="/public/mockup2.png" width="400" />
<img src="/public/mockup1.png" width="400" />

## Data fetching
This app does not connect to a database but uses next router to serve data from a local json file. The file is located in `/data` and the API endpoint is defined in `/src/app/api/route.ts`.

Sending a request to `localhost:3000/api?day=2024-03-23` returns the prayer times for the given day.

<details>
<summary>API response</summary>

``` json
{
    "status": "success",
    "data": [
        {
            "name": "Fajr",
            "adhan": "04:18",
            "iqama": "04:38",
            "icon": "/sunrise.svg"
        },
        {
            "name": "Dhuhr",
            "adhan": "12:12",
            "iqama": "12:45",
            "icon": "/dhuhr.svg"
        },
        {
            "name": "Asr",
            "adhan": "15:31",
            "iqama": "16:00",
            "icon": "/dhuhr.svg"
        },
        {
            "name": "Maghrib",
            "adhan": "18:23",
            "iqama": "18:23",
            "icon": "/maghrib.svg"
        },
        {
            "name": "Isha",
            "adhan": "19:42",
            "iqama": "20:00",
            "icon": "/isha.svg"
        }
    ]
}
```

</details>

---

### Running the app

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Check out our [deployed version](https://salah-time-three.vercel.app/) and add it to your phone (this app is designed for mobile).
