"use client";

import { useSearchParams } from 'next/navigation';
import React, {useEffect, useState } from "react";

const CheckoutPage = () => {
  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [showDiscountCode, setShowDiscountCode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "paypal">("credit-card");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const amountFromQuery = searchParams.get('amount');
  const [amount, setAmount] = useState(amountFromQuery || '0');

  useEffect(() => {
    setAmount(amountFromQuery || '0');
}, [amountFromQuery]);


  // Toggle discount code visibility
  const handleToggleDiscountCode = () => setShowDiscountCode((show) => !show);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()){
      alert("please enter a discount code.");
      return;
    }
 

  try {
    const response = await fetch("/api/validate-discount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({code: discountCode.trim()}),
    });

    if (!response.ok) {
      throw new Error("Invalid Discount Code.");
    }
    const result = await response.json();
    if (result.success) {
      alert (`Discount code applied! You get ${result.discount}% off.`);
    }
    else {
      alert ("Invalid or expired discount code.");
    }
  }
  catch (error) {
    console.error("Error validating discount code:", error);
    alert("Something went wrong while validating the discount code.");
  }
};

  // Handle payment method change
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value as "credit-card" | "paypal");
  };

  // Checkout handler (dummy example, you should replace with your API call)
  const handleCheckout = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!termsAccepted) {
      setError("You must accept the Terms & Conditions.");
      setLoading(false);
      return;
    }

    /*setSuccess('Form Submitted Successfully');
    setLoading(true);*/

    /*setTimeout(()=> {
      setLoading(false);
    }, 2000);*/

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (email !== confirmEmail) {
      setError("Emails do not match.");
      setLoading(false);
      return;
    }

    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_PUBLIC_URL || 'https://tedtools.com/';

    const success_redirect = `${origin}/payment-success`;
    const failure_redirect = `${origin}/payment-failure`;

    if (!success_redirect || !failure_redirect) {
      setError('Missing redirect URLs');
      setLoading(false);
      return;
    }

    const payload = {
      username,
      password,
      firstName,
      lastName,
      email,
      discountCode: discountCode?.trim() || "",
      paymentMethod: paymentMethod?.trim() || "",
      success_redirect: success_redirect?.trim() || "",
      failure_redirect: failure_redirect?.trim() || "",
      amount,
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Checkout request failed:", errorText);
        setError("Checkout request failed. Please try again.");
        setLoading(false);
        return;
      }

      const result = await response.json();

      if (result.redirectUrl && typeof result.redirectUrl === 'string' && result.redirectUrl.startsWith('http')) {
        console.log('Redirecting to:', result.redirectUrl);
        window.location.href = result.redirectUrl;
      }
      else {
        console.warn("No redirectUrl found, redirecting to /payment-failure");
        setError(result.message || "Checkout failed. Please try again.");
      }

    }
    catch (err) {
      console.error("Checkout error:", err);
      setError("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100">
      {/* Top nav */}
      <div className="flex justify-between items-center pt-8">
        <ul className="flex gap-16 list-none p-0 m-0 ml-40">
          <li>
              <a href="/learn" className="text-lg text-blue-600 hover:underline">Learn</a>
              </li>

              <li>
              <a href="/community" className="text-lg text-blue-600 hover:underline">Community</a>
              </li>

              <li>
              <a href="/resources" className="text-lg text-blue-600 hover:underline">Resources</a>
              </li>

              <li>
              <a href="/tools" className="text-lg text-blue-600 hover:underline">Tools</a>
            </li>

        </ul>

      </div>

      {/* Membership info card */}
      <div
        id="pmpro_pricing_fields"
        className="pmpro_card max-w-md mx-auto p-4 shadow-md rounded-md mt-8"
      >
        <h2 className="pmpro_card_title pmpro_font-large text-center mb-4 font-semibold text-xl">
          Membership Information
        </h2>
        <div className="pmpro_card_content text-center">
          <p className="pmpro_level_name_text mb-2">
            You have selected the{" "}
            <strong>Power Member Monthly</strong> membership level
          </p>
          <div id="pmpro_level_cost" className="mb-4">
            <div className="pmpro_level_cost_text">
              <p>
                The price for membership is{" "}
                <strong>${amount} per Month</strong>.
              </p>
            </div>
          </div>

          <div className="pmpro_card_actions flex flex-col items-center">
            <button
              type="button"
              id="other_discount_code_toggle"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
              onClick={handleToggleDiscountCode}
            >
              Do you have a discount code? Click here to enter your discount code
            </button>
            {showDiscountCode && (
              <div
                id="other_discount_code_fields"
                className="pmpro_form_field pmpro_form_field-text w-full"
              >
                <label
                  htmlFor="pmpro_other_discount_code"
                  className="pmpro_form_label block mb-2"
                >
                  Discount Code
                </label>
                <div className="pmpro_form_fields-inline flex justify-between gap-2">
                  <input
                    id="pmpro_other_discount_code"
                    name="pmpro_other_discount_code"
                    type="text"
                    className="pmpro_form_input pmpro_form_input-text pmpro_alter_price w-2/3 p-2 border border-gray-300 rounded"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <input
                    aria-label="Apply discount code"
                    type="button"
                    name="other_discount_code_button"
                    id="other_discount_code_button"
                    value="Apply"
                    className="pmpro_btn pmpro_btn-submit-discount-code bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick= {handleApplyDiscount}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Information Form */}
      <div className="max-w-lg mx-auto p-4 shadow-md rounded-md bg-white mt-6">
        <h2 className="text-lg font-bold mb-4">Account Information</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCheckout();
          }}
        >
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username *
            </label>
            <input
              className="block w-full p-2 border border-gray-300 rounded"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password and Confirm Password with Show toggle */}
          <div className="mb-4">
            <div className="flex justify-start items-center gap-2">
              <label
                className="block text-lg font-medium mb-2"
                htmlFor="password"
              >
                Password *
              </label>
              <button
                className="text-sm text-blue-600"
                type="button"
                id="show-password"
                onClick={() => {
                  const pwdInput = document.getElementById(
                    "password"
                  ) as HTMLInputElement;
                  const confirmPwdInput = document.getElementById(
                    "confirm-password"
                  ) as HTMLInputElement;
                  if (pwdInput.type === "password") {
                    pwdInput.type = "text";
                    confirmPwdInput.type = "text";
                  } else {
                    pwdInput.type = "password";
                    confirmPwdInput.type = "password";
                  }
                }}
              >
                Show Password
              </button>
              <label
                className="text-sm font-medium ml-4"
                htmlFor="confirm-password"
              >
                Confirm Password *
              </label>
            </div>

            <div className="flex justify-between gap-2 mt-2">
              <input
                className="block w-full p-2 border border-gray-300 rounded"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="block w-full p-2 border border-gray-300 rounded"
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* First and Last Name */}
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="first-name"
              >
                First Name *
              </label>
              <input
                className="block w-full p-2 border border-gray-300 rounded"
                type="text"
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="flex-1">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="last-name"
              >
                Last Name *
              </label>
              <input
                className="block w-full p-2 border border-gray-300 rounded"
                type="text"
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email and Confirm Email */}
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email Address *
              </label>
              <input
                className="block w-full p-2 border border-gray-300 rounded"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex-1">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="confirm-email"
              >
                Confirm Email Address *
              </label>
              <input
                className="block w-full p-2 border border-gray-300 rounded"
                type="email"
                id="confirm-email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <p className="text-sm mb-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in here
            </a>
          </p>

          {/* Payment Method */}
          <div className="max-w-lg mx-auto p-4 shadow-md rounded-md bg-white mt-4">
            <h2 className="text-lg font-bold mb-4">Choose Your Payment Method</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="credit-card"
                  name="payment-method"
                  value="credit-card"
                  checked={paymentMethod === "credit-card"}
                  onChange={handlePaymentMethodChange}
                />
                <label
                  className="text-sm font-medium"
                  htmlFor="credit-card"
                >
                  Check Out with a Credit Card Here
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="paypal"
                  name="payment-method"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={handlePaymentMethodChange}
                />
                <label className="text-sm font-medium" htmlFor="paypal">
                  Check Out with PayPal
                </label>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="max-w-lg mx-auto mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="terms-and-conditions"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <span className="text-sm">
              I agree to the{" "}
              <a href="/terms-conditions" className="text-blue-600 hover:underline">
                Terms & Conditions
              </a>{" "}
              *
            </span>
          </div>

          {/* Privacy Policy */}
          <div>
          <div className="max-w-lg mx-auto mt-4 flex">
            <p className="text-sm whitespace-pre-line">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our{" "}
              <a href="/privacy-policy" className="text-blue-500 hover:underline">
                privacy policy
              </a>
            </p>
          </div>
          </div>

          {/* Submit button */}
          <div className="max-w-lg mx-auto mt-4 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit and Checkout"}
            </button>
          </div>

          {/* Show error/success messages */}
          {error && (
            <p className="text-center mt-4 text-red-600 font-semibold">{error}</p>
          )}
          {success && (
            <p className="text-center mt-4 text-green-600 font-semibold">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;