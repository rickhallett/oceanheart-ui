import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-100 py-16 px-6 border-t border-white/[0.1]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-light text-gold font-serif-jp">心</span>
              <span className="text-xl font-light font-serif">The Kaishin Method</span>
            </div>
            <p className="text-sm font-light opacity-75 mb-4 max-w-md">
              The View. The Compass. The Ground. An integrated path to lasting transformation.
            </p>
            <p className="text-xs font-light opacity-60">
              Integrating 20 years of contemplative practice, psychological science, and technological wisdom.
            </p>
          </div>

          <div>
            <h3 className="font-sans font-medium mb-4 text-sm tracking-wide">The Method</h3>
            <ul className="space-y-2 text-sm font-light opacity-75">
              <li><Link href="/path" className="hover:text-gold transition-colors">The Framework</Link></li>
              <li><Link href="/program" className="hover:text-gold transition-colors">Your Journey</Link></li>
              <li><Link href="/news" className="hover:text-gold transition-colors">Blog</Link></li>
              <li><Link href="/app" className="hover:text-gold transition-colors">Member Area</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-medium mb-4 text-sm tracking-wide">Courses</h3>
            <ul className="space-y-2 text-sm font-light opacity-75">
              <li><Link href="/program#challenge" className="hover:text-gold transition-colors">30-Day Challenge</Link></li>
              <li><Link href="/program#transformation" className="hover:text-gold transition-colors">90-Day Transformation</Link></li>
              <li><Link href="/app/courses" className="hover:text-gold transition-colors">All Courses</Link></li>
              <li><Link href="/app/support" className="hover:text-gold transition-colors">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.1] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light text-zinc-500">
          <p>© 2025 The Kaishin Method. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
