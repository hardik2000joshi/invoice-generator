export async function POST (request: Request) {
    const token = process.env.PAYSECURE_TOKEN!;
    const brandId= process.env.PAYSECURE_BRAND_ID!;
    const paysecureAPIBaseUrl= process.env.PAYSECURE_API_BASE_URL;

    if (!token || !brandId || !paysecureAPIBaseUrl) {
  return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}

    try {
        const body = await request.json();
        const { cardNumber, expiryDate, cvv, amount, cardHolder, success_redirect, failure_redirect} = body;
        console.log("Using token:", token); 

            const payload = {
      client: {
        full_name: body.full_name || 'Gouri',
        email: body.email || 'gouridausa+3101@gmail.com',
        country: body.country || 'IN',
        city: body.city || '123',
        stateCode: body.stateCode || 'CT',
        street_address: body.street_address || 'test test',
        zip_code: body.zip_code || '234567',
        phone: body.phone || '7976390281',
        tax_number: body.tax_number || 'hhhh',
      },
      purchase: {
        currency: body.currency || 'USD',
        products: body.products || [
          {
            name: 'product name',
            price: 1,
          },
        ],
      },
      status: 'created',
      brand_id: brandId,
      success: true,
      send_receipt: body.send_receipt || '',
      skip_capture: body.skip_capture || '',
      extraParam: body.extraParam || {
        showCryptoConversion: 'yes',
        IsCryptoPurchase: 'yes',
      },
      success_redirect: body.success_redirect || 'https://tedtools.com/payment-success',
      failure_redirect: body.failure_redirect || 'https://tedtools.com/payment-failure',
      success_callback: body.success_callback || 'https://tedtools.com/paysecure/success-callback',
      failure_callback: body.failure_callback || 'https://tedtools.com/paysecure/failure-callback',
    };

    console.log('Sending purchase payload to PaySecure:', JSON.stringify(payload, null, 2));

        const paysecureResponse = await fetch(paysecureAPIBaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await paysecureResponse.json();
        console.log('PaySecure response:', data);   

        return new Response(JSON.stringify({
            purchaseCreated: data.status?.toLowerCase() === 'created',
            direct_post_url: data?.direct_post_url??null,
            success_redirect: payload.success_redirect??null,
            failure_redirect: payload.failure_redirect??null,
            message: data?.message ?? null,
            data,
        }), {
            status: paysecureResponse.status,
            headers: {'Content-Type': 'application/json'},
        });
    }
    catch (error) {
        console.error('API Proxy Error:', error);
        return new Response(JSON.stringify({error:'Internal Server Error'}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}