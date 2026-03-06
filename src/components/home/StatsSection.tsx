import { STATS } from "@/constants/home";

export default function StatsSection() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold text-[#E85D04]">{stat.value}</p>
              <p className="text-sm text-[#1A1A2E] mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
