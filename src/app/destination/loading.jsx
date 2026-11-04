
export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#071b2e] px-4">

      {/* Background Decorations */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">

        {/* Animated Compass */}
        <div className="relative mb-10 flex h-40 w-40 items-center justify-center">

          <div className="absolute inset-0 rounded-full border border-cyan-400/20" />

          <div
            className="absolute inset-2 animate-spin rounded-full border-2 border-dashed border-cyan-400/50"
            style={{ animationDuration: "12s" }}
          />

          <div className="absolute inset-5 animate-spin rounded-full border border-blue-300/30 [animation-duration:5s]">
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_15px_#67e8f9]" />
          </div>

          {/* Compass */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 shadow-[0_0_40px_rgba(34,211,238,0.15)] backdrop-blur-xl">
            <svg
              viewBox="0 0 100 100"
              className="h-14 w-14 animate-pulse"
              fill="none"
            >
              <circle
                cx="50"
                cy="50"
                r="43"
                stroke="#67e8f9"
                strokeWidth="1.5"
                opacity=".5"
              />
              <path d="M50 12 L60 48 L50 43 L40 48 Z" fill="#67e8f9" />
              <path d="M50 88 L40 52 L50 57 L60 52 Z" fill="#3b82f6" />
              <circle cx="50" cy="50" r="5" fill="white" />
            </svg>
          </div>

          {/* Airplane */}
          <div className="absolute -right-2 top-5 animate-bounce text-3xl">
            ✈️
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-4xl font-extrabold tracking-wider text-white sm:text-5xl">
          Wander<span className="text-cyan-400">last</span>
        </h1>

        <p className="mt-3 text-sm font-medium tracking-[0.3em] text-cyan-200/70">
          EXPLORE THE WORLD
        </p>

        {/* Loading Message */}
        <div className="mt-10">
          <p className="animate-pulse text-lg font-medium text-white">
            Discovering amazing destinations
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Preparing your next adventure...
          </p>
        </div>

        {/* Animated Loading Bar */}
        <div className="mt-8 h-1.5 w-64 max-w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 animate-[pulse_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs tracking-widest text-slate-500">
          EVERY JOURNEY STARTS SOMEWHERE
        </p>

      </div>
    </main>
  );
}
