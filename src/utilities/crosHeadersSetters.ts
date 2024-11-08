export default function crosHeadersSetters(headers: Response["headers"]) {
    headers.set("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN);
    headers.set("Access-Control-Allow-Headers", "Authorization");
    headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
};
