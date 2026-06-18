/** Default payment methods for invoice creation examples. */
export const DEFAULT_INVOICE_PAYMENT_METHODS = {
  mada: true,
  visa: true,
  mastercard: true,
  amex: true,
  bank_transfer: false,
  installment: false,
  qurrah: false,
};

/**
 * Map request body to current CouponCreate schema.
 * Accepts legacy fields: code, discount_type.
 */
export function mapCouponCreateInput(data = {}) {
  const isPercentage =
    data.is_percentage !== undefined
      ? Boolean(data.is_percentage)
      : String(data.discount_type || "PERCENTAGE").toUpperCase() !== "FIXED_AMOUNT";

  const coupon = {
    name: data.name || data.code || `DISCOUNT${Date.now()}`,
    discount_value: parseFloat(data.discount_value) || 10,
    is_percentage: isPercentage,
    is_active: data.is_active !== undefined ? Boolean(data.is_active) : true,
  };

  if (!isPercentage) {
    coupon.currency = data.currency || "SAR";
  }

  return coupon;
}

/**
 * Map request body to current ProductCreate schema.
 * Accepts legacy `price` and maps to `prices[]`.
 */
export function mapProductCreateInput(data = {}) {
  const currency = data.currency || "SAR";
  const amount = parseFloat(data.price ?? data.amount) || 99.99;
  const type = data.type || "ONE_OFF";

  const product = {
    name: data.name || "Sample Product",
    description: data.description || "A sample product",
    type,
    is_one_time: data.is_one_time !== undefined ? Boolean(data.is_one_time) : type === "ONE_OFF",
    recurring_interval_count: data.recurring_interval_count || 1,
    prices: data.prices || [
      {
        currency,
        amount,
        is_price_inclusive_of_vat: true,
        is_price_exempt_from_vat: false,
      },
    ],
  };

  if (type === "RECURRING" && data.recurring_interval) {
    product.recurring_interval = data.recurring_interval;
  }

  return product;
}

/** Map request body to CreatePaymentLinkDto. */
export function mapPaymentLinkCreateInput(data = {}) {
  const paymentLink = {
    name: data.name || "Payment Link",
    currency: data.currency || "SAR",
    items: (data.items || []).map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity ?? 1,
      allow_custom_quantity: item.allow_custom_quantity ?? false,
      ...(item.coupons ? { coupons: item.coupons } : {}),
    })),
    success_redirect_url: data.success_redirect_url || process.env.SUCCESS_REDIRECT_URL,
    failure_redirect_url: data.failure_redirect_url || process.env.RETURN_URL,
  };

  if (data.organization_consumer_id || data.consumer_id) {
    paymentLink.organization_consumer_id = data.organization_consumer_id || data.consumer_id;
  }

  if (data.coupons) {
    paymentLink.coupons = data.coupons;
  }

  if (data.custom_metadata || data.metadata) {
    paymentLink.custom_metadata = data.custom_metadata || data.metadata;
  }

  if (data.description) {
    paymentLink.description = data.description;
  }

  return paymentLink;
}

/** Map request body to SubscriptionCreate schema. */
export function mapSubscriptionCreateInput(data = {}) {
  const subscription = {
    organization_consumer_id: data.organization_consumer_id || data.consumer_id,
    items: data.items || [{ product_id: data.product_id, quantity: data.quantity ?? 1 }],
    period_start: data.period_start || data.start_date || new Date().toISOString(),
    notify_consumer: data.notify_consumer ?? true,
    exclude_coupons_if_installments: data.exclude_coupons_if_installments ?? false,
  };

  if (data.description) {
    subscription.description = data.description;
  }

  if (data.coupons) {
    subscription.coupons = data.coupons;
  }

  if (data.until_cycle_number != null) {
    subscription.until_cycle_number = data.until_cycle_number;
  }

  return subscription;
}

/** Map request body to InvoiceCreate schema. */
export function mapInvoiceCreateInput(data = {}) {
  const invoice = {
    organization_consumer_id: data.organization_consumer_id || data.consumer_id,
    items: data.items || [{ product_id: data.product_id, quantity: data.quantity ?? 1 }],
    scheduled_on:
      data.scheduled_on ||
      data.due_date ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    payment_methods: data.payment_methods || DEFAULT_INVOICE_PAYMENT_METHODS,
    notify_consumer: data.notify_consumer ?? true,
    exclude_coupons_if_installments: data.exclude_coupons_if_installments ?? false,
  };

  if (data.description || data.notes) {
    invoice.description = data.description || data.notes;
  }

  if (data.coupons) {
    invoice.coupons = data.coupons;
  }

  return invoice;
}
