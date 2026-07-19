import TagManager from "react-gtm-module";

export const initializeTagManager = () => {
  TagManager.initialize({
    gtmId: import.meta.env.VITE_GTM_ID,
  });
};
