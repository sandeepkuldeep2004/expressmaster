export default function Payment() {
  const makePayment = async () => {
    // console.log("here...");
    const res = await initializeRazorpay();

    if (!res) {
      alert("Failed to load");
      return;
    }

    const payLoad = JSON.stringify({
      amount: 1,
      currency: 'INR',
    })
    // Make API call to the serverless API
    // const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
    //   t.json()
    // );
    console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "",
      currency: 'INR',
      amount: 10,
      order_id: data.id,
      description: "Payment",
      image: "",
      handler: function (response) {
        console.log(response)
        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        // name: "Manu Arora",
        // email: "manuarorawork@gmail.com",
        // contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  return (
    <div>
      <main className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#252B30] to-[#191C22]">
        <PurchaseNow onClick={makePayment} />
      </main>
    </div>
  );
}

const PurchaseNow = ({ onClick }) => {
  return (
    <div className="relative z-10 flex flex-col md:flex-row mt-10 items-center  max-w-6xl justify-evenly mx-auto bg-red">
        <button onClick={onClick} className="text-gray-900 font-bold" >
          Purchase Now!
        </button>
    </div>
  );
};