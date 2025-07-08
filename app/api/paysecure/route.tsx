export async function POST (request: Request) {
    const token = process.env.PAYSECURE_TOKEN!;
    const brandId= process.env.PAYSECURE_BRAND_ID!;
    const paysecureAPIBaseUrl= 'https://staging.paysecure.net/api/v1/purchases/';

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
      brand_id: body.brand_id || '9ca5f4f0-5fad-4eed-a12b-c40102ec852b',
      success: true,
      send_receipt: body.send_receipt || '',
      skip_capture: body.skip_capture || '',
      extraParam: body.extraParam || {
        showCryptoConversion: 'yes',
        IsCryptoPurchase: 'yes',
      },
      success_redirect: body.success_redirect || 'https://your.success.redirect.com',
      failure_redirect: body.failure_redirect || 'https://your.failure.redirect.com',
      success_callback: body.success_callback || 'https://your.success.callback.com',
      failure_callback: body.failure_callback || 'https://your.failure.callback.com',
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