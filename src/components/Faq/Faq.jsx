import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Faq = () => {
  return (
    <div>
      {/* Heading */}
      <div className="mt-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-center">
          Have Questions?{" "}
          <span className="text-green-600">
            <Typewriter
              words={["Look Here"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>{" "}
        </h1>
      </div>

      {/* Faq Questions */}
      <div className="px-5 lg:px-0 mt-10 lg:w-[750px] mx-auto mb-20">
        <div className="collapse collapse-arrow bg-gray-50 mb-5">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            1. Which payment methods do you accept?
          </div>
          <div className="collapse-content">
            <p>
              We accept a variety of payment methods, including major credit
              cards (Visa, MasterCard, American Express), debit cards, PayPal,
              and secure bank transfers. Additional local payment options may be
              available depending on your location.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-gray-50 mb-5">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            2. What is the registration process?
          </div>
          <div className="collapse-content">
            <p className="font-semiboldbold">
              The registration process is simple:
            </p>
            <ul className="list-disc px-10">
              <li>
                Visit the World Pass Express website and click on the "Register"
                button.
              </li>
              <li>
                Fill in your personal details, including name, email, and
                password.
              </li>
              <li>
                Verify your email through a confirmation link sent to your
                inbox.
              </li>
              <li>
                Once verified, log in to your account and start exploring visa
                services.
              </li>
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-gray-50 mb-5">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            3. How can I update or cancel my personal information?
          </div>
          <div className="collapse-content">
            <p>To update or cancel your personal information:</p>
            <ul className="list-disc px-10">
              <li>Log in to your World Pass Express account.</li>
              <li>Navigate to the "Profile" section from the dashboard.</li>
              <li>Edit your details and click "Save" to update them.</li>
              <li>
                If you wish to delete your account, contact our customer support
                team through the "Help & Support" section.
              </li>
            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-gray-50 mb-5">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            4. Does your immigration firm offer a money-back guarantee?
          </div>
          <div className="collapse-content">
            <p>
              Yes, we offer a money-back guarantee under specific conditions. If
              your visa application is denied due to errors on our part, you may
              be eligible for a refund. Terms and conditions apply. Please refer
              to our refund policy for detailed information.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-gray-50 mb-5">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            5. How long does it take to get a travel visa to Singapore?
          </div>
          <div className="collapse-content">
            <p>
              The processing time for a travel visa to Singapore typically
              ranges from 3 to 5 working days. However, this can vary depending
              on the visa type, application volume, and the accuracy of your
              submitted documents. It’s advisable to apply well in advance to
              avoid delays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
