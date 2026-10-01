export interface Certificate {
  /** The certificate's or authorisation's name, as printed on it. */
  name: string;
  /** Who issued it. */
  issuer?: string;
  /** One or two sentences on what it covers. */
  description?: string;
  /** Expiry date as printed on the certificate. */
  validUntil?: string;
}

// The company's own certificates and authorisations. None were supplied and none are listed in
// any public source we could find, so the list stays empty until the client provides them —
// never fill it with assumed or typical industry certificates. While it is empty, /certifikat
// shows a short notice instead of the list.
export const certificates: Certificate[] = [];
