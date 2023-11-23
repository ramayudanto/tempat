import posthog from "posthog-js";

export const captureEvent = (eventName: string, properties?: any) => {
  posthog.capture(eventName, properties);
};
