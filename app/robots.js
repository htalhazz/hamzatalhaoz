export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin/", "/api/"],
        },
        sitemap: "https://hamzatalhaoz.com/sitemap.xml",
    };
}
