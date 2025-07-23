
import clientPromise from '@/lib/mongodb';

function safeURL(input: unknown, fallback: string): string {
  try {
    if (typeof input !== 'string' || !input.trim()) return fallback;

    const trimmed = input.trim();
    if (trimmed === "null" || trimmed === "undefined") {
      console.error("Invalid URL:", trimmed);
      return fallback;
    }

    try {
      // Debug log to catch problematic values
      console.log('DEBUG: About to call new URL with:', trimmed);
      return new URL(trimmed).toString();
    } catch (err) {
      console.warn('safeURL inner error:', err, 'for value:', trimmed);
      return fallback;
    }
  } catch (err) {
    console.warn('safeURL error:', err);
    return fallback;
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: Request) {
  const token = process.env.PAYSECURE_TOKEN!;
  const brandId = process.env.PAYSECURE_BRAND_ID!;
  const paysecureAPIBaseUrl = 'https://staging.paysecure.net/api/v1/purchases/';

  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
  return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
    status: 400,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

    const {
      username,
      password,
      firstName,
      lastName,
      email,
      discountCode,
      paymentMethod,
      success_redirect,
      failure_redirect,
      amount,
    } = body;

    console.log("Incoming success_redirect:", success_redirect);
    console.log("Incoming failure_redirect:", failure_redirect);

    const fullName = `${firstName} ${lastName}`;
    const finalSuccessRedirect = safeURL(success_redirect, 'http://localhost:3000/payment-success');
    const finalFailureRedirect = safeURL(failure_redirect, 'http://localhost:3000/payment-failure');

    console.log('success_redirect:', success_redirect);
    console.log('finalSuccessRedirect:', finalSuccessRedirect);
    console.log('failure_redirect:', failure_redirect);
    console.log('finalFailureRedirect:', finalFailureRedirect);

    const payload = {
      client: {
        full_name: fullName,
        email: email || 'gouridausa+3101@gmail.com',
        country: 'IN',
        city: 'Mumbai',
        stateCode: 'MH',
        street_address: '123 Demo Street',
        zip_code: '400001',
        phone: '9999999999',
        tax_number: 'ABCDEF1234',
      },
      purchase: {
        currency: 'USD',
        products: [
          {
            name: 'Power Member Monthly',
            price: amount,
          },
        ],
      },
      status: 'created',
      brand_id: brandId,
      success: true,
      send_receipt: true,
      skip_capture: false,
      extraParam: {
        showCryptoConversion: 'yes',
        IsCryptoPurchase: 'yes',
        ERSR: `ERSR-${Date.now()}`,
        discountCode: discountCode || '',
        paymentMethod: paymentMethod || '',
      },

      success_redirect: finalSuccessRedirect,
      failure_redirect: finalFailureRedirect,
      success_callback: 'http://localhost:3000/paysecure/success-callback',
      failure_callback: 'http://localhost:3000/paysecure/failure-callback',
    };


    const paysecureResponse = await fetch(paysecureAPIBaseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!paysecureResponse.ok) {
      let errorMessage = `Error: ${paysecureResponse.status} - ${paysecureResponse.statusText}`;
      let errorData = { message: errorMessage };

      if (paysecureResponse.headers.get('Content-Type')?.includes('application/json')) {
        errorData = await paysecureResponse.json();
      }

      console.error("PaySecure API Error:", errorData);

      return new Response(JSON.stringify({ error: 'API request failed' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    const data = await paysecureResponse.json();

    const client = await clientPromise;
    const db = client.db('testData');

    function extractFromURL(url: string | undefined): string | null {
      if (!url) return null;
      const match = url.match(/\/payments\/([a-zA-Z0-9]+)/);
      if (match && match[1]) {
        return match [1];
      }
      return null;
    }

    await db.collection ("users").updateOne(
      {email},
      {
        $set: {
          name: fullName,
          username,
          password,
          email,
        },
        $setOnInsert: {
          payments: [],
          apiKeys : [],
        },
      },
      {upsert: true}
    );

    await db.collection("users").updateOne(
      {email},
      {
        $push: {
          payments:{
            date: new Date(),
        amount,
        method: paymentMethod,
        status: 'initiated',
        paymentId: data.payment_id || extractFromURL(data.checkout_url),
        redirectUrl: data.checkout_url || data.direct_post_url || 'http://localhost:3000/payment-failure',
        paysecureResponse: data,
        extraParam: payload.extraParam,
          },
        },
      }
    );
      
    // If checkout URL exists, redirect to it
    const checkoutUrl = data.checkout_url || data.direct_post_url;

    if (checkoutUrl) {
      // Redirect to the checkout URL
      return new Response(JSON.stringify({ redirectUrl: checkoutUrl }), {
        status: 200, // HTTP status for redirect
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    } else {
      // If no checkout URL is provided, return failure redirect
      return new Response(JSON.stringify({
        redirectUrl: 'http://localhost:3000/payment-failure',
        message: data?.message || 'Checkout URL not available.',
      }), {
        status: 200, // request successful
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

  } catch (error) {
    console.error('Checkout API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
} 

