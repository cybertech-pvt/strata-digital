 import { forwardRef } from "react";
 import { MessageCircle, Phone } from "lucide-react";

 export const FloatingWhatsApp = forwardRef<HTMLDivElement>((_, ref) => {
   return (
     <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Call Button */}
      <a
        href="tel:+918248827991"
        aria-label="Call us"
        className="w-14 h-14 bg-teal rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
      >
        <Phone size={26} className="text-white" />
        <span className="absolute right-16 bg-navy text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Call us
        </span>
      </a>
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/918248827991"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group animate-pulse"
      >
        <MessageCircle size={28} className="text-white" />
        <span className="absolute right-16 bg-navy text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          Chat with us
        </span>
      </a>
    </div>
   );
 });
 
 FloatingWhatsApp.displayName = "FloatingWhatsApp";
