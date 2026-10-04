import { Metadata } from "next";
import { EventsPageContent } from "@/components/pages/events/EventsPageContent";

export const metadata: Metadata = {
  title: "Events | Kashi Yatra 2027",
  description:
    "Explore all competitions and events at Kashi Yatra 2027 - IIT BHU's grandest cultural fest. Dance, Music, Drama, Fashion, Art, Quiz and more.",
};

export default function EventsPage() {
  return <EventsPageContent />;
}
