import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-6 text-blue-800">
        Welcome to GasByGas
      </h1>
      <p className="text-xl mb-8 text-gray-600">
        Your trusted online gas requesting and delivering system
      </p>
      <div className="space-y-4">
        <Link
          to="/request"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Request Gas Now
        </Link>
        <p className="text-gray-500">
          Quick, easy, and reliable gas delivery at your doorstep.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Easy Ordering"
          description="Request gas with just a few clicks from the comfort of your home."
        />
        <FeatureCard
          title="Fast Delivery"
          description="Get your gas delivered quickly by our efficient delivery network."
        />
        <FeatureCard
          title="Secure Payments"
          description="Pay securely online or upon delivery, whichever you prefer."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3 text-blue-700">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
