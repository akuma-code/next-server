export default async function Home() {
    const tt = await test();
    console.clear();
    console.log(tt.dbs);
    return <main>Main</main>;
}

async function test() {
    const res = await fetch("https://api.timeweb.cloud/api/v1/databases", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TIMEWEB_CLOUD_TOKEN}`,
            Origin: "localhost:3000",
        },
    });

    return res.json();
}
