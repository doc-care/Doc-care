Galaxy Hospital — Patient App

Includes the smartphone-token alert integration.

FLOW
1. Patient gets a real token from the backend.
2. The patient panel registers a service worker and asks for notification permission.
3. The panel registers its Web Push subscription against that token/device.
4. Doctor/Admin calls the next patient using /api/admin/next.
5. Backend sends a push only when that exact patient's token becomes SERVING.
6. Phone notification text:
   "Aapka number aa gaya hai. Aap doctor ke paas jayein."
7. When the patient page is available, the same message is spoken 3 times.

Keypad and physical-token patients are not changed by this patient-side feature.

The backend must have VAPID keys configured for background push notifications.
