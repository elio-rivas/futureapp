import ReactGA from "react-ga4";

export const initAnalytics = () => {
    ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
};

export const trackPage = (path: string) => {
    ReactGA.send({
        hitType: "pageview",
        page: path,
    });
};
