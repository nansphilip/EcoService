import Link from "next/link";

export default function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-[#12123A]">Commande confirmée !</h1>
          <p className="text-gray-600">
            Merci pour votre achat. Votre commande a été enregistrée avec succès.
          </p>
          {sessionId && (
            <p className="mt-2 text-sm text-gray-500">
              Référence de commande: {sessionId.substring(0, 8)}
            </p>
          )}
        </div>

        <div className="mb-8 rounded-md bg-gray-50 p-4">
          <h2 className="mb-2 text-lg font-semibold text-[#12123A]">Détails de la commande</h2>
          <p className="text-gray-600">
            Un email de confirmation a été envoyé à l'adresse email que vous avez fournie.
          </p>
          <p className="mt-2 text-gray-600">
            Votre commande sera expédiée dans les 24-48 heures.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-[#12123A] px-6 py-3 text-center text-white hover:bg-[#12123A]/90"
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/catalogue"
            className="rounded-full border border-[#12123A] bg-white px-6 py-3 text-center text-[#12123A] hover:bg-gray-50"
          >
            Continuer les achats
          </Link>
        </div>
      </div>
    </div>
  );
} 