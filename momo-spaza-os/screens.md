### **1. Navigation Flow Overview**
The app follows a **"Hub and Spoke"** model where the Dashboard acts as the central nerve center.
*   **The Main Loop:** Dashboard ➔ Sale/Scanner ➔ Checkout ➔ Success.
*   **The Support Loop:** Dashboard ➔ Compliance Vault.
*   **The Operations Loop:** Dashboard ➔ Ledger OR Supplier Pay.

---

### **2. Detailed Screen Specifications**

#### **Screen 1: Merchant Dashboard (Home)**
*   **Purpose:** The daily starting point and status overview.
*   **Key Components:**
    *   **Wallet Summary Card:** Displays MoMo Business balance (synced via API).
    *   **Sync Status Indicator:** A top-corner icon showing if the app is currently connected to the cloud backend.
    *   **Primary Action Button:** Huge "NEW SALE" button with a shopping cart icon.
    *   **Secondary Action Grid:** Icons for "Compliance Vault," "Supplier Pay," and "Sales History."
*   **Flow:** Tapping "New Sale" triggers the WebRTC Camera.

#### **Screen 2: Smart Sale & Scanner**
*   **Purpose:** Building the cart quickly using the camera or manual input.
*   **Key Components:**
    *   **WebRTC Viewfinder:** A live camera feed in the top half of the screen for barcode scanning.
    *   **Manual Entry Field:** A small text box for price entry (fallback).
    *   **Dynamic Cart List:** A bottom-sheet that expands to show scanned items (resolved via Cloud SKU).
    *   **Live Total:** A persistent sticky footer showing the current "Total ZAR."
*   **Flow:** Tapping "Charge" moves to the Checkout screen.

#### **Screen 3: Checkout & QR Generation**
*   **Purpose:** Displaying the payment intent and polling for status.
*   **Key Components:**
    *   **Dynamic QR Component:** Rendered using `qrcode.react`. This is the **Universal QR** (PayShap + MoMo).
    *   **ShapID Label:** Displays the merchant's PayShap ID for customers typing it manually.
    *   **Status Spinner:** A "Waiting for Customer Approval" loader.
    *   **Cancel Transaction:** A prominent button to abort the poll and return to the cart.
*   **Flow:** Once the **Idempotent Polling Strategy** confirms `SUCCESSFUL`, the screen auto-navigates to Success.

#### **Screen 4: Transaction Success (The "Digital Receipt")**
*   **Purpose:** Confirmation and proof of payment.
*   **Key Components:**
    *   **Full-Screen Green Animation:** High-contrast visual for low-literacy environments.
    *   **Large Amount Display:** Big bold text (e.g., **R55.00 PAID**).
    *   **Receipt Reference:** The MoMo X-Reference-Id.
    *   **"Done" Button:** Returns to Dashboard for the next customer.
*   **Flow:** Returns to Screen 1.

#### **Screen 5: The Compliance Vault**
*   **Purpose:** Managing and showing legal documentation.
*   **Key Components:**
    *   **Document Grid:** Showing "CoA" (Certificate of Acceptability) and "Trade License" status.
    *   **"Add Document" Button:** Triggers the HTML5 `<input capture>` camera.
    *   **Inspector Mode:** A high-contrast, read-only view that maximizes the permits on-screen for a health official.
*   **Flow:** Back button returns to Dashboard.

#### **Screen 6: Supplier Pay (B2B)**
*   **Purpose:** Paying wholesalers without using cash.
*   **Key Components:**
    *   **Supplier MSISDN Input:** Field to enter the wholesaler's wallet number.
    *   **Amount & Reference:** Fields for the invoice amount and ID.
    *   **Security Confirm:** A modal confirming: "Pay R2,500 to Tiger Brands?"
*   **Flow:** Tapping "Confirm" triggers the Disbursement API and moves to a Success screen.

#### **Screen 7: Transaction Ledger (History)**
*   **Purpose:** Daily reconciliation.
*   **Key Components:**
    *   **Filter Tabs:** All / MoMo / PayShap / Cash.
    *   **Scrollable List:** Showing time, amount, and sync status for each record.
    *   **Sync Retry Button:** For records that failed the initial cloud push.
*   **Flow:** Tapping an entry shows the full digital receipt details.

---

### **3. Evaluation against Technical Constraints**
*   **WebView Safe:** All components are standard HTML/CSS/React; no native Android fragments.
*   **Connectivity Handling:** Screens 3 and 7 include explicit "Polling" and "Offline Sync" states to manage the unstable internet constraint.
*   **Performance:** By offloading "SKU Resolution" to Screen 2's backend call, the UI remains light and avoids thermal throttling.
