"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface WhatsAppButtonProps {
  productName: string;
  price: number;
  description: string;
  productUrl: string;
}

export default function WhatsAppButton({
  productName,
  price,
  description,
  productUrl,
}: WhatsAppButtonProps) {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleWhatsAppClick = () => {
    const totalPrice = price * quantity;
    const message = `🛒 *Order Request* %0A
🐟 *Product:* ${productName}%0A
💰 *Price per unit:* ৳${price.toLocaleString()}%0A
🔢 *Quantity:* ${quantity}%0A
💵 *Total:* ৳${totalPrice.toLocaleString()}%0A
📝 *Description:* ${description.substring(0, 100)}%0A
🔗 *Product link:* ${productUrl}%0A
%0A
Hello, I would like to buy this fish. Please let me know about availability and payment.`;

    const phoneNumber = "8801576520009";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <label className="text-gray-300 font-medium text-sm">Quantity:</label>
        <div className="flex items-center bg-[#0f172a]/60 border border-[#38bdf8]/20 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={decreaseQty}
            className="px-3 py-2 text-gray-400 hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 transition"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center bg-transparent border-x border-[#38bdf8]/20 py-2 outline-none text-white"
          />
          <button
            type="button"
            onClick={increaseQty}
            className="px-3 py-2 text-gray-400 hover:text-[#38bdf8] hover:bg-[#38bdf8]/10 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <button
        onClick={handleWhatsAppClick}
        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.48 3.45 1.38 4.94L2 22l5.94-1.3c1.43.78 3.07 1.2 4.77 1.2 5.46 0 9.91-4.45 9.91-9.91 0-2.63-1.03-5.11-2.9-6.98A9.86 9.86 0 0 0 12.04 2zm.04 1.99c4.37 0 7.92 3.55 7.92 7.92 0 4.37-3.55 7.92-7.92 7.92-1.45 0-2.85-.39-4.07-1.13l-.63-.37-3.53.77.77-3.45-.4-.66A7.92 7.92 0 0 1 12.08 4zM8.08 8.09c.23-.13.48-.2.74-.2.21 0 .41.02.61.08.22.07.42.21.58.38.24.26.4.6.49.96.05.19.1.38.13.58.02.09.05.19.07.28.03.13.06.25.09.38.01.05.02.09.03.13.04.12.09.2.17.26.08.06.17.09.27.09.1 0 .19-.03.28-.08.08-.05.15-.12.2-.2.1-.15.16-.33.21-.52.05-.19.09-.38.13-.57.05-.3.1-.6.17-.89.04-.17.09-.33.16-.49.03-.07.07-.14.12-.21.05-.07.11-.13.17-.18.07-.06.15-.1.23-.14.08-.03.16-.05.25-.05.16 0 .31.04.45.13.14.09.26.22.35.38.19.33.28.71.28 1.1 0 .22-.03.43-.1.64-.07.21-.16.41-.28.6-.12.18-.26.34-.42.47-.07.06-.14.11-.22.15-.08.04-.16.07-.24.1a4.5 4.5 0 0 1-1.56.24c-.26 0-.51-.03-.76-.09-.25-.06-.49-.15-.72-.26-.22-.11-.43-.24-.62-.39a3.2 3.2 0 0 1-.48-.55c-.13-.19-.24-.4-.32-.63-.08-.23-.12-.47-.12-.71 0-.36.07-.71.2-1.05.13-.34.32-.66.55-.93.23-.27.5-.49.81-.66z"/>
        </svg>
        Buy on WhatsApp
      </button>
    </div>
  );
}
