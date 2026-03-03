export default function sitemap() {
    const baseUrl = "https://hamzatalhaoz.com"; // User should replace this with their actual domain if different in the future, but we'll use a placeholder or their domain if known. Let's use https://hamzatalhaoz.com based on the Github repo handle htalhazz/hamzatalhaoz

    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        // We can add more dynamic routes if needed, but for a simple portfolio this is a good start.
    ];
}
