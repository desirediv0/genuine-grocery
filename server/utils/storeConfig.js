/**
 * Store Configuration Utility
 * Centralized configuration for store name, email, and other store-specific settings
 * All values can be overridden via environment variables
 */

export const getStoreConfig = () => {
  return {
    // Store Information
    storeName: process.env.STORE_NAME || "Genuine Grocery",
    storeEmail: process.env.STORE_EMAIL || "connect.genuinenutrition@gmail.com",
    storePhone: process.env.STORE_PHONE || "+91 9582855132",
    storeAddress:
      process.env.STORE_ADDRESS || "89/2 Sector 39, Gurugram, Haryana",

    // Store Description/Tagline
    storeTagline: process.env.STORE_TAGLINE || "Pure. Fresh. Local.",
    storeDescription:
      process.env.STORE_DESCRIPTION ||
      "Premium nutritional products sourced directly from fresh farms.",

    // Email Configuration
    fromName: process.env.FROM_NAME || process.env.STORE_NAME || "Genuine Grocery",
    fromEmail:
      process.env.FROM_EMAIL ||
      process.env.STORE_EMAIL ||
      process.env.SMTP_USER ||
      "connect.genuinenutrition@gmail.com",

    // Website Information
    websiteUrl: process.env.WEBSITE_URL || "https://genuinegrocery.com",
    supportEmail:
      process.env.SUPPORT_EMAIL ||
      process.env.STORE_EMAIL ||
      "connect.genuinenutrition@gmail.com",

    // Social Media (optional)
    socialFacebook: process.env.SOCIAL_FACEBOOK || "https://www.facebook.com/share/1DCsKYB5Uy/?mibextid=wwXIfr",
    socialTwitter: process.env.SOCIAL_TWITTER || "",
    socialInstagram: process.env.SOCIAL_INSTAGRAM || "https://www.instagram.com/official_GenuineGrocery/",
    socialYoutube: process.env.SOCIAL_YOUTUBE || "https://youtube.com/@GenuineGroceryindia?si=ZkkCpU1DEh48NBSe",
  };
};

/**
 * Get store name
 */
export const getStoreName = () => {
  return getStoreConfig().storeName;
};

/**
 * Get store email
 */
export const getStoreEmail = () => {
  return getStoreConfig().storeEmail;
};

/**
 * Get from name for emails
 */
export const getFromName = () => {
  return getStoreConfig().fromName;
};

/**
 * Get from email for emails
 */
export const getFromEmail = () => {
  return getStoreConfig().fromEmail;
};

/**
 * Get full store information object
 */
export const getFullStoreInfo = () => {
  const config = getStoreConfig();
  return {
    name: config.storeName,
    email: config.storeEmail,
    phone: config.storePhone,
    address: config.storeAddress,
    tagline: config.storeTagline,
    description: config.storeDescription,
    websiteUrl: config.websiteUrl,
    supportEmail: config.supportEmail,
    fromName: config.fromName,
    fromEmail: config.fromEmail,
    social: {
      facebook: config.socialFacebook,
      twitter: config.socialTwitter,
      instagram: config.socialInstagram,
      youtube: config.socialYoutube,
    },
  };
};

export default getStoreConfig;
