export async function detectBrowser() {
    const userAgent = navigator.userAgent;
    const userAgentData = navigator.userAgentData || {};

    // Check for Brave (Brave hides as Chrome)
    if (navigator.brave || 
        (userAgent.includes("Chrome") && userAgentData.brands && 
        userAgentData.brands.some(b => b.brand === "Brave"))) {
        return "Brave";
    }

    if (userAgent.includes("Edg")) {
        return "Microsoft Edge";
    } else if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
        return "Opera";
    } else if (userAgent.includes("Chrome") && !userAgent.includes("Edg") && !userAgent.includes("OPR")) {
        return "Google Chrome";
    } else if (userAgent.includes("Firefox")) {
        return "Firefox";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        return "Apple Safari";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        return "Internet Explorer";
    } else {
        return "Unknown Browser";
    }
}
