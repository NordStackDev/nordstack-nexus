const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="rounded-full bg-blue-100 text-blue-600 w-20 h-20 flex items-center justify-center text-4xl font-bold shadow-sm">
      404
    </div>
    <h2 className="text-2xl font-semibold text-gray-900">
      Siden blev ikke fundet
    </h2>
    <p className="text-gray-500 mb-2">
      Siden du leder efter eksisterer ikke eller er blevet flyttet.
    </p>
    <a
      href="/"
      className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Til forsiden
    </a>
  </div>
);

export default NotFound;
