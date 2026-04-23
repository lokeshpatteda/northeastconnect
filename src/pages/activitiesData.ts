import {
    Activity1,
    Activity2,
    Activity3,
    Activity4,
    Activity5,
    Activity6,
} from "@/assets/images/images";

export type ActivityData = {
    id: string;
    img: string;
    title: string;
    month: string;
    day: string;
    weekday: string;
    year: string;
    view: string;
    upcome: string;
};

const activities: ActivityData[] = [
    {
        id: "kims-hospital",
        img: Activity1,
        title: "Sensitization program at KIMS Hospital",
        month: "Apr",
        day: "02",
        weekday: "Thursday",
        year: "2026",
        upcome: "",
        view: "View Details",
    },
    {
        id: "continental-hospital",
        img: Activity2,
        title: "Sensitization at Continental Hospital",
        month: "Apr",
        day: "21",
        weekday: "Tuesday",
        year: "2026",
        upcome: "",
        view: "View Details",
    },
    {
        id: "health-awareness",
        img: Activity3,
        title: "Health Awareness Camp",
        month: "Apr",
        day: "10",
        weekday: "Friday",
        year: "2026",
        upcome: "Upcoming",
        view: "View Details",
    },
    {
        id: "community-meetup",
        img: Activity4,
        title: "Community Meetup",
        month: "Apr",
        day: "15",
        weekday: "Wednesday",
        year: "2026",
        upcome: "Upcoming",
        view: "View Details",
    },
    {
        id: "youth-engagement",
        img: Activity5,
        title: "Youth Engagement Program",
        month: "Apr",
        day: "20",
        weekday: "Monday",
        year: "2026",
        upcome: "Upcoming",
        view: "View Details",
    },
    {
        id: "social-awareness",
        img: Activity6,
        title: "Social Awareness Drive",
        month: "Apr",
        day: "25",
        weekday: "Saturday",
        year: "2026",
        upcome: "Upcoming",
        view: "View Details",
    },
];

export default activities;
