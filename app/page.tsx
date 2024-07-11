export default async function Home() {
    const tt = await test();
    console.clear();
    console.log(await tt.json());
    return <main>Main</main>;
}

async function test() {
    const res = fetch("https://api.timeweb.cloud/api/v1/auth/api-keys", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TIMEWEB_CLOUD_TOKEN}`,
            Origin: "localhost:3000",
        },
    });

    return res;
}
