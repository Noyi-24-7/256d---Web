/**
 * payments.ts — typed stubs for the 256d business logic layer.
 *
 * These signatures match the functions in `thatfrontend/src/app/lib/`.
 * Replace each `null` / `false` body with the real implementation when porting.
 *
 * Environment variables (add to .env.local):
 *   NEXT_PUBLIC_UPILN_SERVER   — domain suffix for the LNURL server
 *   NEXT_PUBLIC_API_SERVER     — base URL for debug / analytics API
 *   NEXT_PUBLIC_UPI_MAX_AMOUNT — ceiling for payment amounts (default: 100)
 *   NEXT_PUBLIC_UPI_MIN_AMOUNT — floor for payment amounts (default: 10)
 */

// ─── Types ───────────────────────────────────────────────────────────────────

/** Parsed fields from a scanned UPI QR string. */
export interface UpiData {
    /** Merchant UPI ID, e.g. "tjindia@icici" */
    upi_id: string
    /** Merchant display name */
    name: string
    /** Amount in the local currency (INR) */
    amount?: number
    /** Currency code, defaults to "inr" */
    ccy: string
    /** Merchant category code (optional) */
    mc?: string
    /** Transaction reference (optional) */
    tr?: string
    /** Transaction note (optional) */
    tn?: string
}

/** Response from an LNURL pay endpoint (lightning address lookup). */
export interface LnAddressData {
    callback: string
    minSendable: number
    maxSendable: number
    metadata: string
    tag: string
}

/** Response from an LNURL callback (invoice generation). */
export interface LnInvoiceData {
    pr: string
    successAction?: {
        tag: string
        message?: string
        url?: string
    }
}

// ─── Constants ───────────────────────────────────────────────────────────────

export const MAX_AMOUNT = Number(process.env.NEXT_PUBLIC_UPI_MAX_AMOUNT) || 100
export const MIN_AMOUNT = Number(process.env.NEXT_PUBLIC_UPI_MIN_AMOUNT) || 10

// ─── UPI Helpers ─────────────────────────────────────────────────────────────

/**
 * Parses a UPI deep-link string into structured data.
 * Format: `upi://pay?pa=<upi_id>&pn=<name>&am=<amount>&cu=<currency>`
 *
 * @param text — raw QR scan string or manually entered UPI URL
 * @returns UpiData if valid, null otherwise
 */
export const parseUpiText = (_text: string): UpiData | null => {
    // TODO: port from thatfrontend/src/app/lib/funcs.js → parseUpiText()
    return null
}

/**
 * Validates a UPI ID against the standard username@bank format.
 *
 * @param upi — UPI ID string to validate
 * @returns true if the format is valid
 */
export const isValidUpi = (_upi: string): boolean => {
    // TODO: port from thatfrontend/src/app/lib/funcs.js → isValidUpi()
    return false
}

/**
 * Checks whether an INR amount falls within the allowed payment range.
 *
 * @param amount — amount as a number or numeric string
 */
export const isAmountValid = (_amount: number | string): boolean => {
    // TODO: port from thatfrontend/src/app/lib/funcs.js → isAmountValid()
    return false
}

// ─── Lightning / LNURL ───────────────────────────────────────────────────────

/**
 * Resolves a UPI ID to an LNURL pay endpoint via the 256d LNURL server.
 * Constructs: `https://<bank>.<UPILN_SERVER>/.well-known/lnurlp/<username>`
 *
 * @param upiId — e.g. "john@icici"
 * @returns LnAddressData if found, false on failure
 */
export const fetchLnAddress = async (_upiId: string): Promise<LnAddressData | false> => {
    // TODO: port from thatfrontend/src/app/lib/lnurl.js → fetchLnAddress()
    return false
}

/**
 * Fetches a Lightning invoice from an LNURL callback URL.
 *
 * @param callback   — callback URL from the LnAddressData response
 * @param ccy        — currency code (e.g. "inr")
 * @param inrAmount  — amount in INR
 * @returns LnInvoiceData if successful, false on failure
 */
export const fetchLNInvoice = async (
    _callback: string,
    _ccy: string,
    _inrAmount: number,
): Promise<LnInvoiceData | false> => {
    // TODO: port from thatfrontend/src/app/lib/lnurl.js → fetchLNInvoice()
    return false
}
