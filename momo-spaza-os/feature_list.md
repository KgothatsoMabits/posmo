# MVP Feature List: MoMo Spaza POS Mini App

This feature list follows the **architectural pivot** defined in the Software Project Management (SPM) report. It prioritizes lightweight, cloud-reliant execution to ensure stability within the MTN MoMo Super App's WebView sandbox.

---

## 1. Universal QR Payment Engine (MoMo & PayShap)
**Description:** A dynamic payment screen that generates a single, interoperable QR code. It allows the merchant to accept payments from the native MoMo ecosystem and all major South African banking apps via the PayShap rail.

| Success Criteria | Metric/Requirement |
| :--- | :--- |
| **Generation Speed** | QR code must render on the React frontend in **< 2 seconds** after amount entry. |
| **Interoperability** | Must successfully embed a **ShapID** (MSISDN-based) that is decodable by simulated banking apps. |
| **UX Responsiveness** | Real-time transition from "Pending" to "Success" UI states using the **Idempotent Polling Strategy**. |

---

## 2. Cloud-Assisted Smart Barcode Scanner
**Description:** A lightweight JavaScript-based barcode scanner using WebRTC. Instead of heavy on-device OCR, it scans EAN-13 codes and resolves product names/prices via a cloud-hosted PostgreSQL master catalog.

| Success Criteria | Metric/Requirement |
| :--- | :--- |
| **Hardware Access** | Must successfully invoke the device camera via the **MoMo JS Bridge** without thermal throttling. |
| **Resolution Speed** | Product name and price must be returned from the Node.js backend in **< 500ms** after a successful scan. |
| **Manual Fallback** | 100% availability of a "Manual Entry" button if the barcode is not found in the master SKU catalog. |

---

## 3. The "Compliance Vault" (Document Capture)
**Description:** A critical regulatory feature allowing merchants to photograph and store municipal trading permits and "Certificates of Acceptability" (CoA) to protect against fines and extortion during municipal crackdowns.

| Success Criteria | Metric/Requirement |
| :--- | :--- |
| **Capture Success** | Successful trigger of the native camera using `HTML5 <input capture="environment">` within the WebView. |
| **Secure Storage** | Documents must be successfully persisted to an **AWS S3 bucket** and linked to the merchant's UUID. |
| **Verification View** | A one-tap "Inspector View" that displays the merchant's verified identity alongside their stored permits. |

---

## 4. Closed-Loop B2B Supplier Settlements
**Description:** Transitions the app from a collection tool to a business engine, allowing spaza owners to pay wholesalers directly from their MoMo Business Wallet using the Disbursements API.

| Success Criteria | Metric/Requirement |
| :--- | :--- |
| **Transaction Safety** | **100% Idempotency** guaranteed via Version 4 UUIDs (X-Reference-Id) to prevent double-payments to suppliers. |
| **API Integration** | Successful execution of the `POST /disbursement` call with a valid OAuth 2.0 bearer token. |
| **Settlement Speed** | Supplier must receive the wallet-to-wallet transfer in **under 60 seconds**. |

---

## 5. Resilient Transaction Ledger & Reporting
**Description:** A cloud-synced daily sales dashboard. Since WebView storage is volatile, this ledger relies on the PostgreSQL backend to provide a persistent record of all digital and cash-based sales.

| Success Criteria | Metric/Requirement |
| :--- | :--- |
| **Data Resilience** | Transaction history must survive a **cache clear** or app re-install by fetching state from the cloud. |
| **Sync Accuracy** | The dashboard must reconcile three payment types: **MoMo Push, PayShap QR, and Cash-in-Hand.** |
| **Polling Reliability** | The system must correctly update status via the `/requesttopay/{id}` endpoint even if the initial webhook callback fails. |

---

## Technical Summary for the Team
*   **Frontend:** React.js / Next.js (PWA Export)
*   **Backend:** Node.js (Express) on AWS
*   **Database:** PostgreSQL (RDS) for the Ledger + Redis for Session Caching
*   **Scanning:** `html5-qrcode` library (WebRTC)
*   **State:** Redux Toolkit for managing the "Asynchronous State Machine" of payments.