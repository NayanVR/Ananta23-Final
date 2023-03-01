import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { analytics } from '../firebase';
import { logEvent } from "firebase/analytics";

export default function FirebaseAnalytics() {
    let location = useLocation();
    useEffect(() => {
        const { pathname } = location;
        let page = pathname.substring(1);
        if (page === "") page = "home";
        page = page.replace(/\//g, "_");
        logEvent(analytics, "page_view", {
            page_title: page,
            page_location: window.location.href,
            page_path: pathname,
        });
    }, [location.pathname]);
    return null;
}
