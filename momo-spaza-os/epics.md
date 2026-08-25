### **Epic 1: Universal Payments & Interoperability**

**User Story 1: The Single QR Acceptance**
*   **As a** spaza shop owner,
*   **I want to** display a single QR code that works for both MoMo and traditional bank apps (via PayShap),
*   **So that** I never have to turn away a customer who doesn't use the MoMo app.
*   **Acceptance Criteria:**
    *   App generates a PayShap-compliant QR code in < 2 seconds.
    *   The QR code successfully embeds the merchant's MSISDN as a ShapID.
    *   The UI remains in a "Listening" state until the backend confirms settlement.

**User Story 2: Resilient Payment Confirmation**
*   **As a** merchant operating in a patchy network area,
*   **I want** the app to automatically verify payment status even if the initial notification (webhook) fails,
*   **So that** I am 100% sure the money is in my wallet before I hand over the goods.
*   **Acceptance Criteria:**
    *   The system implements an **Idempotent Polling Strategy** (every 5 seconds).
    *   The UI displays a clear "Success" animation once the terminal state is reached.
    *   If the app is closed and reopened, it resumes polling for the last pending transaction.

---

### **Epic 2: Cloud-Assisted Inventory**

**User Story 3: Rapid Item Recognition**
*   **As a** busy shop owner,
*   **I want to** scan a product barcode using my phone's camera and have the name and price auto-fill,
*   **So that** I can serve long queues of customers faster without manual typing.
*   **Acceptance Criteria:**
    *   Scanner invokes the camera via **WebRTC** protocols.
    *   The EAN-13 barcode is resolved against the **Cloud Master Catalog** (PostgreSQL).
    *   System falls back to a "Manual Price" entry if the item is not in the top 1,000 SKUs.

---

### **Epic 3: Regulatory Compliance (The "Vault")**

**User Story 4: Digital Permit Storage**
*   **As a** spaza owner facing municipal inspections,
*   **I want to** take photos of my Certificate of Acceptability and trading license and store them in the app,
*   **So that** I can instantly prove my compliance to health inspectors and avoid extortion or closure.
*   **Acceptance Criteria:**
    *   Utilizes HTML5 camera capture to upload images to AWS S3.
    *   Provides a high-contrast "Verification View" for inspectors.
    *   Integrates with **MoMo KYC API** to show the merchant is a "Verified Business."

---

### **Epic 4: B2B Supplier Settlements**

**User Story 5: Cashless Wholesale Payments**
*   **As a** merchant,
*   **I want to** pay my wholesale suppliers (e.g., Cash & Carry) directly from my MoMo Business Wallet using the app,
*   **So that** I don't have to carry large amounts of physical cash, which makes me a target for robbery.
*   **Acceptance Criteria:**
    *   Merchant can enter a supplier's MoMo number and invoice amount.
    *   System generates a **Version 4 UUID** for the disbursement to prevent double-payment.
    *   Transaction is recorded in the **Cloud Ledger** as a settled wholesale invoice.

---
